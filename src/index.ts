import puppeteer from 'puppeteer';
import * as path from 'path';
import koa from 'koa';
import router from 'koa-router';

interface Args {
  url: string;
  pdf_file_name: string;
}
const PORT: number = 3000;
console.log(`env: ${process.env.OUTPUT_DIR}`);
const output_dir = process.env.OUTPUT_DIR? process.env.OUTPUT_DIR:'result';
const printWebPageToPDF = async (args: Args) => {
  const {url, pdf_file_name} = args;
  // step 1 launch webpage
  const browser = await puppeteer.launch({ headless: true,  args: ['--no-sandbox', '--disable-setuid-sandbox'] });
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
const app = new koa();
const RootRouter = new router();
RootRouter.get('/', async (ctx) => {
  ctx.body = {
    message: "pdf server"
  };
  ctx.status = 200;
});
RootRouter.get('/pdf', async (ctx) => {
  try {
    await printWebPageToPDF({
      url: `https://www.chartjs.org/docs/latest/charts/line.html`,
      pdf_file_name: `chart-js.pdf`
    });
    ctx.body = {
      message: "chart-js.pdf generated"
    };
    ctx.status = 200;
  } catch(error) {
    if (error instanceof Error) {
      console.log(error.message)
      ctx.status = 500;
      ctx.body = {
        error: error.message,
        stack: error.stack,
        name: error.name,
        message: "error happened"
      }
    }
  }
});
app.use(RootRouter.routes());
app.listen(PORT, ()=> {
  console.log(`server listen on ${PORT}`)
})