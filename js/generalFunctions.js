/* global elementCounter */

/**
 * Генератор случайных значений в указанном диапазоне.
 * @param {Namber} min - Минимальное значение.
 * @param {Number} max - (optional) Максимальное значение (включительно!)
 * @returns {Number} Сгенерированное целое число.
 */
function random(min, max) {
    // Если не задан максимум - то минимум = 0 , а максимум равен минимуму.
    var _max = max || min;
    
    // Если макс равен минимуму.
    if (_max === min) {
        // Генерируем число от 0 и до...
        return Math.floor(Math.random() * (_max + 1));
    } else {
        // Генерируем число в диапазоне.
        return (min + Math.floor(Math.random() * (max + 1 - min)));
    }    
}

/**
 * Проверка на "столкновение" объектов
 * @param {HTMLElement} a Хтмл элемент 1.
 * @param {HTMLElement} b Хтмл элемент 1.
 * @returns {Boolean} Если объекты пересеклись вернет true.
 */
function isCollide(a, b) {
    // Получаем позицию, ширину и высоту первого объекта.
    var aRect = a.getBoundingClientRect();
    // Получаем позицию, ширину и высоту второго объекта.
    var bRect = b.getBoundingClientRect();
    // Проверяем, не пересекаются ли координаты.

    return !(
         ((aRect.top + aRect.height / 2) < (bRect.top)) ||
         (aRect.top > (bRect.top + bRect.height / 2)) ||
         ((aRect.left + aRect.width / 2) < bRect.left) ||
         (aRect.left > (bRect.left + bRect.width /2 ))
    );
}

/**
 * Создать ХТМЛ элемент.
 * @param {String} typeName - Тип элемента.
 * @param {String} id - (optional) ИД элемента.
 * @returns {HTMLElement} - ХТМЛ Элемент.
 */
function createEl(typeName, id) {   
    id = id || null;
    
    // Создаем элемент.
    var htmlElement = document.createElement(typeName);
    
    // Назначаем ИД
    if (null !== id) {
        htmlElement.id = id;
    } else {
        htmlElement.id = typeName + '_' + elementCounter++;
    }
    return htmlElement;
}

