new Vue({
  el: '#app',
  data: {
    units: [],
    metric: ['metric', 'Celsius', 'm/s'],
    imperial: ['imperial', 'Fahrenheit', 'mph'],
    name: 'Loading . ',
    country: '...',
    temperature: '',
    temperatureArr: [],
    clouds: '',
    weatherIcon: '',
    windDir: '',
    windSpeed: '',
    windSpeedArr: [],
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
      '50': 'https://c2.staticflickr.com/8/7545/15960883932_e75552cc5d_k.jp',
    },
    icons: {
      '01': 'wi-day-sunny',
      '02': 'wi-day-cloudy',
      '03': 'wi-cloudy',
      '04': 'wi-cloud',
      '09': 'wi-showers',
      '10': 'wi-day-rain',
      '11': 'wi-thunderstorm',
      '13': 'wi-snow',
      '50': 'wi-fo',

    },
  },

  methods: {
    el(e) {
      return document.querySelector(e);
    },

    toggleClick(celsius) {
      const arrPosition = celsius ? 0 : 1;
      this.celsius = celsius;
      this.temperature = this.temperatureArr[arrPosition];
      this.windSpeed = this.windSpeedArr[arrPosition];
    },

    fetchLocationData() {
      fetch('https://freegeoip.net/json/')
      .then(data => data.json())
      .then(jObj => this.fetchWeatherData(jObj.latitude, jObj.longitude));
    },

    fetchWeatherData(lat, lon) {
      this.units = this.celsius ? this.metric : this.imperial;
      fetch(`http://api.openweathermap.org/data/2.5/weather?weather&lat=${lat}&lon=${lon}&appid=90d39a0cd496e135f60c68d47381fd33&units=${this.units[0]}`)
      .then(data => data.json())
      .then(jObj => this.setWeatherData(jObj));
    },
    setWeatherData(data) {
      this.name = data.name;
      this.country = data.sys.country;
      this.temperatureArr = [
      `${Math.floor(data.main.temp)}° ${this.metric[1]}`,
      `${Math.floor(data.main.temp * 7 / 5 + 32)}° ${this.imperial[1]}`];
      this.temperature = this.temperatureArr[0];
      this.clouds = data.weather[0].main;
      this.weatherIcon = data.weather[0].icon;
      this.windSpeedArr = [
      `Wind ${data.wind.speed.toFixed(1)} ${this.metric[2]}`,
      `Wind ${(data.wind.speed * 3600 / 1609).toFixed(1)} ${this.imperial[2]}`
      ];
      this.windSpeed = this.windSpeedArr[0];
      this.windDir = this.getDirection(data.wind.deg);
      this.el('body').style.background = `url(${this.photos[this.weatherIcon.substring(0, 2)]}) no-repeat center center fixed`;
      this.el('body').style.backgroundSize = 'cover'; 
    },
    getDirection(direction) {
      const dirArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
      return dirArr[Math.floor(((direction) + 11.25) / 22.5)];
    },
  },
  mounted() {
    this.fetchLocationData();
  },

  computed: {
    metricClass() {
      return this.celsius ? 'btn btn-success' : 'btn btn-default';
    },
    imperialClass() {
      return this.celsius ? 'btn btn-default' : 'btn btn-success';
    },
    iconClass() {
      return 'wi ' + this.icons[this.weatherIcon.substring(0, 2)];
    }
  },
});
