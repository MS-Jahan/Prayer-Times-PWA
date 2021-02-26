var prev = '';
var now = '';
// const status = document.getElementById('status');
const source = document.getElementById('location-search-bar');
// const result = document.getElementById('result');

const inputHandler = function (e) {
    // result.innerHTML = e.target.value;
    now = e.target.value;
}

source.addEventListener('input', inputHandler);


prev = source.innerText;

function checkChange() {
    //now = source.innerText;
    if (prev == now) {
        //status.innerText = prev + "<br/>" + now + "<br/>" + "No Change!";
    } else if (prev != now && source.value != "") {
        //status.innerText = prev + "<br/>" + now + "<br/>" + "Changed!";

        // Rest of the task in async

        (async () => {
            let response = await new Promise(resolve => {
                var xhr = new XMLHttpRequest();
                // var query = document.getElementById("source");
                // var url = "https://nominatim.openstreetmap.org/search.php?q=" + query.innerText + "&format=jsonv2";
                var url = "https://nominatim.openstreetmap.org/search.php?q=" + source.value + "&format=jsonv2";
                console.log(url);
                xhr.open("GET", url, true);
                xhr.onload = function (e) {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    resolve(undefined);
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });
            console.log(response);
            var data = JSON.parse(response);
            var ul_list = document.getElementById("ul-list");
            ul_list.innerHTML = "";
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    ul_list.innerHTML += "<li onclick='onclickLocation(this)' lat='" + data[i].lat + "' lon='" + data[i].lon + "'>" + "<span class='material-icons md-13'>place</span>&nbsp;<span>" + data[i].display_name + "</span></li>"
                }
            } else {
                ul_list.innerHTML = "<li><i>No places found!</i></li>"
            }
        })();
    }
    prev = now;
    status.innerText += " - " + new Date().toLocaleTimeString();
}

setInterval("checkChange(prev)", 3000);

function onclickLocation(element) {
    console.log("Clicked");
    localStorage.setItem("latitude", element.getAttribute("lat"));
    localStorage.setItem("longitude", element.getAttribute("lon"));
    var locationT = element.getElementsByTagName('span')[1].textContent;
    localStorage.setItem("location", locationT);
    localStorage.setItem("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
    document.getElementById("location-search-bar").style.visibility = "hidden";
    document.getElementById("search-list").style.visibility = "hidden";
}

function searchBarAppearToggle() {
    var locationBar = document.getElementById("location-search-bar");
    var searchResult = document.getElementById("search-list");
    
    if(locationBar.style.visibility == 'hidden'){
        console.log("search bar appear");
        locationBar.style.visibility = 'visible';
        searchResult.style.visibility = 'visible'
        locationBar.focus();
    } else {
        console.log("search bar disappear");
        locationBar.style.visibility = 'hidden';
        searchResult.style.visibility = 'hidden'
    }
    
}

// function searchBarDisappear() {
//     console.log("search bar disappear");
//     document.getElementById("location-search-bar").style.visibility = "hidden";
//     document.getElementById("search-list").style.visibility = "hidden";
// }