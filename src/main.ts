import {Command} from 'commander'
import {generateCodeCli} from './process-cli'

const program = new Command()
program.version('0.0.1')
generateCodeCli(program)
program.parse()
