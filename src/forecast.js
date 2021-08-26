const geocode = (location, callback) => {
    const access_key_geo = "pk.eyJ1IjoicGFjaWZpZXIxMjEiLCJhIjoiY2trN2E3Mmk0MGMyMDJubXZ5aDE4ZmE0dCJ9.edddL0DzHyBjr2yLXBOnUg";
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=" + access_key_geo + "&limit=1";

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback("Cannot contact the location services.", null);
        } else if (!res.features) {
            callback("Cannot find the location.", null);
        } else {
            try {
                const long = res.body.features[0].bbox[0];
                const lat = res.body.features[0].bbox[1];
                let query = String(long.toFixed(4)) + "," + String(lat.toFixed(4));
                callback(null, query);
            } catch (e) {
                console.error(chalk.red("Cannot find the location"));
            }
        }
    })
}

const forecast = (location, callback) => {
    geocode(location, (query) => {
        const access_key = "6d8ef9f3cbe759185b3a12e6f2a6b9f2";
        const url = "http://api.weatherstack.com/current?access_key=" + access_key + "&query=" + query;

        request({ url: url, json: true }, (err, res) => {
            if (err) {
                callback("Cannot contact the weather services.", null);
            } else if (res.error) {
                callback("Cannot find the location. Try some other search term.");
            } else {
                let details = {
                    location: location,
                    forecasts: res.body.current.weather_descriptions,
                    humidity: res.body.current.humidity,
                    temperature: res.body.current.temperature,
                }
                callback(null, details);
            }
        })
    })
}


module.exports = forecast;