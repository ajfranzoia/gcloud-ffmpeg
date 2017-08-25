'use strict';

var binaries = require('ffmpeg-binaries');
var Ffmpeg = require('fluent-ffmpeg');

Ffmpeg.setFfmpegPath(binaries.ffmpegPath());

exports.http = (request, response) => {
  response
    .status(200)
    .set({'content-type': 'audio/mp3'});

  const audio =
    (new Ffmpeg(__dirname + '/eagle.mp3'))
      .audioBitrate('128k')
      .output(response, { end:true })
      .on('end', () => {
        console.log('Finished processing');
      })
      .on('error', (err, stdout, stderr) => {
        console.log('Cannot process video: ' + err.message);
        console.log(stdout, stderr);
      })
      .run();
};

exports.event = (event, callback) => {
  callback();
};
