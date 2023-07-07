import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

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
            content: '[instrucción]: Actua como una tarotista espiritual con mucha inteligencia y empatía emocional.'
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
        max_tokens: 200,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
