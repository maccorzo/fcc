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
  let index = 0;
  // push users and streamers in array
  while(index < streamers.length) {
    userJson.push(yield ajax(apiUrlUsers+streamers[index]));
    streamJson.push(yield ajax(apiUrlStreams+streamers[index]));
    index++;
  }
  yield parseData(userJson, streamJson);

}

function parseData(users, streams) {
  console.log(users, streams);
}

const gen = steps();
gen.next();

