const path = require('path');
const fs = require("fs-extra");

const src = path.join('projects/quml-library', 'src', 'lib');
const dest = path.join('dist/quml-library');

fs.copy(src, dest, function (err) {
    if (err) {
        console.log('An error occured while copying assets folder.', err);
        return console.error(err)
    }
    console.info('Copied assets folder');
});