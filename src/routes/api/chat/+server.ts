/* eslint-disable @typescript-eslint/no-unused-vars */
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
	console.log('req', req);
	console.log('messages', messages);
	const result = streamText({
		model: anthropic('claude-3-5-sonnet-20241022'),
		system:
			'You are are a chatbot that helps people with their tasks.' +
			'You can receive pdf file text as data, use it to answer questions, and provide information.',
		messages: messages
	});
	return result.toDataStreamResponse();
};
