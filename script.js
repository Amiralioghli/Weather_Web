const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location p:nth-of-type(2)");
const conditionField = document.querySelector(".condition p:nth-of-type(2)");
const emojiField = document.querySelector(".condition p:nth-of-type(1)"); // First <p> for emoji

const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".error_message");

form.addEventListener('submit', searchForLocation);

let target = 'Washington DC';

// 🌤 Emoji Mapping Function
function getEmoji(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("sunny")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
    if (condition.includes("storm") || condition.includes("thunder")) return "⛈️";
    if (condition.includes("clear")) return "🌞";
    return "🌈"; // Default emoji
}

function setBackground(condition) {
    const container = document.querySelector(".container");
    condition = condition.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
        container.style.background = "linear-gradient(to right, #fceabb, #f8b500)"; // Sunny yellow
    } else if (condition.includes("cloud")) {
        container.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)"; // Cloudy gray
    } else if (condition.includes("rain")) {
        container.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)"; // Rainy blue
    } else if (condition.includes("snow")) {
        container.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)"; // Snowy light blue
    } else if (condition.includes("mist") || condition.includes("fog")) {
        container.style.background = "linear-gradient(to right, #606c88, #3f4c6b)"; // Foggy
    } else if (condition.includes("storm") || condition.includes("thunder")) {
        container.style.background = "linear-gradient(to right, #283e51, #485563)"; // Storm dark
    } else {
        container.style.background = "linear-gradient(to right, #8360c3, #2ebf91)"; // Default colorful
    }
}


const fetchResults = async (targetLocation, showError = false) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=1949c5d4944b4dbd98a192115252006&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Location not found");
        }

        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);

        errorMessage.innerText = "";
    } catch (err) {
        if (showError) {
            errorMessage.innerText = "Your input is not match in our record, please try again...";
        }
        console.error(err);
    }
};

function updateDetails(temp, locationName, time, condition) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = time;
    conditionField.innerText = condition;
    emojiField.innerText = getEmoji(condition);
    setBackground(condition); // 🔥 Add this line to apply background
}


function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target !== "") {
        fetchResults(target, true);
    } else {
        errorMessage.innerText = "Please enter a location, search box is empty!";
    }
}

fetchResults(target);
