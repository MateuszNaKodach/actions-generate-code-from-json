import {TypeScriptFileGenerator} from '@asyncapi/modelina'
import * as fs from 'fs';

const generator = new TypeScriptFileGenerator({
  modelType: 'class',
  renderTypes: true,
  enumType: 'union'
})

export async function generateTypeScriptCode(): Promise<void> {
  const outDir = "./__tests__/out/message-schema/generated/typescript/modelina";
  const inDir = "./__tests__/assets";
  //const inFile = "*.json" //regex / patrern? how?
  const outFileName = "candidateprofile-external-events.ts";
  
  const allJsonFiles = fs.readdirSync(inDir).filter((file) => file.includes(".json"));
  // const models = await codeGenerator.generate(jsonSchemaDraft7)
  // for (const model of models) {
  //   console.log(model.result)
  // }
  // await fileGenerator.generateCompleteModels(models, {});
  const allJsonSchemas = allJsonFiles.map(file => [file, JSON.parse(fs.readFileSync(`${inDir}/${file}`, 'utf8'))]);

  // function toRecord(allJsonSchemas: string[][]) {
  //   return allJsonSchemas.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  // }

  // all json schemas to object with filename as key and schema as value
  
  
  // allJsonSchemas
  //   .map(async ([fileName, jsonSchema]) => {return await generator.generate(jsonSchema);})
  //   .map(async (model) => { return await generator.generateToFiles(model, outDir, {exportType: 'default'});})

  await Promise.all(
    allJsonSchemas.map(async ([fileName, jsonSchema]) => {
      const models = await generator.generateToFiles(
        jsonSchema,
        outDir,
        {exportType: 'default'}
      )
      for (const model of models) {
        console.log(model.result)
      }
    })
  );
}
