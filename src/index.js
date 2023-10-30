const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img')

const music = new Audio();

const songs = [
    {
        path: 'assets/mp3/1fsmh.mp3',
        displayName: 'FOREVER, SHE STAYS IN MY HEAD.',
        cover: 'assets/pngs/1fsmh.png',
        artist: 'Eternal',
    },
    {
        path: 'assets/mp3/2ufo.mp3',
        displayName: 'Crash (feat. Ufo361)',
        cover: 'assets/pngs/2ufo.png',
        artist: 'flowerboii, Ufo361',
    },
    {
        path: 'assets/mp3/3joji.mp3',
        displayName: '1AM FREESTYLE',
        cover: 'assets/pngs/3joji.png',
        artist: 'Joji',
    },
    {
        path: 'assets/mp3/4xxx.mp3',
        displayName: 'Jocelyn Flores',
        cover: 'assets/pngs/4xxx.png',
        artist: 'XXXTENTACION',
    },
    {
        path: 'assets/mp3/5bnd.mp3',
        displayName: 'bando - sped up + reverb',
        cover: 'assets/pngs/5bnd.png',
        artist: 'bbygirl',
    },
    {
        path: 'assets/mp3/6simf.mp3',
        displayName: 'SPIT IN MY FACE!',
        cover: 'assets/pngs/6simf.png',
        artist: 'ThxSoMch',
    },
    {
        path: 'assets/mp3/7fkm.mp3',
        displayName: 'fukumean',
        cover: 'assets/pngs/7fkm.png',
        artist: 'Gunna',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);