import type { RequestHandler } from './$types';

import { ANT_KEY } from '$env/static/private';

import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export const POST: RequestHandler = async ({ request }) => {
	const { messages, data } = await request.json();

	const result = await generateText({
		model: anthropic('claude-3-5-sonnet-20241022'),
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'What is an embedding model according to this document?'
					},
					{
						type: 'file',
						data: fs.readFileSync('./data/ai.pdf'),
						mimeType: 'application/pdf'
					}
				]
			}
		]
	});
	return new Response();
};
