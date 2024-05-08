import { Get, Route } from "tsoa";
import { collect, process } from "./audionals_helper";

@Route("/audionals-api/v1")
export class AudionalsController {

  @Get("/process/:inscriptionId")
  public async process(inscriptionId:string): Promise<any> {
    console.log('RunesController: ' + inscriptionId)
    return await process(inscriptionId);
  }

  @Get("/collect/:inscriptionId")
  public async collect(inscriptionId:string): Promise<any> {
    console.log('RunesController: ' + inscriptionId)
    return await collect(inscriptionId);
  }
}
