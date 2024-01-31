import { chat } from "@ampt/ai";
import { ChatRequest } from "../../types";

let _defaultModel = "anthropic.claude-instant-v1";

export async function POST(request: Request) {
  try {
    let chatRequest: ChatRequest = await request.json();
    const response = await chat(chatRequest.messages, { modelId: chatRequest.modelId ?? _defaultModel });
    let data = await response.text();
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return new Response("Check out logs", { status: 500 });
  }
}