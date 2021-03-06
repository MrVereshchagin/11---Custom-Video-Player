// Получаем элементы управления

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Создаем функции

function togglePlay() { // создаем функцию с переключателем play pause
    const method = video.paused ? 'play' : 'pause'; // создаем переменную с методом которой присваиваем значение выражения с тернарным оператором (условие - указываем свойство HTMLMediaElment)
    video[method](); // не понятно, что здесь происходит?
}

function updateButton() {
    const icon = this.paused ? '▶' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip); // устанавливаем для HTMLMediaElment свойства currentTime прибавление значения на величину свойства dataset (25, -10)
}

function handleRangeUpdate() { // устанавливаем для определенного свойства изменение значения на величину измененного ползунка
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100; // вычисляем значение на которое изменяется прогресс
    progressBar.style.flexBasis = `${percent}%`; // изменяем стиль элемента на величину percent
}


function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // вычисляем величину прокрутки (отступ курсора, ширина элемента) на величину свойства видео в секундах
    video.currentTime = scrubTime;
}

// Вешаем события

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // проверяет сначала нажата ли кнопка мыши, если да, то запускает функцию scrub