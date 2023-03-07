import { TypeScriptGenerator } from "@asyncapi/modelina";

export async function generateTypeScriptCode(): Promise<void> {
  const jsonSchemaDraft7 = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    additionalProperties: false,
    properties: {
      email: {
        type: "string",
        format: "email"
      }
    }
  };

  const generator = new TypeScriptGenerator();
  const models = await generator.generate(jsonSchemaDraft7);
  for (const model of models) {
    //console.log(model.result);
  }
}
