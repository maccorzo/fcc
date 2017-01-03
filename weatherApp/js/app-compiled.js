'use strict';

new Vue({
  el: '#app',
  data: {
    units: [],
    metric: ['metric', 'Celsius', 'm/s'],
    imperial: ['imperial', 'Fahrenheit', 'mph'],
    name: 'Loading . ',
    country: '...',
    temperature: '',
    clouds: '',
    weatherIcon: '',
    windDir: '',
    windSpeed: '',
    celsius: true,
    photos: {
      '01': 'https://c1.staticflickr.com/9/8658/16173761684_2468bf3588_k.jpg',
      '02': 'https://c2.staticflickr.com/4/3700/10522348485_7f6ddd894e_k.jpg',
      '03': 'https://c2.staticflickr.com/2/1538/25332062820_3a2f5a962d_k.jpg',
      '04': 'https://c2.staticflickr.com/2/1538/25332062820_3a2f5a962d_k.jpg',
      '09': 'https://c2.staticflickr.com/6/5650/23134181153_aacd40c908_k.jpg',
      '10': 'https://c2.staticflickr.com/6/5650/23134181153_aacd40c908_k.jpg',
      '11': 'https://c1.staticflickr.com/3/2850/9876813316_80c187d591_h.jpg',
      '13': 'https://c2.staticflickr.com/6/5833/23986606856_c5953128e2_k.jpg',
      '50': 'https://c2.staticflickr.com/8/7545/15960883932_e75552cc5d_k.jp'
    },
    icons: {
      '01': 'wi wi-day-sunny',
      '02': 'wi wi-day-cloudy',
      '03': 'wi wi-cloudy',
      '04': 'wi wi-cloud',
      '09': 'wi wi-showers',
      '10': 'wi wi-day-rain',
      '11': 'wi wi-thunderstorm',
      '13': 'wi wi-snow',
      '50': 'wi wi-fo'

    }
  },

  methods: {
    addClass: function addClass(e, c) {
      var el = document.querySelector(e);
      el.classList.add(c);
    },
    removeClass: function removeClass(e, c) {
      var el = document.querySelector(e);
      el.classList.remove(c);
    },
    toggleClickC: function toggleClickC() {
      this.removeClass('.cel', 'btn-default');
      this.addClass('.cel', 'btn-success');
      this.removeClass('.fah', 'btn-success');
      this.addClass('.fah', 'btn-default');
      this.celsius = true;
      this.fetchLocationData();
    },
    toggleClickF: function toggleClickF() {
      this.removeClass('.fah', 'btn-default');
      this.addClass('.fah', 'btn-success');
      this.removeClass('.cel', 'btn-success');
      this.addClass('.cel', 'btn-default');
      this.celsius = false;
      this.fetchLocationData();
    },
    fetchLocationData: function fetchLocationData() {
      var _this = this;

      fetch('https://freegeoip.net/json/').then(function (data) {
        return data.json();
      }).then(function (jObj) {
        return _this.fetchWeatherData(jObj.latitude, jObj.longitude);
      });
    },
    fetchWeatherData: function fetchWeatherData(lat, lon) {
      var _this2 = this;

      this.units = this.celsius ? this.metric : this.imperial;
      fetch('http://api.openweathermap.org/data/2.5/weather?weather&lat=' + lat + '&lon=' + lon + '&appid=90d39a0cd496e135f60c68d47381fd33&units=' + this.units[0]).then(function (data) {
        return data.json();
      }).then(function (jObj) {
        return _this2.setWeatherData(jObj);
      });
    },
    setWeatherData: function setWeatherData(data) {
      this.name = data.name;
      this.country = data.sys.country;
      this.temperature = Math.floor(data.main.temp) + '\xB0 ' + this.units[1];
      this.clouds = data.weather[0].main;
      this.weatherIcon = data.weather[0].icon;
      this.windSpeed = 'Wind ' + data.wind.speed.toFixed(1) + ' ' + this.units[2];
      this.windDir = this.getDirection(data.wind.deg);
      $('#wIcon').removeClass().addClass(this.icons[this.weatherIcon.substring(0, 2)]);
      $('body').css('background', 'url(' + this.photos[this.weatherIcon.substring(0, 2)] + ') no-repeat center center fixed');
      $('body').css('background-size', 'cover');
    },
    getDirection: function getDirection(direction) {
      var dirArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
      return dirArr[Math.floor((direction + 11.25) / 22.5)];
    }
  },
  mounted: function mounted() {
    this.fetchLocationData();
  }
});
