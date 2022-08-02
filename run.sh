#!/bin/bash
docker run -d -v `pwd`/result:"/app/result" -p 3000:3000 puppeteer-pdf-test_pdf_service