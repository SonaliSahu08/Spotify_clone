// 1. Setup - Link to your audio file
const audio = new Audio('song.mp3');

// 2. Select HTML Elements
const ctrlIcon = document.getElementById("ctrlIcon"); // The Play/Pause Icon
const progressBar = document.querySelector(".progress-bar"); // The Range Input
const currTimeDisplay = document.querySelector(".curr-time"); // 00:00 text
const totalTimeDisplay = document.querySelector(".total-time"); // 3:33 text

// 3. Play/Pause Toggle Logic
ctrlIcon.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        // Change icon to Pause
        ctrlIcon.classList.remove('fa-circle-play');
        ctrlIcon.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        // Change icon back to Play
        ctrlIcon.classList.remove('fa-circle-pause');
        ctrlIcon.classList.add('fa-circle-play');
    }
});

// 4. Update Progress Bar and Time as song plays
audio.addEventListener('timeupdate', () => {
    // Move the slider
    if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        // Calculate current time in minutes/seconds
        let curMins = Math.floor(audio.currentTime / 60);
        let curSecs = Math.floor(audio.currentTime % 60);
        if (curSecs < 10) curSecs = "0" + curSecs;
        currTimeDisplay.innerText = `${curMins}:${curSecs}`;

        // Calculate total duration (only runs once audio is loaded)
        let durMins = Math.floor(audio.duration / 60);
        let durSecs = Math.floor(audio.duration % 60);
        if (durSecs < 10) durSecs = "0" + durSecs;
        totalTimeDisplay.innerText = `${durMins}:${durSecs}`;
    }
});

// 5. Seek Music (When you manually drag the progress bar)
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// 6. Reset Icon when song ends
audio.addEventListener('ended', () => {
    ctrlIcon.classList.remove('fa-circle-pause');
    ctrlIcon.classList.add('fa-circle-play');
    progressBar.value = 0;
});