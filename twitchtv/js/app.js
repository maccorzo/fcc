/*eslint-disable */
const apiUrlUsers = 'https://wind-bow.gomix.me/twitch-api/users/';
const apiUrlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/';
const jsonData = [];

function addClickListener(el, online) {
  el.addEventListener('click', function() {
    showData(online);
  });
}
function el(element) {
  return document.querySelector(element);
}

addClickListener(el('#btn_all'));
addClickListener(el('#btn_online'), true);
addClickListener(el('#btn_offline'), false);


function ajax(url) {
  fetch(url)
  .then(data => data.json())
  .then(data => gen.next(data));
}

function* steps() {
  const streamers = ['EULCS1','ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
  let index = 0;
  // push users and streamers in array
  while(index < streamers.length) {
    let temp;
    jsonData[index] = yield ajax(apiUrlUsers+streamers[index]);
    temp = yield ajax(apiUrlStreams+streamers[index]);
    jsonData[index].stream = temp.stream;
    jsonData[index].online = jsonData[index].stream !== null;
    index++;  
  }
  yield showData();  
}

function showData(filter) {
  console.log(jsonData);
  let template = '';
  const el = document.querySelector('#app')
  const filteredData = filter === undefined ? jsonData : jsonData.filter(el => el.online === filter);

  for (let x = 0; x < filteredData.length; x += 1) {
    const {display_name, logo, name, bio, online} = filteredData[x];
    const temp = `
    <div class="box ${online === true ? 'online' : 'offline'}">
    <img class="img img-responsive" src="${logo}"> 
    <div class="info-box">
    <h3>${display_name}</h3>
    <p>${bio !== null ? bio : ''}</p>
    </div>
    </div>
    `;
    template += temp;
  }

  el.innerHTML = template;
}
const gen = steps();
gen.next();
