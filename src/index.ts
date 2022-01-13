import puppeteer from 'puppeteer';
import * as path from 'path';
interface Args {
  url: string;
  pdf_file_name: string;
}
const output_dir = './out'
const printWebPageToPDF = async (args: Args) => {
  const {url, pdf_file_name} = args;
  // step 1 launch webpage
  const browser = await puppeteer.launch({ headless: true });
  const webPage = await browser.newPage();
  await webPage.goto(url, {
    waitUntil: 'networkidle0', // wait until page loading finished
  });

  await webPage.pdf({
    printBackground: true, // print background
    path: path.join(output_dir, pdf_file_name),
    format: "a4" , // print size
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  });
  await browser.close();
  console.log(`print finished`);
}

printWebPageToPDF({
  url: `https://www.chartjs.org/docs/latest/charts/line.html`,
  pdf_file_name: `chart-js.pdf`
});