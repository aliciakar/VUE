//Hämtar current position från geolocation
export function getPosition() {
  return new Promise((resolve, reject) => {
    //Om det tillåts hämtas det och lat/long definas
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({
          position: {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
          },
        })
      })
    } else {
      reject('Geolocation is not supported by this browser.')
    }
  })
}

//Hämtar addressen för currentlocation
export function getAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    fetch(
      //API
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=911951ed4a3b42018099495d912f56d3`,
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          reject('Failed to fetch address.')
        }
      })
      .then(data => {
        if (data.results && data.results.length > 0) {
          //Adressen blir formatted
          resolve(data.results[0].formatted)
        } else {
          reject('No address found.')
        }
      })
      .catch(err => reject(err))
  })
}
