import {CodeGenerator} from './generators/shared/code-generator'
import {generateCSharpCodeUsingModelina} from './generators/csharp-modelina-generator'
import {GeneratorParams} from './process-params'
import {writeGeneratedCodeToDir} from './generators/shared/code-to-file-writer'
import {readJsonSchemasFromDir} from './generators/shared/schema-from-file-reader'
import {generateTypeScriptCode} from './generators/typescript-modelina-generator'
import {createDotNetPackage} from './bundlers/csharp/csharp-dotnet-nuget-classlib-bundler'
import {createNpmPackage} from './bundlers/typescript/typescript-npm-package-bundler'

const codeGenerators: Record<string, CodeGenerator> = {
  typescript: generateTypeScriptCode,
  csharp: generateCSharpCodeUsingModelina
}

const packageBundlers = {
  csharp: createDotNetPackage,
  typescript: createNpmPackage
}

export async function generate(config: GeneratorParams): Promise<void> {
  const {in: inProps, out: outProps} = config
  const {language, mode} = outProps

  const codeGenerator = selectCodeGeneratorFor(language)
  const inputDirJsonSchemas = await readJsonSchemasFromDir(inProps)
  const generatorResult = await codeGenerator({
    jsonSchemaFiles: inputDirJsonSchemas
  })

  const packageBundler = selectPackageBundlerFor(language)
  await packageBundler(outProps)
  await writeGeneratedCodeToDir(outProps, generatorResult)
}

function selectCodeGeneratorFor(language: 'csharp' | 'typescript') {
  const codeGenerator = codeGenerators[language]
  if (codeGenerator == null) {
    throw new Error(
      `Language ${language} is not supported. Select one of: ${Object.keys(
        codeGenerators
      ).join(', ')}.`
    )
  }
  return codeGenerator
}

function selectPackageBundlerFor(language: 'csharp' | 'typescript') {
  const packageBundler = packageBundlers[language]
  if (packageBundler == null) {
    throw new Error(
      `Packaging of ${language} is not supported. Select one of: ${Object.keys(
        codeGenerators
      ).join(', ')}.`
    )
  }
  return packageBundler
}
