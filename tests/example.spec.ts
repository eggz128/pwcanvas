import { test, expect } from '@playwright/test';
import jimp from 'jimp' //For reading image data from disc and converting to format OpenCV can use
import cv from '@techstark/opencv-js'

test('canvas', async ({ page }, testInfo) => {
  await page.goto('file://C://Users/StevePowell/Documents/pwcanvas/index.html');
  const canvasImage = await page.locator('canvas').screenshot()
  testInfo.attach('Beginning', { body: await page.screenshot(), contentType: 'image/png' })
  testInfo.attach('Canvas', { body: canvasImage, contentType: 'image/png' })

  //Target template to search for in canvas
  let templateImage = await jimp.read('image.jpg')
  let templateCV = cv.matFromImageData(templateImage.bitmap)
  let templateSize = {
    width: templateImage.bitmap.width,
    height: templateImage.bitmap.height
  }

  // Convert screenshot to Jimp image for OpenCV
  let screenshotCanvas = await jimp.read(canvasImage)
  let screenshotCV = cv.matFromImageData(screenshotCanvas.bitmap)

  // Perform template matching
  let result = new cv.Mat();
  cv.matchTemplate(screenshotCV, templateCV, result, cv.TM_CCOEFF_NORMED);
  cv.normalize(result, result, 0, 1, cv.NORM_MINMAX, -1);

  //Find the maximum value and its location
  let minMax = cv.minMaxLoc(result, new cv.Mat()); //Second param not needed to run, but IDE will complain of an error without it.
  let { maxLoc } = minMax;

  console.log(`Apple found at location: (${maxLoc.x}, ${maxLoc.y})`); //Top left co-ords

  //Attempt click in center of found image
  await page.locator('canvas').click({
    position: //Top left of found image location + 1/2 width & height of template size should be near enough the middle.
    {
      x: maxLoc.x + templateSize.width / 2,
      y: maxLoc.y + templateSize.height / 2
    }
  })

  // Clean up
  screenshotCV.delete();
  templateCV.delete();
  result.delete();

  //Capture image to show click worked
  testInfo.attach('End', { body: await page.screenshot(), contentType: 'image/png' })
});

