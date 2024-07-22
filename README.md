A quick demo of finding and clicking an image shown within a <canvas> element using Playwright test.

Load index.html in the browser of your choiceA quick demo of finding and clicking an image shown within a `<canvas>` element using Playwright test along with template matching via [OpenCV-js](https://www.npmjs.com/package/@techstark/opencv-js) and [jimp](https://www.npmjs.com/package/jimp) (for reading the template from disc, and converting that template and a screenshot of the canvas element in to a format that OpenCV can use).

Load index.html in the browser of your choice and you should see a small apple image drawn at a random location within the canvas. Clicking on the apple briefly shows the text "Image Clicked!" beneath the canvas element. Clicking the "Refresh Canvas" button will clear the canvas and redraw the apple at a new location. Click locations are also reported in the browsers JS console.

To run the test in example.spec.ts you will need to change the path used in line 6 to match where index.html is saved on your system. 
