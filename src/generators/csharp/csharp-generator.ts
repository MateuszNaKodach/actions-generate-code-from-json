import { CSharpFileGenerator, CSharpOptions, ConstrainedDictionaryModel } from "@asyncapi/modelina";
import { DeepPartial } from "@asyncapi/modelina/lib/types/utils";

const options: DeepPartial<CSharpOptions> = {
  collectionType: "List",
  autoImplementedProperties: true,
  presets: [
    {
      class: {
        // Self is used to overwrite the entire rendering behavior of the class
        self: async ({ renderer, options, model }) => {
          //Render all the class content
          const content = [
            await renderer.renderProperties(),
            await renderer.runCtorPreset(),
            await renderer.renderAccessors(),
            await renderer.runAdditionalContentPreset()
          ];

          if (
            options?.collectionType === "List" ||
            model.containsPropertyType(ConstrainedDictionaryModel)
          ) {
            renderer.dependencyManager.addDependency("using System.Collections.Generic;");
          }
          return `public class ${model.name} : IEvent
{
${renderer.indent(renderer.renderBlock(content, 2))}
}`;
        }
      }
    }
  ]
};
const generator = new CSharpFileGenerator({});

export async function generateCSharpCode() {

}
