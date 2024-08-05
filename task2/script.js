// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapsContainer = document.getElementById('laps');

    startStopButton.addEventListener('click', startStop);
    resetButton.addEventListener('click', reset);
    lapButton.addEventListener('click', recordLap);

    function startStop() {
        if (!running) {
            console.log('Starting stopwatch');
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 10);
            running = true;
            startStopButton.innerHTML = "Pause";
            resetButton.style.display = "none";
        } else {
            console.log('Pausing stopwatch');
            clearInterval(tInterval);
            savedTime += difference;
            running = false;
            startStopButton.innerHTML = "Start";
            resetButton.style.display = "inline";
        }
    }

    function reset() {
        console.log('Resetting stopwatch');
        clearInterval(tInterval);
        savedTime = 0;
        difference = 0;
        running = false;
        startStopButton.innerHTML = "Start";
        resetButton.style.display = "none";
        display.innerHTML = "00:00:00";
        lapsContainer.innerHTML = "";
        lapCount = 0;
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = (updatedTime - startTime) + savedTime;

        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((difference % 1000) / 10); // Added milliseconds

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds; // Added milliseconds display
    }

    function recordLap() {
        if (running) {
            lapCount++;
            const lapTime = display.innerHTML;
            const lapElement = document.createElement('div');
            lapElement.className = 'lap';
            lapElement.innerHTML = `Lap ${lapCount}: ${lapTime}`;
            lapsContainer.appendChild(lapElement);
        }
    }
});
