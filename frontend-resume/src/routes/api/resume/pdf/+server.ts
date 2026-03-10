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
		args: [
			'--no-sandbox',
			'--disable-dev-shm-usage',
			'--disable-gpu',
			'--disable-setuid-sandbox',
			'--disable-software-rasterizer'
		],
		headless: true
	});

	return browser;
}

export const GET: RequestHandler = async () => {
	const port = process.env.PORT || '3000';
	// Use 127.0.0.1 — 'localhost' may not resolve in Alpine containers
	const printUrl = `http://127.0.0.1:${port}/resume/print`;

	let instance: import('puppeteer-core').Browser;
	try {
		instance = await getBrowser();
	} catch (e) {
		console.error('Failed to launch browser:', e);
		return new Response('Failed to launch browser', { status: 500 });
	}

	const page = await instance.newPage();

	try {
		await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 30000 });
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
	} catch (e) {
		console.error('PDF generation failed:', e);
		// Reset browser on failure so next request gets a fresh instance
		try {
			await browser?.close();
		} catch {
			// ignore close errors
		}
		browser = null;
		return new Response('PDF generation failed', { status: 500 });
	} finally {
		await page.close();
	}
};
