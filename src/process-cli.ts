import {Argument, Command} from 'commander'
import {generate} from './process'

export const generateCodeCli = (program: Command) => {
  program
    .command('generate-code')
    .description('Generate NuGet or NPM package from JSON schemas')
    .addArgument(
      new Argument('<in-dir>', 'Path to directory with JSON schemas')
    )
    .addArgument(new Argument('<out-dir>', 'Output path'))
    .addArgument(new Argument('<out-lang>', 'Output language'))
    .addArgument(new Argument('<out-package-name>', 'Output package name'))
    .addArgument(
      new Argument('<out-package-version>', 'Output package version')
    )
    .action(
      async (
        inDir: string,
        outDir: string,
        outLang: 'typescript' | 'csharp',
        outPackageName: string,
        outPackageVersion: string
      ) => {
        await generate({
          in: {
            dir: inDir
          },
          out: {
            dir: outDir,
            language: outLang,
            file: {mode: 'one-file-per-schema'},
            mode: {
              type: 'package',
              name: outPackageName,
              version: outPackageVersion
            }
          }
        })
      }
    )
}
