// netlify/functions/askClaude.js

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.METROIDVANIA_SECRET_CLAUDE, // This is the default and can be omitted
});

exports.handler = async function (event, context) {
    const body = JSON.parse(event.body);
    let message = "";

    try {
        message = await anthropic.messages.create({
            max_tokens: 1024,
            messages: [{ role: "user", content: body.prompt }],
            model: "claude-3-opus-20240229",
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: message.content[0].text }),
        };
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
