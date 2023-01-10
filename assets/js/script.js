const date = new Date(Date.UTC(2023, 0, 15, 23, 0, 0))

function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

function convertTimezone(timeUTC, timezone) {
    return new Date((typeof timeUTC === "string" ? new timeUTC(timeUTC) : timeUTC).toLocaleString("en-US", {timeZone: timezone}));
}

var countdownDate = convertTimezone(date).getTime()
console.log(countdownDate)
if ($(".countdown").length) {
    var x = setInterval(function() {
        var now = new Date().getTime()
        var remainingTime = countdownDate - now;
    
        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
        document.getElementById("days").innerText = checkZeros(days);
        document.getElementById("hours").innerText = checkZeros(hours);
        document.getElementById("minutes").innerText = checkZeros(minutes);
        document.getElementById("seconds").innerText = checkZeros(seconds);
    
        if (remainingTime < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}


function checkZeros(number) {
    return String(number).padStart(2, '0');
}



function yearWatcher() {
    if (!$("#year-select").length) {
        return
    }
    !$("#year-select").on("change", function() {
        console.log(this.value)
        $.ajax({
            type: "POST",
            url: "/resultats",
            data: { "requestedYear": this.value },
            success: function(data) {
                console.log(data)
            }
        })
    })
}

yearWatcher()

document.querySelectorAll(".container").forEach(container => {
    container.addEventListener("click", function() {
            removeVisible(container)            
        container.querySelector(".content").classList.toggle("visible")
        toggleArrowDir(container)
    })
})

function removeVisible(current) {
    document.querySelectorAll(".container").forEach(container => {
        if (container != current) {
            container.querySelector(".content").classList.remove("visible")
        }
    })
}

function toggleArrowDir(current) {
    let currentArrow = current.querySelector(".down-arrow") 
    currentArrow.innerHTML = currentArrow.innerHTML == "expand_more" ? "expand_less" : "expand_more"
}

document.querySelector(".icon-menu").addEventListener("click", function() { 
    document.querySelector(".nav-links").classList.toggle("visible")
})

window.addEventListener("resize", function() {
    if (this.innerWidth > 950) {
        this.document.querySelector(".nav-links").classList.remove("visible")
    }
})