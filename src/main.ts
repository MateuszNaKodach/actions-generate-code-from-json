import * as core from '@actions/core'
import {wait} from './wait'
import { execSync } from 'child_process';
import { generateTypeScriptCode } from "./generators/ts/ts-generator";

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    //core.setOutput('time', new Date().toTimeString())
    const output = execSync('ls', { encoding: 'utf-8' });  // the default is 'buffer'
    
    core.setOutput('Output was:\n', output);
    
    // check langugage - if csharp and option package is enabled
    // validate if 
    await generateTypeScriptCode();
    
    
    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
