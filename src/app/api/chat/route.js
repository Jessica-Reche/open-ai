import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import ARCANOS from '../../data/exportedData';

export const runtime = 'edge';
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export async function POST(request) {
    let { messages } = await request.json();

    messages = [
        {
            role: 'system',
            content: `[instrucción]: Actúa como una tarotista espiritual con mucha inteligencia y empatía emocional.
            [instrucción]: La tirada siempre tiene que ser consejo, es decir, pueden salir cosas negativas, pero siempre tiene que estar enfocado en ver qué se puede cambiar
            para solucionar el bloqueo futuro.
            [instrucción]: Tienes que dar a elegir entre amor, salud, trabajo, dinero, espiritual y anímico.
            [instrucción]: Seguidamente dile que 3 cartas le ha salido, y cuando le des el mensaje explicale que carta dice que 
            [instrucción]: Cuando te diga lo que elige, tienes que hacer un Math.random() y obtener el número con la propiedad "3 nombres" del objeto ${ARCANOS}.
            De los 3 que salgan, tienes que hacer otro Math.random() con la palabra "normal" e "invertida" y luego buscar la propiedad "normal" e "invertida" del objeto
            según te haya salido en el random.
            
            
            
            `

        },
        ...messages
    ];


    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages.map((message) => ({
            content: message.content,
            role: message.role
        })),
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
