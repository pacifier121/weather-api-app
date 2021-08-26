const weatherForm = document.querySelector('form');
const loadingText = document.querySelector('.loading-text');
const weatherInfo = document.querySelector('.weather-info');
const locationInput = document.querySelector('#location');
const msgs = [document.querySelector('#msg-1'), document.querySelector('#msg-2'), document.querySelector('#msg-3'),
    document.querySelector('#msg-4')
]
const weatherImg = document.querySelector('#weather-img');

weatherForm.addEventListener('submit', (event) => {
    loadingText.style.display = 'block';
    loadingText.textContent = "Fetching weather information...";
    weatherInfo.style.visibility = "hidden";
    let loc = locationInput.value;
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(loc) + ".json?access_token=pk.eyJ1IjoicGFjaWZpZXIxMjEiLCJhIjoiY2trN2E3Mmk0MGMyMDJubXZ5aDE4ZmE0dCJ9.edddL0DzHyBjr2yLXBOnUg&limit=1";

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loadingText.value = 'Location not found. Please try a different search term';
            } else {
                try {
                    const query = String(data.features[0].center[1].toFixed(4)) + "," + String(data.features[0].center[0].toFixed(4));
                    const access_key = "6d8ef9f3cbe759185b3a12e6f2a6b9f2";
                    const url2 = "http://api.weatherstack.com/current?access_key=" + access_key + "&query=" + query;
                    fetch(url2).then((response) => {
                        response.json().then(data => {
                            let details = {
                                location: loc,
                                temperature: data.current.temperature,
                                humidity: data.current.humidity,
                                forecast: data.current.weather_descriptions[0],
                                image: data.current.weather_icons[0]
                            }
                            loadingText.style.display = 'none';
                            weatherInfo.style.visibility = "visible";
                            msgs[0].textContent = details.location;
                            msgs[1].textContent = details.temperature;
                            msgs[2].textContent = details.humidity;
                            msgs[3].textContent = details.forecast;
                            weatherImg.src = details.image;
                        })
                    })
                } catch (e) {
                    loadingText.textContent = 'Location not found. Please try a different search term';
                }
            }
        })
    })

    event.preventDefault();
})