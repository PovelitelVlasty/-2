const time = document.getElementById('time'),
    hello = document.getElementById('hello'),
    name = document.getElementById('name'),
    quote = document.getElementById('quote'),
    den = document.getElementById('den'),
    focus = document.getElementById('focus');
let today = new Date(),
    hour = today.getHours();
document.body.style.backgroundImage = "url('" + hour + ".jpg')";
var nImg = hour;

function nextImg() {
    nImg++;
    nImg = nImg % 24;
    document.body.style.backgroundImage = "url('" + nImg + ".jpg')";
}

var quotes = ['Если волк молчит, то лучше его - не перебивать',
             'В этой жизни ты либо волк, либо не волк',
              'Запомните, а то забудете',
              'Бесплатный сыр бывает только бесплатно',
              'Лучше быть последним — первым, чем первым — последним',
              'На случай, если буду нужен, то я там же, где и был, когда был не нужен',
              'Легко вставать, когда ты не ложился',
              'Иногда жизнь — это жизнь, а ты в ней иногда',
              'Лучше один раз упасть, чем сто раз упасть',
              'Я такой человек, который терпит терпит, но в какой-то момент терпит терпит'];

function setQuote() {
    quote.textContent = quotes[Math.floor(Math.random() * 10)];
}
var nameDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
var monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        day = today.getDate(),
        week = today.getDay(),
        month = today.getMonth(),
        sec = today.getSeconds();
    if (min == 0 && sec == 0) {
        document.body.style.backgroundImage = "url('" + hour + ".jpg')";
    }
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    den.textContent = `${nameDay[week-1]}, ${day} ${monthName[month]}`;
    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (n < 10 ? '0' : '') + n;
}

function setHello() {
    let today = new Date(),
        hour = today.getHours();
    if (hour < 6) {
        hello.textContent = 'Спокойной ночи ';
    } else if (hour < 12) {
        hello.textContent = 'Добрый утро ';
    } else if (hour < 18) {
        hello.textContent = 'Добрый день ';
    } else {
        hello.textContent = 'Доброго вечера ';
    }
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Введите имя]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Введите цель]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}
var NameTmp = '',
    FocusTmp = '';

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText == '') {
                e.target.innerText = NameTmp;
            }
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        if (e.target.innerText == '') {
            e.target.innerText = NameTmp;
        }
        localStorage.setItem('name', e.target.innerText);
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText == '') {
                e.target.innerText = FocusTmp;
            }
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        if (e.target.innerText == '') {

        }
        localStorage.setItem('focus', e.target.innerText);
    }
}

function delName() {
    NameTmp = name.textContent;
    name.textContent = '';
}

function delFocus() {
    FocusTmp = focus.textContent;
    focus.textContent = '';
}
name.addEventListener('click', delName);
focus.addEventListener('click', delFocus);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
getName();
getFocus();
showTime();
setHello();
setQuote();
const weatherIcon = document.getElementsByClassName('weather-icon')[0];
const city = document.getElementsByClassName('city')[0];
const temperature = document.getElementsByClassName('temperature')[0];
const weatherDescription = document.getElementsByClassName('weather-description')[0];
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=29760bc04a0253a4d6b19cfcfc8525f7&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather();

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            getWeather();
            city.blur();
        }
    } else {
        getWeather();
    }
}
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
