$(document).ready(function () {
    let keyWord = "İstanbul";
    let cityName;
    let temp;
    let feelsLike;
    const apiKey = "01936cf9f9406f266e63be4184fd9b38"


    $("#search-input input").keyup(function (e) {
        var code = e.key;
        if (code === "Enter") e.preventDefault();
        if (code === "Enter") {
            keyWord = $(this).val()
            $.ajax({
                method: "GET",
                url: `http://api.weatherstack.com/current?access_key=${apiKey}&query=${keyWord}`,
            })
                .then(response => {
                    $(".loader").show()
                    $("#city-name h3").text(response.location.name)
                    $("#city-temp .temp-number").text(response.current.temperature)
                    $("#feels-like .feels-number").text(response.current.feelslike)
                    let time12h = response.current.observation_time
                    // let [clock, timezone] = time.split(" ")
                    // let [hour, min] = clock.split(":")
                    let time24h = convertTime12to24(time12h)
                    let [hour, min] = time24h.split(":")
                    let app = $("#app")
                    app.removeClass("night day")
                    if (hour >= "20" && hour <= "4") {
                        app.addClass("night")
                    }else if (hour > "4" && hour < "15") {
                        app.addClass("day")
                    }
                    // Fake request delay
                    setTimeout(() => {
                        $(".city-info-content").show()
                        $(".loader").hide()
                        $(this).val("")
                    }, 1000);
                }).catch(error => {
                    swal("Upss!", `There is no city called ${keyWord}`, "error");
                    $(".loader").hide()
                })
        }
    })
})

const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

