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


function add_current_prayer_text(prayer_box_element) {
    try {
        document.getElementById('current-prayer-text').remove();
    } catch {
        console.log("couldn't delete")
    }

    var html_string = "<i id='current-prayer-text'>Current Prayer</i>";
    var inside_box = prayer_box_element.getElementsByClassName('inside-prayer-box')[0];
    inside_box.innerHTML = html_string + inside_box.innerHTML;
}


function updatePrayerTimes() {

    var coordinates = new adhan.Coordinates(23.566000, 90.373000);
    var params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Hanafi;
    var date = new Date();

    var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    var currentPrayer = prayerTimes.currentPrayer();
    var nextPrayer = prayerTimes.nextPrayer();
    var nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);
    //console.log(currentPrayer);
    
    var lastPrayer;
    try {
        lastPrayer = sessionStorage.getItem("lastPrayer");
    } catch {
        sessionStorage.setItem("lastPrayer", "fajr");
        lastPrayer = sessionStorage.getItem("lastPrayer");
    }

    //console.log(lastPrayer);


    var fajrTime = moment(prayerTimes.fajr).tz('Asia/Dhaka').format('hh:mm A');
    var sunriseTime = moment(prayerTimes.sunrise).tz('Asia/Dhaka').format('hh:mm A');
    var dhuhrTime = moment(prayerTimes.dhuhr).tz('Asia/Dhaka').format('hh:mm A');
    var asrTime = moment(prayerTimes.asr).tz('Asia/Dhaka').format('hh:mm A');
    var sunsetTime = moment(prayerTimes.maghrib).subtract(10, 'minutes').tz('Asia/Dhaka').format('hh:mm A')
    var maghribTime = moment(prayerTimes.maghrib).tz('Asia/Dhaka').format('hh:mm A');
    var ishaTime = moment(prayerTimes.isha).tz('Asia/Dhaka').format('hh:mm A');

    var fajrTime = moment(prayerTimes.fajr).tz('Asia/Dhaka').format('h:mm A');
    var sunriseTime = moment(prayerTimes.sunrise).tz('Asia/Dhaka').format('h:mm A');
    var dhuhrTime = moment(prayerTimes.dhuhr).tz('Asia/Dhaka').format('h:mm A');
    var asrTime = moment(prayerTimes.asr).tz('Asia/Dhaka').format('h:mm A');
    var sunsetTime = moment(prayerTimes.maghrib).subtract(10, 'minutes').tz('Asia/Dhaka').format('h:mm A')
    var maghribTime = moment(prayerTimes.maghrib).tz('Asia/Dhaka').format('h:mm A');
    var ishaTime = moment(prayerTimes.isha).tz('Asia/Dhaka').format('h:mm A');


    function updater(index, time) {
        document.getElementsByClassName('prayer-time')[index].textContent = time;
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
        var current_prayer_box = document.getElementById(currentPrayer);
        current_prayer_box.style.width = "200px";
        current_prayer_box.style.height = "200px";
        current_prayer_box.getElementsByClassName('inside-prayer-box')[0].style.padding = "50px 0";

        add_current_prayer_text(current_prayer_box);
    } catch {
        ;
    }

    document.getElementById('sunrise-time').innerText = sunriseTime;
    document.getElementById('sunset-time').innerText = sunsetTime;

    var v = setTimeout(updatePrayerTimes, 5000);

    if (lastPrayer != null && lastPrayer != currentPrayer) {
        console.log(lastPrayer, currentPrayer, nextPrayer, nextPrayerTime);
        var current_prayer_box = document.getElementById(lastPrayer)
        current_prayer_box.style.width = "170px";
        current_prayer_box.style.height = "170px";
        current_prayer_box.getElementsByClassName('inside-prayer-box')[0].style.padding = "45px 0";

        document.getElementById('sunrise-time').innerText = sunriseTime;

        var v = setTimeout(updatePrayerTimes, 5000);

        lastPrayer = currentPrayer;
        sessionStorage.setItem("lastPrayer", currentPrayer);
    }
}

updatePrayerTimes();

