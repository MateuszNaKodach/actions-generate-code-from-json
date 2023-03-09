import {TypeScriptGenerator} from '@asyncapi/modelina'
import {CodeGeneratorConfig, CodeGeneratorResult} from './shared/code-generator'

const generator = new TypeScriptGenerator({
  modelType: 'interface',
  renderTypes: true,
  enumType: 'union',
  mapType: 'indexedObject',
  presets: [
    {
      interface: {
        // HACK: interface renderer to type renderer
        self: async ({renderer, options, model}) => {
          const content = [
            await renderer.renderProperties(),
            await renderer.runAdditionalContentPreset()
          ]

          return `export type ${model.name.replaceAll('Minus', '')} = Readonly<{
${renderer.indent(renderer.renderBlock(content, 2))}
}>`
        }
      }
    }
  ]
})

export async function generateTypeScriptCode(
  config: CodeGeneratorConfig
): Promise<CodeGeneratorResult> {
  const jsonSchemaFiles = config.jsonSchemaFiles
  const generatedModels = await Promise.all(
    jsonSchemaFiles.map(async file => {
      const {name, content} = file
      const models = await generator.generateCompleteModels(content, {})
      return {file, models}
    })
  )
  return {
    generated: generatedModels
  }
}
