const webshot = require('webshot');
const path = require('path')
const options = {
  windowSize: { width: 1024, height: 768 },
  shotSize: { width: 'all', height: 'all' },
  siteType: 'url',
  defaultWhiteBackground: true,
};

const fileLocation = path.resolve(__dirname, 'build.png');
const screenshot = (champ, callback) => {
  console.log('about to attempt screenshot of ', champ);
  const url = `http://champion.gg/champion/${champ}`;
  webshot(url, fileLocation, options, (err) => {
    if (err) {
      console.log('screenshot error');
      callback();
    }
    console.log('pic downloaded');
    callback();
  });
};

console.log(fileLocation)
module.exports = screenshot;
