'use server';
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const listAllThreads = async () => {
    try {
        const thread = await openai.beta.threads.retrieve('thread_VWeYLpdkdDNRtu0QFvAa70oB');
        // also log out all messages for the given thread in a console.log
        const messages = await openai.beta.threads.messages.list('thread_VWeYLpdkdDNRtu0QFvAa70oB');
        console.log(`Messages for thread ${thread.id}:`, JSON.stringify(messages));
        return { data: thread, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}

export { listAllThreads }