if (localStorage.getItem("timezone") == null) {
    localStorage.setItem("location", "Tungi, Dhaka, Bangladesh");
    localStorage.setItem("latitude", "23.8983");
    localStorage.setItem("longitude", "90.6615");
    localStorage.setItem("timezone", "Asia/Dhaka");
}

// (async () => {
//     let response = await new Promise(resolve => {
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", "https://api.ipgeolocation.io/ipgeo?apiKey=37b5cfa9061c4deeb212a2884954fbdf", true);
//         xhr.onload = function (e) {
//             resolve(xhr.response);
//         };
//         xhr.onerror = function () {
//             resolve(undefined);
//             console.error("** An error occurred during the XMLHttpRequest");
//         };
//         xhr.send();
//     });
//     var r = JSON.parse(response);
//     console.log(r);
//     localStorage.setItem("city", r.city + ", " + r.district + ", " + r.country_name);
//     localStorage.setItem("latitude", r.latitude);
//     localStorage.setItem("longitude", r.longitude);
//     localStorage.setItem("timezone", r.time_zone.name);
// })();


function updateDateTime() {
    var time = new Date();
    t = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    var hour = (time.getHours() > 12) ? time.getHours() - 12 : ((time.getHours() == 0) ? 12 : time.getHours());
    hour = hour > 9 ? hour : '0' + hour;

    var minute = time.getMinutes();
    minute = minute > 9 ? minute : '0' + minute;

    var second = time.getSeconds();
    second = second > 9 ? second : '0' + second;


    document.getElementById('hour').innerText = hour;
    document.getElementById('minute').innerText = minute;
    document.getElementById('second').innerText = second;
    document.getElementById('am-pm').innerText = (time.getHours() > 12) ? "PM" : "AM";

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById("day").innerHTML = days[time.getDay()];
    document.getElementById("date").innerHTML = time.getDate();
    document.getElementById("month").innerHTML = months[time.getMonth()];
    document.getElementById("year").innerHTML = time.getFullYear();
    var t = setTimeout(updateDateTime, 1000);
}

updateDateTime();


function updatePrayerTimes() {

    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var timezone = localStorage.getItem("timezone");
    var locationT = localStorage.getItem("location");

    document.getElementById("location").textContent = locationT;

    var coordinates = new adhan.Coordinates(latitude, longitude);
    var params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Hanafi;
    var date = new Date();

    var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    var currentPrayer = prayerTimes.currentPrayer();
    var nextPrayer = prayerTimes.nextPrayer();
    var nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);
    //console.log(currentPrayer);


    var fajrTime = moment(prayerTimes.fajr).tz(timezone).format('hh:mm A');
    var sunriseTime = moment(prayerTimes.sunrise).tz(timezone).format('hh:mm A');
    var dhuhrTime = moment(prayerTimes.dhuhr).tz(timezone).format('hh:mm A');
    var asrTime = moment(prayerTimes.asr).tz(timezone).format('hh:mm A');
    var sunsetTime = moment(prayerTimes.maghrib).tz(timezone).format('hh:mm A');
    var maghribTime = moment(prayerTimes.maghrib).tz(timezone).format('hh:mm A');
    var ishaTime = moment(prayerTimes.isha).tz(timezone).format('hh:mm A');


    function updater(index, time) {
        document.getElementsByClassName('prayer-time')[index].textContent = time;

        try {
            document.getElementsByClassName('prayer-time')[index].style.backgroundColor = null;
        } catch {

        }
    }

    for (var i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                updater(0, fajrTime);
                break;

            case 1:
                updater(1, dhuhrTime);
                break;

            case 2:
                updater(2, asrTime);
                break;

            case 3:
                updater(3, maghribTime);
                break;

            case 4:
                updater(4, ishaTime);
                break;

        }
    }

    try {
        if (currentPrayer != 'sunrise') {
            document.getElementById(currentPrayer).style.background = "#329e5d";
        }
    } catch {
        //document.getElementById(currentPrayer).style.backgroundColor = "#96d3fd";
    }

    document.getElementById('sunrise-time').innerText = sunriseTime;
    document.getElementById('sunset-time').innerText = sunsetTime;

    var v = setTimeout(updatePrayerTimes, 5000);

}

updatePrayerTimes();



// function searchLocationUsingAPI() {
//     var previuosInput = "";
//     var currentInput = "";

//     while(1)
// }