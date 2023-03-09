import {expect, test} from '@jest/globals'
import { executeSystemCommand } from "../../../../src/generators/shared/command-executor";

/**
 * I was trying to use Quicktype, but changing generated code is a nightmare.
 * Like: change partial class to record - almost impossible.
 * + all schemas in single file
 */
test('[Unit] Generator | CSharp | QuickType', async () => {
  await generateCSharpCode()
})

export async function generateCSharpCode(): Promise<void> {
  const inFile = "./__tests__/assets/*.json";
  const outDir = "./__tests__/out/message-schema/generated/csharp/quicktype";
  const outFileName = "CandidateProfileExternalEvents.cs";
  const dotnet = {
    classlib: 'JustJoinIt.Services.CandidateProfile.Contracts.Messages.Events',
    namespace: 'JustJoinIt.Services.CandidateProfile.Contracts.Messages.Events'
  }

  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);

  executeSystemCommand(`dotnet new classlib -o ${outDir} -n ${dotnet.classlib} --no-restore`);
  executeSystemCommand(`rm ${outDir}/Class1.cs`);
  
  executeSystemCommand(`
  quicktype 
  -s schema ${inFile} 
  -o ${outDir}/${outFileName} 
  --namespace ${dotnet.namespace}
  --no-combine-classes
  --framework SystemTextJson 
  --number-type decimal
  --any-type dynamic
  --array-type array
  --features just-types-and-namespace
  `); //todo: --base-class EntityData|Object
}
