const path = require('path');
const fs = require("fs-extra");

const src = path.join('projects/quml-library', 'src', 'lib', 'assets');
const dest = path.join('dist/quml-library/lib/assets/');

fs.copy(src, dest, function (err) {
    if (err) {
        console.log('An error occurred while copying assets folder.', err);
        return console.error(err)
    }
    console.info('Copied assets folder');
    const styleSrcFile = path.join('quml-carousel.css');
    const styleDesFile = path.join('dist/quml-library/lib/assets/styles/quml-carousel.css');
    fs.copy(styleSrcFile, styleDesFile)
        .then(() => {
            console.log('Copied css file')
        })
        .catch(err => {
            console.error('An error occurred while copying css file.', err)
        })
});
