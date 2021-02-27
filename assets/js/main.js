$(document).ready(function () {

    let keyWord = "İstanbul";
    let cityName;
    let temp;
    let feelsLike;
    const apiKey = "01936cf9f9406f266e63be4184fd9b38"


    $("#search-input input").keyup(function (e) {
        var code = e.key;
        if (code === "Enter") e.preventDefault();
        if (code === " " || code === "Enter" || code === "," || code === ";") {
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
                    // Fake request delay
                    setTimeout(() => {
                        $(".city-info-content").show()
                        $(".loader").hide()
                    }, 1000);
                })
        }


    })
})

