const fs = require("fs-extra");
const concat = require("concat");
const path = require("path");

const build = async () => {
  const files = [
    "./dist/quml-player-wc/runtime.js",
    "./dist/quml-player-wc/polyfills-es5.js",
    "./dist/quml-player-wc/polyfills.js",
    "./dist/quml-player-wc/scripts.js",
    "./dist/quml-player-wc/styles.js",
    "./dist/quml-player-wc/vendor.js",
    "./dist/quml-player-wc/main.js",
  ];

  await fs.ensureDir("dist/quml-player-wc");
  await fs.ensureDir("web-component");
  await concat(files, "web-component/sunbird-quml-player.js");
  await fs.copy("./dist/quml-player-wc/assets", "web-component/assets");

  const filesNames = fs.readdirSync("dist/quml-player-wc");
  const allowedFiles = [".ttf", ".woff", ".woff2"];

  filesNames.forEach((file) => {
    if (allowedFiles.includes(path.extname(file))) {
      fs.copySync(`dist/quml-player-wc/${file}`, `web-component/${file}`);
    }
  });
  console.log("Files concatenated successfully!!!");
};
build();
