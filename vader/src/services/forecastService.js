export function getForecast(location) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.position.lat}&longitude=${location.position.long}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto`,
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          reject(response.json())
        }
      })
      .then(data => {
        resolve(transformData(data))
      })
  })
}

export function getCurrentWeather(location) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.position.lat}&longitude=${location.position.long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=ms`,
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          reject(response.json())
        }
      })
      .then(data => {
        resolve(transformCurrentData(data))
      })
  })
}

function transformData(raw) {
  let weatherData = {}
  weatherData.position = { lat: raw.latitude, long: raw.longitude }
  weatherData.timezone = {
    offset: raw.utc_offset_seconds,
    name: raw.timezone,
    short: raw.timezone_abbreviation,
  }

  weatherData.weather = []
  for (let i = 0; i < raw.daily.time.length; i++) {
    let data = {
      date: raw.daily.time[i],
      code: raw.daily.weather_code[i],
      temp: {
        max: raw.daily.temperature_2m_max[i],
        min: raw.daily.temperature_2m_min[i],
        unit: raw.daily_units.temperature_2m_max,
      },
      precipitation: {
        sum: raw.daily.precipitation_sum[i],
        probability: raw.daily.precipitation_probability_max[i],
        unit: raw.daily_units.precipitation_sum,
      },
      wind: {
        direction: raw.daily.wind_direction_10m_dominant[1],
        direction_unit: raw.daily_units.wind_direction_10m_dominant,
        speed: raw.daily.wind_speed_10m_max[i],
        gusts: raw.daily.wind_gusts_10m_max[i],
        unit: raw.daily_units.wind_speed_10m_max,
      },
    }
    weatherData.weather.push(data)
  }
  return weatherData
}

function transformCurrentData(raw) {
  let currentWeatherData = {}
  currentWeatherData.position = { lat: raw.latitude, long: raw.longitude }
  currentWeatherData.timezone = {
    offset: raw.utc_offset_seconds,
    name: raw.timezone,
    short: raw.timezone_abbreviation,
  }

  currentWeatherData.weather = []
  let data = {
    code: raw.current.weather_code,
    temp: {
      temp: raw.current.temperature_2m,
      aptemp: raw.current.apparent_temperature,
      unit: raw.current_units.temperature_2m,
    },
    humidity: {
      relativehumidity: raw.current.relative_humidity_2m,
      unit:raw.current_units.relative_humidity_2m
    },
    wind: {
      direction: raw.current.wind_direction_10m,
      direction_unit: raw.current_units.wind_direction_10m,
      speed: raw.current.wind_speed_10m,
      gusts: raw.current.wind_gusts_10m,
      unit: raw.current_units.wind_speed_10m,
    },
    cloud: {
      cover: raw.current.cloud_cover,
      unit: raw.current_units.cloud_cover,
    },
    pressure: {
      pressure: raw.current.pressure_msl,
      unit: raw.current_units.pressure_msl,
    },
    precipitation: {
      precip: raw.current.precipitation,
      unit: raw.current_units.precipitation,
    },
  }
  currentWeatherData.weather.push(data)
  return currentWeatherData
}
