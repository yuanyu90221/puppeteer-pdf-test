#!/bin/bash
docker build -t puppeteer-pdf-test_pdf_service --build-arg OUTPUT_DIR=result --no-cache .