(async () => {
    let response = await new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.ipgeolocation.io/ipgeo?apiKey=37b5cfa9061c4deeb212a2884954fbdf", true);
        xhr.onload = function (e) {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            resolve(undefined);
            console.error("** An error occurred during the XMLHttpRequest");
        };
        xhr.send();
    });
    var r = JSON.parse(response);
    console.log(r);
    localStorage.setItem("city", r.city + ", " + r.district + ", " + r.country_name);
    localStorage.setItem("latitude", r.latitude);
    localStorage.setItem("longitude", r.longitude);
    localStorage.setItem("timezone", r.time_zone.name);
})();