rm -rf node_modules
npm i
cd projects/quml-library
rm -rf node_modules
npm i
cd ../..
npm run build-link-lib
npm run start