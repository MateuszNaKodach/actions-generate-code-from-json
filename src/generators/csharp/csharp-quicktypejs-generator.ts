import * as cp from "child_process";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore, CSharpTargetLanguage
} from "quicktype-core";
import fs from "fs";
import { CustomCSharpTargetLanguage } from "./quicktypejs/CustomCSharpTargetLanguage";

// todo: three steps (model), then writing to file (one or many)
export async function generateCSharpCode(): Promise<void> {
  const inFile = "./__tests__/assets/*.json";
  const inDir = "./__tests__/assets";
  const outDir = "./__tests__/out/message-schema/generated/csharp/quicktypejs";
  const outFileName = "CandidateProfileExternalEvents.cs";
  const dotnet = {
    classlib: 'JustJoinIt.Services.CandidateProfile.Contracts.Messages.Events',
    namespace: 'JustJoinIt.Services.CandidateProfile.Contracts.Messages.Events'
  }

  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);
  
  // todo: move to bundler + version update
  executeSystemCommand(`dotnet new classlib -o ${outDir} -n ${dotnet.classlib} --no-restore`);
  executeSystemCommand(`rm ${outDir}/Class1.cs`);
  
  //
  const allJsonFiles = fs.readdirSync(inDir).filter((file) => file.includes(".json"));
  const allJsonSchemas = allJsonFiles.map(file => [file, JSON.parse(fs.readFileSync(`${inDir}/${file}`, 'utf8'))]);

  const { lines: csharpCode } = await quicktypeJSONSchema("CandidateProfile", JSON.stringify(allJsonSchemas[0][1]));
  const toWrite = csharpCode.join("\n");
  fs.writeFileSync(`${outDir}/${outFileName}`, toWrite);
}

function executeSystemCommand(command: string): void {
  cp.execSync(command.replace(/(\r\n|\n|\r)/gm, ""));
}

async function quicktypeJSONSchema(typeName: string, jsonSchemaString: string) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  const lang = new CustomCSharpTargetLanguage();

  return await quicktype({
    inputData,
    lang,
  });
}
