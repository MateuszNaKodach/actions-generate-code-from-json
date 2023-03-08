import {
  CSharpFileGenerator,
  ConstrainedDictionaryModel
} from '@asyncapi/modelina'
import fs from "fs";

const generator = new CSharpFileGenerator({
  collectionType: 'List',
  autoImplementedProperties: true,
  typeMapping: {
    String: (props) => {
      const format = props.constrainedModel.originalInput['format']
      return format === 'uuid' ? 'Guid' : 'string';
    }
  },
  presets: [
    {
      class: {
        // Self is used to overwrite the entire rendering behavior of the class
        self: async ({renderer, options, model}) => {
          //Render all the class content
          const content = [
            (await renderer.renderProperties())
              .replaceAll(' { get; set; }', ',')
              .replaceAll('public', ''),
            // await renderer.runCtorPreset(),
            // await renderer.renderAccessors(),
            // await renderer.runAdditionalContentPreset()
          ]

          if (
            options?.collectionType === 'List' ||
            model.containsPropertyType(ConstrainedDictionaryModel)
          ) {
            renderer.dependencyManager.addDependency(
              'using System.Collections.Generic;'
            )
          }
          return `public record ${model.name.replaceAll('Minus','')}
(
${renderer.indent(renderer.renderBlock(content, 2))}
)`
        }
      }
    }
  ]
})

export async function generateCSharpCode(): Promise<void> {
  const outDir = "./__tests__/out/message-schema/generated/csharp/modelina";
  const inDir = "./__tests__/assets";

  const allJsonFiles = fs.readdirSync(inDir).filter((file) => file.includes(".json"));
  const allJsonSchemas = allJsonFiles.map(file => [file, JSON.parse(fs.readFileSync(`${inDir}/${file}`, 'utf8'))]);
  await Promise.all(
    allJsonSchemas.map(async ([fileName, jsonSchema]) => {
      const models = await generator.generateToFiles(
        jsonSchema,
        outDir,
        {}
      )
      for (const model of models) {
        console.log(model.result)
      }
    })
  );
}
