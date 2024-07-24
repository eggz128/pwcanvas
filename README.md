A quick demo of finding and clicking an image shown within a `<canvas>` element using Playwright test along with template matching via [OpenCV-js](https://www.npmjs.com/package/@techstark/opencv-js) and [jimp](https://www.npmjs.com/package/jimp) (for reading the template from disc, and converting that template and a screenshot of the canvas element in to a format that OpenCV can use).

Load index.html (found in the project root folder) in the browser of your choice and you should see a small apple image drawn at a random location within the canvas. Clicking on the apple briefly shows the text "Image Clicked!" beneath the canvas element. Clicking the "Refresh Canvas" button will clear the canvas and redraw the apple at a new location. Click locations are also reported in the browsers JS console.

The test in example.spec.ts uses image.jpg as a template to find that apple image within the canvas. It does this via OpenCV template matching. Essentially the image is 'slid' across a screenshot of a canvas with the location of the best match returned. Playwright can then send a click to that loacation within the canvas.

