const webshot = require('webshot');


const options = {};
options.windowSize = { width: 1024, height: 768 };
options.shotSize = { width: 'all', height: 'all' };
options.siteType = 'url';
// options.renderDelay = 1000;
options.defaultWhiteBackground = true;


const screenshot = (champ, callback) => {
  console.log('about to attempt screenshot of ', champ);
  const url = `http://champion.gg/champion/${champ}`;
  webshot(url, 'build.png', options, (err) => {
    if (err) {
      console.log('screenshot error');
      callback(false);
    }
    console.log('pic downloaded');
    callback(true);
  });
};

module.exports = screenshot;
