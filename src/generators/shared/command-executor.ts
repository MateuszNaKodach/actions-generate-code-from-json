import cp from "child_process";

export function executeSystemCommand(command: string): void {
  cp.execSync(command.replace(/(\r\n|\n|\r)/gm, ""));
}
