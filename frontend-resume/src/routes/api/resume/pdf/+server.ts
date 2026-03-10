import type { RequestHandler } from './$types';

let browser: import('puppeteer-core').Browser | null = null;

async function getBrowser() {
	if (browser && browser.connected) {
		return browser;
	}

	const puppeteer = await import('puppeteer-core');
	const chromiumPath = process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser';

	browser = await puppeteer.default.launch({
		executablePath: chromiumPath,
		args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
		headless: true
	});

	return browser;
}

export const GET: RequestHandler = async ({ url }) => {
	const port = process.env.PORT || '3000';
	const origin = url.origin || `http://localhost:${port}`;
	const printUrl = `${origin}/resume/print`;

	const instance = await getBrowser();
	const page = await instance.newPage();

	try {
		await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 15000 });
		await page.evaluate(() => document.fonts.ready);

		const pdfBuffer = await page.pdf({
			format: 'Letter',
			printBackground: true,
			margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
		});

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="Elijah_Crain_Resume.pdf"'
			}
		});
	} finally {
		await page.close();
	}
};
