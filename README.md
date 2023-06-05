# Image to ASCII Art Converter
This is a Node.js script that converts an image into ASCII art. It reads images from a specified folder, pixelates them, converts them to grayscale, and generates ASCII art based on the grayscale values.

# Usage

Install the NPMS with the following command: 
npm i jimp get-pixels fs

Place the image you want in to the images folder.

# Example
An example is attached as an image file, run the index.js file to see it.

# Notes
This formula converts it into ASCII: grayscale = 0.2126 * R + 0.7152 * G + 0.0722 * B

If you would like a more clean or a less clean gradient then change the *charList* const

The script will ONLY read the first image from the specified folder
