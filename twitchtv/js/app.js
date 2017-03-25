/*eslint-disable */
const apiUrlUsers = 'https://wind-bow.glitch.me/twitch-api/users/';
const apiUrlStreams = 'https://wind-bow.glitch.me/twitch-api/streams/';
const jsonData = [];
const streamers = ['not__a___user__', 'EULCS1','ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];


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
addClickListener(el('#btn_errors'), '');

function ajax(url) {
  fetch(url)
  .then(data => data.json())
  .then(data => gen.next(data));
}

function* steps() {
  let index = 0;
  // push users and streamers in array
  while(index < streamers.length) {
    let temp;
    jsonData[index] = yield ajax(apiUrlUsers+streamers[index]);
    if (jsonData[index].error) { 
      jsonData[index].online = '';

    } else {
      temp = yield ajax(apiUrlStreams+streamers[index]);
      jsonData[index].stream = temp.stream;
      jsonData[index].online = jsonData[index].stream !== null;
    }
    index++;  
  }
  yield showData();  
}

function showData(filter ) {
  console.log(filter);
  let template = '';
  let timeout = 1;
  const filteredData = filter === undefined ? jsonData : jsonData.filter(el => el.online === filter);
  if (el('.box') != null) {

    const temp = document.querySelectorAll('.box');
    temp.forEach(el => el.classList.add('bounceOut'));
    timeout = 750;
  } 

  setTimeout(function() {
    for (let x = 0; x < filteredData.length; x += 1) {
      const {display_name, logo, name, bio, online} = filteredData[x];
      const temp = `
      <div class="col-md-6">
      <div class="box ${online ? 'online' : (online === '' ? 'error':'offline')} animated bounceIn">
      <img class="img img-responsive img-rounded" src="${logo}" onerror="if (this.src != 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/515225/sorry.svg') this.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/515225/sorry.svg';"> 
      <div class="info-box">
      <h3>${display_name !== undefined ? display_name : streamers[x]}</h3>
      <p>${bio !== null ? (bio === undefined ? 'Twitch account is closed or the account never existed!' : bio ) : ''}</p>
      </div>
      </div>
      </div>
      `;
      template += temp;
    }


    el('#app').innerHTML = template;
  }, timeout);
}

const gen = steps();
gen.next();
