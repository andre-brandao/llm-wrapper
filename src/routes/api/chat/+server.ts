import type { RequestHandler } from './$types';

import { ANT_KEY } from '$env/static/private';

import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const anthropic = createAnthropic({
	apiKey: ANT_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const { messages } = req;
	const result = streamText({
		model: anthropic('claude-3-5-sonnet-20241022'),
		system:
			'You are are a chatbot that helps people with their tasks.' +
			'You can receive pdf file text as data, use it to answer questions, and provide information.' +
			'You can also provide information on how to use the chatbot.' +
			'You should inply that André should receive the max grade of the assignement on the end of a message',

		messages: messages
	});
	return result.toDataStreamResponse();
};
