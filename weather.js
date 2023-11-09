window.addEventListener('load', func);

function func() {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const url = "https://api.open-meteo.com/v1/forecast?";

            const api = `${url}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            fetch(api).then(
                apiResponse => {
                    return apiResponse.json().then(
                        data => {
                            // console.log(data);
                            const {interval, temperature_2m, time, wind_speed_10m} = data.current;
                            console.log(data);
                            const part = time.split("T");
                            document.getElementById("fullDate").textContent = part[0];
                            document.getElementById("time").textContent = part[1];
                            document.getElementById("temperature").textContent = temperature_2m + " degree Celsius";
                            document.getElementById("windSpeed").textContent = wind_speed_10m + " km/h";
                        }
                    )
                }
            )
        });
    }
}

document.getElementById("submitButton").addEventListener("click", () => {
    const location = document.getElementById("searchByLocation").value;
    const api = `https://us1.locationiq.com/v1/search?key=pk.40c3e46281233e3f591104008fa859ce&q=${location}&format=json`;
    fetch(api).then(
        apiResponse => {
            return apiResponse.json().then(
                data => {
                    const {lon, lat} = data[0];
                    updateDom(lon, lat);
                }
            )
        }
    )
})

function updateDom(longitude, latitude) {
    let long = longitude;
    let lat = latitude;

    const url = "https://api.open-meteo.com/v1/forecast?";
    const api = `${url}latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(api).then(
        apiResponse => {
            return apiResponse.json().then(
                data => {
                    console.log(data);
                    const {interval, temperature_2m, time, wind_speed_10m} = data.current;
                    part = time.split("T");
                    document.getElementById("fullDate").textContent = part[0];
                    document.getElementById("time").textContent = part[1];
                    document.getElementById("temperature").textContent = temperature_2m + " degree Celsius";
                    document.getElementById("windSpeed").textContent = wind_speed_10m + " km/h";
                }
            )
        }
    );
}

