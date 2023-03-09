import {
  CSharpFileGenerator,
  ConstrainedDictionaryModel
} from "@asyncapi/modelina";
import { CodeGeneratorConfig, CodeGeneratorResult } from "../shared/code-generator";
import { promises as fs } from "fs";

const generator = new CSharpFileGenerator({
  collectionType: "List",
  autoImplementedProperties: true,
  typeMapping: {
    String: (props) => {
      const format = props.constrainedModel.originalInput["format"];
      return format === "uuid" ? "Guid" : "string";
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
  // const outDir = "./__tests__/out/message-schema/generated/csharp/modelina";
  // const inDir = "./__tests__/assets";
  const jsonSchemaFiles = config.jsonSchemaFiles;
  const generatedModels = await Promise.all(jsonSchemaFiles
    .map(async (file) => {
      const { name, content } = file;
      const models = await generator.generate(content);
      const modelCode = models.map((outputModel) => {
        return outputModel.result;
      });
      const imports = models.map((outputModel) => {
        return outputModel.dependencies;
      });
      const uniqueImports = [...new Set(imports)];
      const codeWithImports = `${uniqueImports.join("\n")}\n${modelCode.join("\n")}`;
      return { jsonSchemaFile: { name, content }, code: { content: codeWithImports } };
    }));
  return {
    generated: generatedModels
  };
}
