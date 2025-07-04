export const weatherCodeMap = {
  0:  {
    text: '晴天',
    icon: 'wi wi-day-sunny',
    color: '#fbc02d',
    tip: '今天天氣晴朗，適合戶外活動，記得補水與防曬 ☀️',
    bgClass: 'weather-clear'
  },
  1:  {
    text: '主要為晴天',
    icon: 'wi wi-day-cloudy',
    color: '#ffeb3b',
    tip: '今日大致晴朗，午後可能略有雲層，出門仍需防曬 😎',
    bgClass: 'weather-clear'
  },
  2:  {
    text: '少雲',
    icon: 'wi wi-day-cloudy',
    color: '#ffd54f',
    tip: '天氣穩定但稍有雲層，適合輕鬆散步 🌤️',
    bgClass: 'weather-cloudy'
  },
  3:  {
    text: '多雲',
    icon: 'wi wi-cloudy',
    color: '#90a4ae',
    tip: '多雲天氣，戶外活動請注意天氣變化 ☁️',
    bgClass: 'weather-cloudy'
  },
  45: {
    text: '有霧',
    icon: 'wi wi-fog',
    color: '#b0bec5',
    tip: '清晨有霧，行車視線不佳，請減速慢行 🚗🌫️',
    bgClass: 'weather-fog'
  },
  48: {
    text: '有濕霧',
    icon: 'wi wi-fog',
    color: '#cfd8dc',
    tip: '濕霧籠罩，衣物易潮濕，記得通風與除濕 🌫️',
    bgClass: 'weather-fog'
  },
  51: {
    text: '小雨',
    icon: 'wi wi-showers',
    color: '#64b5f6',
    tip: '飄著小雨，記得帶傘 ☂️，注意路滑',
    bgClass: 'weather-rain'
  },
  53: {
    text: '中雨',
    icon: 'wi wi-showers',
    color: '#42a5f5',
    tip: '中等雨勢，建議穿戴防水衣物出門 🧥',
    bgClass: 'weather-rain'
  },
  55: {
    text: '大雨',
    icon: 'wi wi-rain',
    color: '#1e88e5',
    tip: '雨勢較大，建議避免長時間外出，注意安全 🌧️',
    bgClass: 'weather-rain'
  },
  56: {
    text: '冰冷小雨',
    icon: 'wi wi-sleet',
    color: '#7986cb',
    tip: '今日低溫並伴隨小雨，外出注意保暖 🧊',
    bgClass: 'weather-snow'
  },
  57: {
    text: '冰冷大雨',
    icon: 'wi wi-sleet',
    color: '#5c6bc0',
    tip: '氣溫低且雨勢大，請穿戴防水保暖裝備 ❄️☔️',
    bgClass: 'weather-snow'
  },
  61: {
    text: '小陣雨',
    icon: 'wi wi-showers',
    color: '#4fc3f7',
    tip: '局部小雨可能出現，記得備傘 ☂️',
    bgClass: 'weather-rain'
  },
  63: {
    text: '中陣雨',
    icon: 'wi wi-showers',
    color: '#29b6f6',
    tip: '有局部降雨，建議行程預留彈性 🌦️',
    bgClass: 'weather-rain'
  },
  65: {
    text: '大陣雨',
    icon: 'wi wi-rain',
    color: '#0288d1',
    tip: '陣雨可能較大，外出請備雨具並注意安全',
    bgClass: 'weather-rain'
  },
  66: {
    text: '冰冷小陣雨',
    icon: 'wi wi-sleet',
    color: '#7986cb',
    tip: '天氣寒冷且偶有小雨，外出注意濕冷與保暖 ❄️',
    bgClass: 'weather-snow'
  },
  67: {
    text: '冰冷大陣雨',
    icon: 'wi wi-sleet',
    color: '#5c6bc0',
    tip: '強降雨且氣溫低，請避開空曠地區 🌨️',
    bgClass: 'weather-snow'
  },
  71: {
    text: '小雪',
    icon: 'wi wi-snow',
    color: '#b3e5fc',
    tip: '今日可能降雪，建議穿防滑鞋出門 🧣',
    bgClass: 'weather-snow'
  },
  73: {
    text: '中雪',
    icon: 'wi wi-snow',
    color: '#81d4fa',
    tip: '中度降雪，外出請保暖並注意交通安全 🧤',
    bgClass: 'weather-snow'
  },
  75: {
    text: '大雪',
    icon: 'wi wi-snow',
    color: '#4fc3f7',
    tip: '雪勢強，請避免開車與長途移動 ⛸️',
    bgClass: 'weather-snow'
  },
  77: {
    text: '雪粒',
    icon: 'wi wi-snow',
    color: '#4fc3f7',
    tip: '有雪粒飄落，注意低溫濕滑路面 ❄️',
    bgClass: 'weather-snow'
  },
  80: {
    text: '陣雨',
    icon: 'wi wi-rain',
    color: '#29b6f6',
    tip: '隨時可能降雨，出門務必攜帶雨具 ⛱️',
    bgClass: 'weather-rain'
  },
  81: {
    text: '強陣雨',
    icon: 'wi wi-rain',
    color: '#0288d1',
    tip: '可能有強降雨，注意行人安全與交通狀況 ⛈️',
  },
  82: {
    text: '非常強陣雨',
    icon: 'wi wi-rain',
    color: '#01579b',
    tip: '強烈降雨來襲，建議暫緩不必要外出 ⚠️',
  },
  85: {
    text: '小雪陣雨',
    icon: 'wi wi-snow',
    color: '#b3e5fc',
    tip: '局部地區可能出現小雪與濕滑路面 ❄️',
  },
  86: {
    text: '大雪陣雨',
    icon: 'wi wi-snow',
    color: '#4fc3f7',
    tip: '大雪來襲，建議備妥保暖衣物與交通安排 🛷',
  },
  95: {
    text: '雷雨',
    icon: 'wi wi-thunderstorm',
    color: '#ff7043',
    tip: '雷雨可能出現，遠離空曠區與金屬物 ⚡️',
  },
  96: {
    text: '小雷雨',
    icon: 'wi wi-thunderstorm',
    color: '#f57c00',
    tip: '小型雷雨區活動，戶外活動請留意天氣變化 ⚡',
  },
  99: {
    text: '大雷雨',
    icon: 'wi wi-thunderstorm',
    color: '#e64a19',
    tip: '劇烈雷雨與冰雹可能發生，請盡量待在室內 ⚠️⛈️',
  }
}
