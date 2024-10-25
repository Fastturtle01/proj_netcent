const { io } = require('./socket.js');


const fixedTime = 15; // Set default timer (e.g., 300 seconds)
let timerInterval = null; // To store the interval ID
let timer = fixedTime; // Start with the default fixedTime
let timerRunning = false;

exports.isTimerRunning = function(){
    return timerRunning;
}
exports.trackTime = function (socket) {
    let minute = Math.floor(timer / 60);
    let second = timer % 60;

    // Emit initial time to the client
    socket.emit('counter', { minute, second });


    // If the timer is already running, reset it
    if (timerInterval) {
        clearInterval(timerInterval); // Stop the current timer
        timer = fixedTime; // Reset the timer to fixedTime
    }

    // Start counting down every second
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            minute = Math.floor(timer / 60);
            second = timer % 60;
            io.emit('counter', { minute, second }); // Emit updated time to all clients
            console.log(minute,second);
            timerRunning = true;
        } else {
            timerRunning = false;
            const {stopSendingWord} = require('./randomword.js');
            stopSendingWord();
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            io.emit('timesUp'); // Notify all clients that time's up
        }
    }, 1000);


    socket.on('resetTimer', () => { //NOT INVOLVE IN THE PROJECT
        clearInterval(timerInterval); // Stop the current interval
        timerRunning = false;
        const {stopSendingWord} = require('./randomword.js');
        stopSendingWord();
        timerInterval = null; // Reset interval ID
        timer = fixedTime; // Reset the timer to fixedTime
        minute = Math.floor(timer / 60);
        second = timer % 60;
        io.emit('counter', { minute, second }); // Emit reset time to all clients
    });
};
