import fs from "fs";
import { CodeGenerator } from "./generators/shared/code-generator";
import { generateCSharpCodeUsingModelina } from "./generators/csharp/csharp-modelina-generator";

type GeneratorConfig = Readonly<{
  in: InProps,
  out: OutProps
}>

type InProps = Readonly<{
  dir: string;
}>

type OutProps = Readonly<
  {
    dir: string
  } &
  (
    {
      language: "csharp",
      mode: "just-files" | "package",
    }
    |
    {
      language: "typescript"
      mode: "just-files" | "package",
    }
    )
>

const codeGenerators: Record<string, CodeGenerator> = {
  //"typescript": {},
  "csharp": generateCSharpCodeUsingModelina
};

export async function generate(config: GeneratorConfig): Promise<void> {
  const { in: inProps, out: outProps } = config;
  const { dir: inputDir } = inProps;
  const { dir: outputDir } = outProps;
  const { language, mode } = outProps;

  // select code generator
  const codeGenerator = codeGenerators[language];
  if (codeGenerator == null) {
    throw new Error(`Language ${language} is not supported. Select one of: ${Object.keys(codeGenerators).join(", ")}.`);
  }
  // read all files with json from inputDir
  const inputDirJsonFilesNames = fs.readdirSync(inputDir)
    .filter((file) => file.includes(".json"));
  const inputDirJsonSchemas = inputDirJsonFilesNames
    .map(fileName => ({
      name: fileName,
      content: JSON.parse(fs.readFileSync(`${inputDir}/${fileName}`, "utf8"))
    }));

  // generate code classes as object
  const generatedResult = await codeGenerator({ jsonSchemaFiles: inputDirJsonSchemas });
  console.log(generatedResult);

  // write classes to files - one or many

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
