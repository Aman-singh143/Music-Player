let music = document.querySelector(".audio");
let playbtn = document.querySelector("#Play");
let Songname = document.getElementById("sn");
let Artistname = document.getElementById("an");
let songimg = document.querySelector(".songposter img");
let nextplay = document.getElementById("Next");
let prevplay = document.getElementById("Prev");
let progressbar = document.querySelector(".pg");
let pbar = document.querySelector(".pgbar");
let body = document.querySelector("body");
let Current_time = document.querySelector(".currenttime");
let Tduration = document.querySelector(".duration");

//Stosing music and its info in array

let index = 0;
let songs = [
  {
    Songname: "Warna Gabbar Aa Jayega",
    Artistname: "Manj Musik & Raftaar ",
    songimg: "images/1.jpg",
    music: "music/04 Warna Gabbar Aa Jayega.mp3 ",
  },
  {
    Songname: "Bhool Bhulaiyaa 2 ",
    Artistname: "Neeraj Shridhar ",
    songimg: "images/2.png",
    music: "music/Bhool Bhulaiyaa 2 Title Track.mp3 ",
  },
  {
    Songname: "Kesariya",
    Artistname: "Arijit Singh",
    songimg: "images/3.png",
    music: "music/Kesariya.mp3 ",
  },
  {
    Songname: "Pasoori",
    Artistname: "Ali Sethi, Shae Gill",
    songimg: "images/4.jpg",
    music: "music/Pasoori.mp3 ",
  },
  {
    Songname: "Let Me Down SLowly",
    Artistname: "Alec Benjamin",
    songimg: "images/5.jpg",
    music: "music/Let Me Down Slowly.mp3 ",
  },
];

//play functionality

let isplaying = false;
const playmusic = () => {
  isplaying = true;
  music.play();
  playbtn.classList.replace("fa-play", "fa-pause");
};

//pause functionality

const pausemusic = () => {
  isplaying = false;
  music.pause();
  playbtn.classList.replace("fa-pause", "fa-play");
};

playbtn.addEventListener("click", () => {
  isplaying == false ? playmusic() : pausemusic();
});

// loading song onclick via their index

const loadsong = (songs) => {
  Songname.textContent = songs.Songname;
  Artistname.textContent = songs.Artistname;
  music.src = songs.music;
  songimg.src = songs.songimg;
};

// Generating Random Gradient background on next or previous click
const createHex = () => {
  var hexCode1 = "";
  var hexValues1 = "0dc1c9";
  for (var i = 0; i < 6; i++) {
    hexCode1 += hexValues1.charAt(
      Math.floor(Math.random() * hexValues1.length)
    );
  }
  return hexCode1;
};

const RandomGradientgenerate = () => {
  var deg = Math.floor(Math.random() * 360);
  var gradient =
    "linear-gradient(" +
    deg +
    "deg, " +
    "#" +
    createHex() +
    ", " +
    "#" +
    createHex() +
    ")";
  document.body.style.background = gradient;
};

// next song onclick

nextplay.addEventListener(
  "click",
  (nextsong = () => {
    index = (index + 1) % songs.length;
    loadsong(songs[index]);
    isplaying == true ? playmusic() : pausemusic();
    RandomGradientgenerate();
  })
);

// Previous song onclick

prevplay.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadsong(songs[index]);
  isplaying == true ? playmusic() : pausemusic();
  RandomGradientgenerate();
});

// syncing progress bar and current time and duration

music.addEventListener("timeupdate", (event) => {
  let { currentTime, duration } = event.srcElement;

  //syncing progress bar and current time
  let songTime = (currentTime / duration) * 100;
  progressbar.style.width = `${songTime}%`;

  //current time of song
  let cmin = Math.floor(currentTime / 60);
  let csec = Math.floor(currentTime % 60);
  
  if (currentTime) {
    Current_time.textContent = `${cmin}:${csec}`;
  }

  ////Total duration time of song
  let dmin = Math.floor(duration / 60);
  let dsec = Math.floor(duration % 60);
  if (duration) {
    Tduration.textContent = `${dmin}:${dsec}`;
  }
});

// controlling progressbar and at and any instance of music

pbar.addEventListener("click", (event) => {
  let { duration } = music;
  let pgbarmove = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = pgbarmove;
});

//Automatic next music after completion of current music

music.addEventListener("ended", nextsong);
