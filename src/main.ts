import * as core from '@actions/core'
import {wait} from './wait'
import {execSync} from 'child_process'
import { generateTypeScriptCode } from "./generators/typescript/typescript-modelina-generator";

interface GitHubActionInput {
  readonly in: InProps
  readonly out: OutProps
}

interface InProps {
  readonly files: string[] // files - can be pattern
}

interface OutProps {
  readonly language: 'csharp' | 'typescript'
  readonly mode: 'just-files' | 'package'
  readonly package: string // package name / namespace
  // one file or many???
}

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    //core.setOutput('time', new Date().toTimeString())
    const output = execSync('ls', {encoding: 'utf-8'}) // the default is 'buffer'

    core.setOutput('Output was:\n', output)

    // check langugage - if csharp and option package is enabled
    // validate if
    await generateTypeScriptCode()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
