import '../styles/styles.scss'
// подключение библиотеки PixiJS для работы с канвас WebGL
import * as PIXI from 'pixi.js'

const canvas = document.getElementById('mycanvas');
const drawTools = document.querySelector('.tools');
const curve = drawTools.querySelector('.tools__curve');
const clean = drawTools.querySelector('.tools__clean');

// Создание нового холста
const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth, 
    height: window.innerHeight
});

/**
 * Получение случайного числа
 * @param {Number} min - нижняя граница
 * @param {Number} max - верхняя граница
 * @returns {Number} - случайное число
 */
const getRandomNum = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

// Начальные координаты
var xStartCoord = 0,
    yStartCoord = 0;

/**
 * Сохранение стартовых координат
 * @param {object} evt - объект события
 * @returns {undefined}
 */
const onCanvasMouseDown = (evt) => {
    xStartCoord = evt.clientX;
    yStartCoord = evt.clientY;
}

/**
 * Отрисовка кривой
 * @param {object} evt - объект события
 * @returns {undefined}
 */
const onCanvasMouseUp = (evt) => {
    let line = new PIXI.Graphics();
    line.lineStyle(4, 0xFF3300, 1);
    line.moveTo(xStartCoord, yStartCoord);
    line.bezierCurveTo(xStartCoord, yStartCoord, xStartCoord + getRandomNum(-50,50), yStartCoord + getRandomNum(-50,50), evt.clientX, evt.clientY);
    app.stage.addChild(line);
}

/**
 * Управление добавления/удаления событий полотна
 * @returns {undefined}
 */
const onCurveClick = () => {
    curve.classList.toggle('active');
    curve.classList.contains('active') ? (
        canvas.addEventListener('mousedown', onCanvasMouseDown),
        canvas.addEventListener('mouseup', onCanvasMouseUp)
    ) : (
        canvas.removeEventListener('mousedown', onCanvasMouseDown),
        canvas.removeEventListener('mouseup', onCanvasMouseUp)
    )
}

// добавление события для кнопки отрисовки кривой
curve.addEventListener('click', onCurveClick);

/**
 * Очистка полотна
 * @returns {undefined}
 */
const onCleanClick = () => {
    app.stage.removeChildren();
}

// добавление события для кнопки очистки полотна
clean.addEventListener('click', onCleanClick);