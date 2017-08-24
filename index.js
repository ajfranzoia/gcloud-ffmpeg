'use strict';

var Ffmpeg = require('fluent-ffmpeg');

Ffmpeg.setFfmpegPath(__dirname + '/node_modules/.bin/ffmpeg');

exports.http = (request, response) => {
  response
    .status(200)
    .set({'content-type': 'audio/mp3'});

  const audio =
    (new Ffmpeg(__dirname + '/eagle.mp3'))
      .audioBitrate('128k')
      .output(response, { end:true })
      .run();
};

exports.event = (event, callback) => {
  callback();
};
