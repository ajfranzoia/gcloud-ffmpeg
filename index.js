'use strict';

var Ffmpeg = require('fluent-ffmpeg');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
Ffmpeg.setFfmpegPath(ffmpeg.path);

exports.http = (request, response) => {
  console.log(ffmpeg.path, ffmpeg.version);

  response
    .status(200)
    .set({'content-type': 'audio/mp3'});

  const audio =
    (new Ffmpeg(__dirname + '/eagle.mp3'))
      .audioBitrate('128k')
      .output(response, { end:true })
      .format('mp3')
      .on('start', function(commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
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