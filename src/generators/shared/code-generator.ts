export type CodeGeneratorConfig = {
  jsonSchemaFiles: { name: string, content: string }[];
}

export type CodeGeneratorResult = {
  generated: { jsonSchemaFile: { name: string, content: string }, code: { content: string } }[];
}


export type CodeGenerator = (config: CodeGeneratorConfig) => Promise<CodeGeneratorResult>;
