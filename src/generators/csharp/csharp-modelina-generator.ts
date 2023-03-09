import {
  CSharpFileGenerator,
  ConstrainedDictionaryModel
} from "@asyncapi/modelina";
import { CodeGeneratorConfig, CodeGeneratorResult } from "../shared/code-generator";

const generator = new CSharpFileGenerator({
  collectionType: "List",
  autoImplementedProperties: true,
  typeMapping: {
    String: (props) => {
      const format = props.constrainedModel.originalInput["format"];
      return ["uuid", "guid"].includes(format) ? "Guid" : "string";
    }
  },
  presets: [
    {
      class: {
        // Self is used to overwrite the entire rendering behavior of the class
        self: async ({ renderer, options, model }) => {
          //Render all the class content
          const content = [
            (await renderer.renderProperties())
              .replaceAll(" { get; set; }", ",")
              .replaceAll("public", "")
            // await renderer.runCtorPreset(),
            // await renderer.renderAccessors(),
            // await renderer.runAdditionalContentPreset()
          ];

          if (
            options?.collectionType === "List" ||
            model.containsPropertyType(ConstrainedDictionaryModel)
          ) {
            renderer.dependencyManager.addDependency(
              "using System.Collections.Generic;"
            );
          }
          return `public record ${model.name.replaceAll("Minus", "")}
(
${renderer.indent(renderer.renderBlock(content, 2))}
)`;
        }
      }
    }
  ]
});

export async function generateCSharpCodeUsingModelina(config: CodeGeneratorConfig): Promise<CodeGeneratorResult> {
  const jsonSchemaFiles = config.jsonSchemaFiles;
  const generatedModels = await Promise.all(jsonSchemaFiles
    .map(async (file) => {
      const { name, content } = file;
      const namespace = content["x-csharp-namespace"];
      const models = await generator.generateCompleteModels(content, { namespace });
      return { file, models };
    }));
  return {
    generated: generatedModels
  };
}
