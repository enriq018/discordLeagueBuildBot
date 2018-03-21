const webshot = require('webshot');

const options = {
  windowSize: { width: 1024, height: 768 },
  shotSize: { width: 'all', height: 'all' },
  siteType: 'url',
  defaultWhiteBackground: true,
  renderDelay: 1000,
};

const screenShot = (url, champ, file, callback) => {
  console.log('about to attempt screenShot of ', champ, url);
  webshot(url, file, options, (err) => {
    if (err) {
      console.log('screenShot error');
      callback();
    }
    console.log('pic downloaded');
    callback();
  });
};

module.exports.screenShot = screenShot;
