import {
  TypeScriptGenerator
} from "@asyncapi/modelina";
import { CodeGeneratorConfig, CodeGeneratorResult } from "../shared/code-generator";


const generator = new TypeScriptGenerator({
  modelType: "interface",
  renderTypes: true,
  enumType: "union",
  mapType: "indexedObject"
});

export async function generateTypeScriptCode(config: CodeGeneratorConfig): Promise<CodeGeneratorResult> {
  const jsonSchemaFiles = config.jsonSchemaFiles;
  const generatedModels = await Promise.all(jsonSchemaFiles
    .map(async (file) => {
      const { name, content } = file;
      const models = await generator.generateCompleteModels(content, { exportType: "named" });
      return { file, models };
    }));
  return {
    generated: generatedModels
  };
}
