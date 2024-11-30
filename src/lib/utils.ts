import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import pdfJSWorkerURL from 'pdfjs-dist/build/pdf.worker?url';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function extractTextFromFile(file: File): Promise<string> {
	const pdfjsLib = await import('pdfjs-dist');
	// pdfjsLib.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
	pdfjsLib.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

	try {
		const fileReader = new FileReader();

		const fileData: ArrayBuffer = await new Promise((resolve, reject) => {
			fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
			fileReader.onerror = (error) => reject(error);
			fileReader.readAsArrayBuffer(file);
		});

		const loadingTask = pdfjsLib.getDocument(fileData);
		const pdf = await loadingTask.promise;

		let fullText = '';

		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);

			const textContent = await page.getTextContent();

			const pageText = textContent.items
				.map(
					(item) =>
						// @ts-expect-error `item.str` contains the text
						item.str
				)
				.join(' ');

			fullText += `\n\nPage ${i}:\n${pageText}`;
		}

		return fullText;
	} catch (error) {
		console.error('Error extracting text from PDF:', error);
		throw error;
	}
}
