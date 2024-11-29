/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from '../$types';

import { ANT_KEY } from '$env/static/private';

import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const anthropic = createAnthropic({
	apiKey: ANT_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();
	console.log(messages);
	const result = streamText({
		model: anthropic('claude-3-5-sonnet-20241022'),
		messages: messages
	});
	return result.toDataStreamResponse();
};
