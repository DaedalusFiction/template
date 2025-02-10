import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  // apiKey: process.env.NUXT_METROIDVANIA_SECRET_CLAUDE,
  apiKey:
    "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",
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let message = "";
  // let model = "claude-3-haiku-20240307";
  let model = "claude-3-5-sonnet-20240620";

  switch (body.model) {
    case "sonnet":
      model = "claude-3-5-sonnet-20240620";
      break;
    case "opus":
      model = "claude-3-opus-20240229";
      break;
    default:
      break;
  }

  try {
    message = await anthropic.messages.create({
      max_tokens: 2048,
      messages: [
        { role: "user", content: body.prompt },
        {
          role: "assistant",
          content: body.prefill,
        },
      ],
      model: model,
    });
    return { message: message.content[0].text };
  } catch (error) {
    return { message: error.message };
  }
});
