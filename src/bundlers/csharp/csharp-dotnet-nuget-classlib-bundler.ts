import {GeneratorParams} from '../../process-params'
import {executeSystemCommand} from '../../generators/shared/command-executor'
import {promises as fs} from 'fs'
import {parseStringPromise, Builder} from 'xml2js'

export async function createDotNetPackage(
  out: GeneratorParams['out']
): Promise<void> {
  if (out.mode.type !== 'package') {
    return
  }
  const outDir = out.dir
  const packageName = out.mode.name
  const packageVersion = out.mode.version

  executeSystemCommand(`mkdir -p ${outDir}`)
  executeSystemCommand(`rm -rf ${outDir}/*`)
  executeSystemCommand(`cp -a src/bundlers/csharp/template/. ${outDir}`)
  await setPackageData(outDir, packageName, packageVersion)
}

async function setPackageData(
  outDir: string,
  packageName: string,
  packageVersion: string
) {
  executeSystemCommand(
    `mv ${outDir}/Template.csproj ${outDir}/${packageName}.csproj`
  )
  const xmlData = await fs.readFile(`${outDir}/${packageName}.csproj`, 'utf8')
  const jsonObj = await parseStringPromise(xmlData, {explicitArray: false})
  jsonObj.Project.PropertyGroup.Version = packageVersion
  const builder = new Builder()
  const xml = builder.buildObject(jsonObj)
  await fs.writeFile(`${outDir}/${packageName}.csproj`, xml)
}
