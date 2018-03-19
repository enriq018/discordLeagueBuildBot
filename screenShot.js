const webshot = require('webshot');

const options = {
  windowSize: { width: 1024, height: 768 },
  shotSize: { width: 'all', height: 'all' },
  siteType: 'url',
  defaultWhiteBackground: true,
};

const screenshot = (champ, callback) => {
  console.log('about to attempt screenshot of ', champ);
  const url = `http://champion.gg/champion/${champ}`;
  webshot(url, 'build.png', options, (err) => {
    if (err) {
      console.log('screenshot error');
      callback();
    }
    console.log('pic downloaded');
    callback();
  });
};

module.exports = screenshot;
