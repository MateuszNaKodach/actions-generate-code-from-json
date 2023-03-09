import { CodeGenerator } from "./generators/shared/code-generator";
import { generateCSharpCodeUsingModelina } from "./generators/csharp/csharp-modelina-generator";
import { GeneratorParams } from "./process-params";
import { writeGeneratedCodeToDir } from "./generators/shared/code-to-file-writer";
import { readJsonSchemasFromDir } from "./generators/shared/schema-from-file-reader";


const codeGenerators: Record<string, CodeGenerator> = {
  //"typescript": {},
  "csharp": generateCSharpCodeUsingModelina
};

export async function generate(config: GeneratorParams): Promise<void> {
  const { in: inProps, out: outProps } = config;
  const { language, mode } = outProps;

  const codeGenerator = selectCodeGeneratorFor(language);
  const inputDirJsonSchemas = await readJsonSchemasFromDir(inProps);
  const generatorResult = await codeGenerator({ jsonSchemaFiles: inputDirJsonSchemas });
  console.log(generatorResult);
  await writeGeneratedCodeToDir(outProps, generatorResult);

  // create package and put classes inside

  // add dependencies to package definitions


  // const codeGenerator = codeGenerators[language];
  //
  // const files = await codeGenerator.generate(inputDir);
  //
  // if (mode === "just-files") {
  //   await codeGenerator.writeFiles(files, outputDir);
  // } else if (mode === "package") {
  //   await codeGenerator.writePackage(files, outputDir);
  // }
}

function selectCodeGeneratorFor(language: "csharp" | "typescript") {
  const codeGenerator = codeGenerators[language];
  if (codeGenerator == null) {
    throw new Error(`Language ${language} is not supported. Select one of: ${Object.keys(codeGenerators).join(", ")}.`);
  }
  return codeGenerator;
}
