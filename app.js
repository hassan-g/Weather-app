window.addEventListener("load", () => {
    let long;
    let lat;


    if (navigator.geolocation) {


        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let proxy = "https://cors-anywhere.herokuapp.com/";
            console.log(lat, long);
            const api = `http://api.weatherapi.com/v1/current.json?key=db2ac7b3b6b54c00922154730221208&q=${lat},${long}&aqi=yes&lang=ar&days=7`;


            getData(api)

            console.log(position);


        });
    };


});


async function getData(api) {

    let timeZone = document.querySelector('.location-timezone');
    let img = document.getElementById("img")
    let tempSection = document.querySelector('.temperture')
    let temDgree = document.querySelector('.temperture-degree');
    let span = document.querySelector('.temperture span')
    let tempDescrption = document.querySelector('.temperture-description')

    let response = await fetch(api);
    let data = await response.json();


    timeZone.textContent = data.location.region;

    img.setAttribute("src", "https://" + data.current.condition.icon)

    temDgree.textContent = data.current.temp_f;
    tempDescrption.textContent = data.current.condition.text

    tempSection.addEventListener('click', () => {

        if (span.textContent === "F") {
            temDgree.textContent = data.current.temp_c;
            span.textContent = "C"
        } else if (span.textContent === "C") {
            temDgree.textContent = data.current.temp_f;
            span.textContent = "F"
        }
    })

    console.log(data);

}




