"use client";
import { ChatMessage, ChatModelId } from "@ampt/ai";
import { FormEvent, useEffect, useState } from "react";
import { ChatData, ChatRequest } from "../types";

export default function Chat() {
    const [models, setModels] = useState({
        0: "anthropic.claude-instant-v1",
        1: "anthropic.claude-v1",
        2: "anthropic.claude-v2",
        3: "ai21.j2-mid-v1",
        4: "ai21.j2-ultra-v1",
        5: "cohere.command-text-v14",
        6: "cohere.command-light-text-v14",
        7: "meta.llama2-13b-chat-v1"
    });
    const [selectedModel, setSelectedModel] = useState<ChatModelId>('anthropic.claude-instant-v1');

    const [messages, setMessages] = useState<ChatData[]>([]);
    const [inputText, setInputText] = useState('');

    const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputText.trim() !== '') {
            const userMessage: ChatMessage = { content: inputText, role: 'human' };
            const userMessageData: ChatData = { chatMessage: userMessage, isSharedAi: false };
            setMessages(prevMessages => [...prevMessages, userMessageData]);
            setInputText('');
        }
    };

    const handleModelChange = (e: any) => {
        setSelectedModel(e.target.value);
        setMessages([]);
    };

    useEffect(() => {
        const sendMessagesToServer = async () => {
            try {
                const chatMessages: ChatMessage[] = messages.map(m => m.chatMessage);
                let chatRequest: ChatRequest = { messages: chatMessages, modelId: selectedModel };

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chatRequest),
                });

                if (!response.ok) {
                    console.error(response);
                    throw new Error('Failed to fetch AI response');
                }

                setMessages(prevMessages => prevMessages.map(message => ({ ...message, isSharedAi: true })));

                const { data } = await response.json();
                const aiMessage: ChatMessage = { content: data, role: 'assistant' };
                const aiMessageData: ChatData = { chatMessage: aiMessage, isSharedAi: true };
                setMessages(prevMessages => [...prevMessages, aiMessageData]);
            } catch (error) {
                console.error('Error sending or receiving messages:', error);
            }
        };

        if (messages.length > 0 && messages[messages.length - 1].isSharedAi === false) {
            sendMessagesToServer();
        }
    }, [messages, selectedModel]);

    return (
        <div className="min-w-[-webkit-fill-available] mx-12">
            {messages.length > 0 && (<div className="border rounded-md p-4 shadow-md mb-4">
                {messages.map((message, index) => (
                    <div key={index} className={`max-w-fit ${message.chatMessage.role === 'human' ? 'bg-blue-200' : 'bg-gray-200'} p-2 rounded-md mb-2`} >
                        {message.chatMessage.content}
                    </div>
                ))}
            </div>)}
            <form onSubmit={handleMessageSubmit} className="flex items-center">
                <select
                    value={selectedModel}
                    onChange={handleModelChange}
                    className="border rounded-md p-2 mr-2"
                >
                    <option value="">Select Model</option>
                    {Object.entries(models).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="form-control flex-1 border rounded-md p-2 mr-2"
                    placeholder="Lets talk about it..."
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                    Send
                </button>
            </form>
        </div>
    );
}   