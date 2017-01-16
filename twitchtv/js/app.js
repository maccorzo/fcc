/*eslint-disable */
const apiUrlUsers = 'https://wind-bow.gomix.me/twitch-api/users/';
const apiUrlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/';

function ajax(url) {
  fetch(url)
  .then(data => data.json())
  .then(data => gen.next(data));
}

function* steps() {
  const streamers = ['EULCS1','ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
  const userJson = [];
  const streamJson = [];
  userJson.push(yield ajax(apiUrlUsers+streamers[0]));
  userJson.push(yield ajax(apiUrlUsers+streamers[1]));
  userJson.push(yield ajax(apiUrlUsers+streamers[2]));
  userJson.push(yield ajax(apiUrlUsers+streamers[3]));
  userJson.push(yield ajax(apiUrlUsers+streamers[4]));
  userJson.push(yield ajax(apiUrlUsers+streamers[5]));
  userJson.push(yield ajax(apiUrlUsers+streamers[6]));
  userJson.push(yield ajax(apiUrlUsers+streamers[7]));
  userJson.push(yield ajax(apiUrlUsers+streamers[8]));

  streamJson.push(yield ajax(apiUrlStreams+streamers[0]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[1]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[2]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[3]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[4]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[5]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[6]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[7]));
  streamJson.push(yield ajax(apiUrlStreams+streamers[8]));
  yield parseData(userJson, streamJson);
}

function parseData(user, stream) {
  console.log(user, stream);
  for(line of user) {
    console.log(line.stream);
  }
}

const gen = steps();
gen.next();
