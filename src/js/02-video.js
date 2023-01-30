import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Запуск плеєра
player.on('play', function () {
    console.log('played the video!');
    });

// Прибираємо звук бо 100% надто голосно))
player.setVolume(0.3).then(function () { });

// Ловимо подію та записуємо значення в localStorage
player.on('timeupdate', throttle(function (e) {
    localStorage.setItem("videoplayer-current-time", e.seconds);
    console.log("Запис.. ", e.seconds)}, 1000));

// Починаємо відтворення з заданої позиції
player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))
    .then(function (seconds) {
    });

