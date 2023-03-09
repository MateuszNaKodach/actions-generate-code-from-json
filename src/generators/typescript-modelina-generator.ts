import {
  TypeScriptGenerator, TypeScriptOptions
} from "@asyncapi/modelina";
import { CodeGeneratorConfig, CodeGeneratorResult } from "./shared/code-generator";
import { TypeScriptObjectRenderer } from "@asyncapi/modelina/lib/types/generators/typescript/TypeScriptObjectRenderer";
import { InterfacePresetType } from "@asyncapi/modelina/lib/types/generators/typescript/TypeScriptPreset";


// HACK: interface renderer to type renderer
export const TS_INTERFACE_AS_READONLY_TYPE_PRESET: InterfacePresetType<TypeScriptOptions> =
  {
    async self({ renderer, options, model }) {
      const content = [
        await renderer.renderProperties(),
        await renderer.runAdditionalContentPreset()
      ];

      return `export type ${model.name.replaceAll("Minus", "")} = Readonly<{
${renderer.indent(renderer.renderBlock(content, 2))}
}>`;
    }
  };

const generator = new TypeScriptGenerator({
  modelType: "interface",
  renderTypes: true,
  enumType: "union",
  mapType: "indexedObject",
  presets: [
    {
      interface: TS_INTERFACE_AS_READONLY_TYPE_PRESET
    }
  ]
});

export async function generateTypeScriptCode(config: CodeGeneratorConfig): Promise<CodeGeneratorResult> {
  const jsonSchemaFiles = config.jsonSchemaFiles;
  const generatedModels = await Promise.all(jsonSchemaFiles
    .map(async (file) => {
      const { name, content } = file;
      const models = await generator.generateCompleteModels(content, {});
      return { file, models };
    }));
  return {
    generated: generatedModels
  };
}
