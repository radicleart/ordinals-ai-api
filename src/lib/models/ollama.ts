import { Ollama } from 'ollama'
import type {ChatRequest} from 'ollama'

const ollama = new Ollama({ host: 'http://localhost:11434' })
const history = []

export async function chat(question:string) {
    try {
        const req:ChatRequest & {stream?: false;} = {
            model: 'llama2',
            stream: false,
            messages: [{ role: 'user', content: question }],
        };
        const response = await ollama.chat(req)
        console.log('chat: ', response)
        return response;
    } catch(err:any) {
        console.error(err)
        return err.message
    }
}