import { TypeScriptFileGenerator, TypeScriptGenerator } from "@asyncapi/modelina";

const codeGenerator = new TypeScriptGenerator();
const fileGenerator = new TypeScriptFileGenerator();

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
  const models = await codeGenerator.generate(jsonSchemaDraft7)
  for (const model of models) {
    console.log(model.result)
  }
  await fileGenerator.generateCompleteModels(models, {});
}
