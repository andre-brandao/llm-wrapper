import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function extractTextFromFile(file: File): Promise<string> {
	const pdfjsLib = await import('pdfjs-dist');
	// Set the worker source for PDF.js
	pdfjsLib.GlobalWorkerOptions.workerSrc =
		'./node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
	try {
		const fileReader = new FileReader();

		// Wrap FileReader in a Promise
		const fileData: ArrayBuffer = await new Promise((resolve, reject) => {
			fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
			fileReader.onerror = (error) => reject(error);
			fileReader.readAsArrayBuffer(file);
		});

		// Load the PDF from the ArrayBuffer
		const loadingTask = pdfjsLib.getDocument(fileData);
		const pdf = await loadingTask.promise;

		let fullText = '';

		// Loop through each page
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);

			// Get text content from the page
			const textContent = await page.getTextContent();

			// Combine text items
			const pageText = textContent.items
				.map(
					(item) =>
						// @ts-expect-error foo
						item.str
				) // `item.str` contains the text
				.join(' ');

			fullText += `\n\nPage ${i}:\n${pageText}`;
		}

		return fullText;
	} catch (error) {
		console.error('Error extracting text from PDF:', error);
		throw error;
	}
}
