import { openai } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";

export default {
  async fetch(_req: Request): Promise<Response> {
    const result = await streamText({
      model: openai("gpt-4o"),
      prompt: "Generate a fast recipe for Lasagna.",
    });
    return result.toTextStreamResponse({
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
  },
};
