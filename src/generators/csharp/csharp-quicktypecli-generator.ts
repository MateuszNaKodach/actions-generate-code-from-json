import { executeSystemCommand } from "../shared/command-executor";

// todo: three steps (model), then writing to file (one or many)
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
  
  // todo: move to bundler + version update
  executeSystemCommand(`dotnet new classlib -o ${outDir} -n ${dotnet.classlib} --no-restore`);
  executeSystemCommand(`rm ${outDir}/Class1.cs`);
  
  //
  
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
