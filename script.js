const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let intervalId
let state = false



document.getElementById("button").addEventListener("click", ()=> {
    const title = document.querySelector("#title").value
    if(title === "") {
        alert("Title field cannot be empty")
        return
    }
    const year = document.querySelector("#year").value
    let monthOfYear = document.querySelector("#month").value
    monthOfYear = month.indexOf(monthOfYear)+1
    const day = document.querySelector("#day").value
    const futureDate = `${year}-${monthOfYear}-${day}`
    const isValid = +new Date(futureDate) - +new Date()
    if(isValid <= 0) {
        alert("Enter future date")
        return
    }
    state = true
    JSON.stringify(localStorage.setItem("date", futureDate))
    JSON.stringify(localStorage.setItem("title", title)) 
    JSON.stringify(localStorage.setItem("curr_state", state))     

    document.querySelector(".container").style.display = "none"
    document.querySelector(".countdown").style.display= "flex"
    countdownTimer()
    intervalId = setInterval(() => countdownTimer(), 1000)
})

document.getElementById("changebtn").addEventListener("click", ()=> {
    document.querySelector(".container").style.display = "block"
    document.querySelector(".countdown").style.display= "none"
    clearInterval(intervalId);
})


const countdownTimer = () => {
    const futureDate = localStorage.getItem("date")
    const title = localStorage.getItem("title")
    const difference = +new Date(futureDate) - +new Date()
    let remaining = ""

    if(difference > 0) {
        const parts = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
        remaining = Object.keys(parts).map(part => {
            if(!parts[part]) return
            return `${parts[part]}`
        }).join(" ")
    }
    const days = parseInt(remaining.split(" ")[0])
    const hours = parseInt(remaining.split(" ")[1])
    const minutes = parseInt(remaining.split(" ")[2])
    const seconds = parseInt(remaining.split(" ")[3])
    document.querySelector("#event-title").innerHTML = title
    const daysSelector = document.querySelector(".days")
    const hoursSelector = document.querySelector(".hours")
    const minutesSelector = document.querySelector(".minutes")
    const secondsSelector = document.querySelector(".seconds")
    
    if(isNaN(days) && isNaN(hours) && isNaN(minutes) && isNaN(seconds)) {
        alert("Time's up")
    }

    if(isNaN(days)){
        daysSelector.style.display = "none"
        daysSelector.nextElementSibling.style.display="none"
    }else {
        daysSelector.style.display = "inline"
        daysSelector.nextElementSibling.style.display="inline"
        daysSelector.innerHTML = days
    }
    
    if(isNaN(hours)) {
        hoursSelector.style.display = "none"
        hoursSelector.nextElementSibling.style.display="none"
    }else {
        hoursSelector.style.display = "inline"
        hoursSelector.nextElementSibling.style.display="inline"
        hoursSelector.innerHTML = hours
    }

    if(isNaN(minutes)) {
        minutesSelector.style.display = "none"
        minutesSelector.nextElementSibling.style.display="none"
    }else {
        minutesSelector.style.display = "inline"
        minutesSelector.nextElementSibling.style.display="inline"
        minutesSelector.innerHTML = minutes
    }

    if(isNaN(seconds)) {
        minutesSelector.style.display = "none"
    }else {
        minutesSelector.style.display = "inline"
        secondsSelector.innerHTML = seconds
    }
}
if(JSON.parse(localStorage.getItem("curr_state")) === true) {
    document.querySelector(".container").style.display = "none"
    document.querySelector(".countdown").style.display= "flex"
    countdownTimer()
    intervalId = setInterval(() => countdownTimer(), 1000)
} 
