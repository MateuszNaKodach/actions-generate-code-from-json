import {TypeScriptFileGenerator} from '@asyncapi/modelina'

const generator = new TypeScriptFileGenerator({
  modelType: 'class',
  renderTypes: true,
  enumType: 'union'
})

export async function generateTypeScriptCode(): Promise<void> {
  const jsonSchemaDraft7 = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties: {
      email: {
        type: 'string',
        format: 'email'
      }
    }
  }
  // const models = await codeGenerator.generate(jsonSchemaDraft7)
  // for (const model of models) {
  //   console.log(model.result)
  // }
  // await fileGenerator.generateCompleteModels(models, {});

  const outputFolder = './__tests__/out/generated'
  const models = await generator.generateToFiles(
    jsonSchemaDraft7,
    outputFolder,
    {exportType: 'default'}
  )
  for (const model of models) {
    console.log(model.result)
  }
}