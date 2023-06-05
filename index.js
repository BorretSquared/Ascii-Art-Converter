const fs = require('fs');
const Jimp = require('jimp');
const getPixels = require('get-pixels');

const charList = '@%#*+=-:. \'"^`'; // Lightest to darkest
const imageFolder = 'images';
const pixelLevel = 50; // Higher number equals more pixels

// Function to map grayscale value to ASCII character
function mapGrayscaleToChar(grayscale) {
    const charIndex = Math.floor((charList.length - 1) * grayscale / 255);
    return charList[charIndex];
}

fs.readdir(imageFolder, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }
    const image = files[0];
    Jimp.read(`${imageFolder}/${image}`, (err, image) => {
        if (err) {
            console.error('Error reading image:', err);
            return;
        }
        image.resize(pixelLevel, pixelLevel, Jimp.RESIZE_NEAREST_NEIGHBOR) // Resize the image using nearest neighbor interpolation (shrinkss)
            .write('pixelatedImage/image.png');

        getPixels("pixelatedImage/image.png", function(err, pixels) {
            if(err) {
                console.log("Bad image path");
                return;
            }
            const { data, shape } = pixels;

            // Convert RGB values to grayscale and ASCII art
            let asciiArt = '';
            for (let i = 0; i < shape[0]; i++) {
                for (let j = 0; j < shape[1]; j++) {
                    const index = (i * shape[1] + j) * shape[2];
                    const R = data[index];
                    const G = data[index + 1];
                    const B = data[index + 2];
                    const grayscale = 0.2126 * R + 0.7152 * G + 0.0722 * B; // Image formula
                    const char = mapGrayscaleToChar(grayscale);
                    asciiArt += char;
                }
                asciiArt += '\n';
            }

            // Save the ASCII art to a text file
            fs.writeFile('ascii-art.txt', asciiArt, (err) => {
                if (err) {
                    console.error('Error writing ASCII art:', err);
                } else {
                    console.log("ASCII art created");
                }
            });
        });
    });
});
