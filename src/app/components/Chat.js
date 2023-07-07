'use client'

import React, { useRef, useEffect } from 'react';
import { useChat } from 'ai/react';


export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, input]);

    return (
        <div className='flex flex-col h-[500px] max-w-xl px-8 mx-auto overflow-auto'>
            <div className='text-3xl text-yellow-500'>
                <h1>Tarot IA</h1>
            </div>
            
            {messages.length > 0 ?
                messages.map((message, index) => {
                    const isTarotist = message.role !== 'user';
                    const isLastMessage = index === messages.length - 1;

                    return (
                        <div key={message.id} ref={isLastMessage ? endOfMessagesRef : null}>
                            <p>
                                {isTarotist ? '🔮' : '🤔'}
                                <span className={`pl-2 ${isTarotist ? 'text-purple-600' : 'text-white'}`}>
                                    {message.content}
                                </span>
                            </p>
                        </div>
                    );
                }) : null}


            <form className='flex flex-row justify-center mt-50px' onSubmit={handleSubmit}>
                <input
                    className='fixed w-full max-w-xl px-4 py-2 m-auto mb-8 border border-gray-400 rounded-full shadow-2xl bottom-4'
                    placeholder='Escribe tu consulta...'
                    type='text'
                    name='content'
                    value={input}
                    onChange={handleInputChange}
                />
            </form>

        </div>
    );
}
