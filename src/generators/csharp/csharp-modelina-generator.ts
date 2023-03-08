import {
  CSharpFileGenerator,
  ConstrainedDictionaryModel
} from '@asyncapi/modelina'
import fs from "fs";

const generator = new CSharpFileGenerator({
  collectionType: 'List',
  autoImplementedProperties: true,
  presets: [
    {
      class: {
        // Self is used to overwrite the entire rendering behavior of the class
        self: async ({renderer, options, model}) => {
          //Render all the class content
          const content = [
            await renderer.renderProperties(),
            await renderer.runCtorPreset(),
            await renderer.renderAccessors(),
            await renderer.runAdditionalContentPreset()
          ]

          if (
            options?.collectionType === 'List' ||
            model.containsPropertyType(ConstrainedDictionaryModel)
          ) {
            renderer.dependencyManager.addDependency(
              'using System.Collections.Generic;'
            )
          }
          return `public class ${model.name} : IEvent
{
${renderer.indent(renderer.renderBlock(content, 2))}
}`
        }
      }
    }
  ]
})

export async function generateCSharpCode(): Promise<void> {
  const outDir = "./__tests__/out/message-schema/generated/csharp/modelina/Test.cs";
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
