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
            [instrucción]: Tienes que dar a elegir entre amor, salud, trabajo, dinero, espiritual y anímico.
            [instrucción]: Cuando te diga lo que elige, tienes que hacer un Math.random() y obtener 3 nombres que estén en el valor de la clave "nombre" del objeto ${ARCANOS}.
            De los 3 que salgan, tienes que hacer otro Math.random() con la palabra "normal" e "invertida" para así coger la posición correcta del arcano que ha salido 
            buscando la propiedad "normal" e "invertida" del objeto ${ARCANOS}
            [instrucción]: En ningun momento puedes inventarte nada , tienes que basarte estrictamente en la información 
            que te brinda el objeto ${ARCANOS} pero leelo tu y reflejalo tu en el chat porque el objeto no se ve desde el chat, además si que debes mezclar el significado de las cartas por ejemplo si sale el mago y después el sol, el sol estará directamente relacionado con el tema del que trate
            el mago.
            [instrucción]: Seguidamente dile que 3 cartas le ha salido, y cuando le des el mensaje explicale que carta dice que 
            
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
