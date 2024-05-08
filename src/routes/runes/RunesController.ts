import { Get, Route } from "tsoa";
import { promisify } from "util";
import { exec, ExecException } from "child_process";
import { chat } from "../../lib/models/ollama";

const execPromise = promisify(exec);


const myCommand = async (param: string) => {
  const { stdout, stderr } = await execPromise(`/usr/local/bin/ord ${param}`);
  return {
    stdout,
    stderr,
    // some other fields
  };
};

@Route("/runes-api/v1/runes")
export class RunesController {

  @Get("/version")
  public async ordVersion(): Promise<any> {
    return myCommand('--version')
    //const exec = util.promisify(require('child_process').exec);
    //const exec = util.promisify(require('child_process').exec);
    //const { stdout, stderr } = await exec('/usr/local/bin/ord --version');
  }

  @Get("/ask/:question")
  public async question(question:string): Promise<any> {
    console.log('RunesController: ' + question)
    return await chat(question);
  }

}
