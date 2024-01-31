import { ChatMessage, ChatModelId } from "@ampt/ai";

export type ChatRequest = {
    messages: ChatMessage[];
    modelId: ChatModelId;
};

export type ChatData = {
    chatMessage : ChatMessage;
    isSharedAi : boolean;
};