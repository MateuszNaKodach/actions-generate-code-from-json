import {OutputModel} from '@asyncapi/modelina'

export type CodeGeneratorConfig = {
  jsonSchemaFiles: {name: string; content: any}[]
}

export type CodeGeneratorResult = {
  generated: {file: {name: string; content: any}; models: OutputModel[]}[]
}

export type CodeGenerator = (
  config: CodeGeneratorConfig
) => Promise<CodeGeneratorResult>
