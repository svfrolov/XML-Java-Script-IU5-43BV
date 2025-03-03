// Переменные для хранения значений
let displayValue = '0';  // что показано на экране
let firstOperand = null;  // первое число
let operator = null;  // знак операции (+, -, и т.д.)
let waitingForSecondOperand = false;  // ждем ли второе число

// Функция для обновления экрана калькулятора
function updateDisplay() {
    const display = document.getElementById('result');
    display.textContent = displayValue;
}

// Функция для ввода цифр
function inputDigit(digit) {
    // Если ждем второе число, начинаем новый ввод
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // Если на экране только 0, заменяем его, иначе добавляем цифру
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

// Функция для ввода точки (для десятичных чисел)
function inputDecimal() {
    // Если ждем второе число, начинаем с "0."
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    // Если точки еще нет, добавляем ее
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Обработка операторов (+, -, *, /)
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    // Если уже есть оператор и мы ждем второе число
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    // Если это первое число
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // Выполняем вычисление с предыдущим оператором
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Выполнение вычисления
function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === 'x') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    
    return secondOperand;
}

// Сброс калькулятора (кнопка C)
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Изменение знака числа (+/-)
function changeSign() {
    displayValue = String(-parseFloat(displayValue));
    updateDisplay();
}

// Вычисление процента
function calculatePercentage() {
    displayValue = String(parseFloat(displayValue) / 100);
    updateDisplay();
}

// Функция для кнопки "луна" - расчет времени падения на Луне
function calculateLunarFallTime() {
    // Проверяем, нужно ли сначала закончить вычисление
    if (operator && !waitingForSecondOperand) {
        // Если есть незавершенная операция, сначала вычисляем результат
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
    
    const height = parseFloat(displayValue); // высота в метрах
    const lunarGravity = 1.62; // ускорение свободного падения на Луне (м/с²)
    
    // Формула времени падения: t = √(2h/g)
    const fallTime = Math.sqrt((2 * height) / lunarGravity);
    
    // Округляем до 2 знаков после запятой
    displayValue = fallTime.toFixed(2);
    updateDisplay();
}

// Запускаем все функции после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // Кнопки с цифрами
    document.getElementById('btn_digit_0').addEventListener('click', () => inputDigit('0'));
    document.getElementById('btn_digit_1').addEventListener('click', () => inputDigit('1'));
    document.getElementById('btn_digit_2').addEventListener('click', () => inputDigit('2'));
    document.getElementById('btn_digit_3').addEventListener('click', () => inputDigit('3'));
    document.getElementById('btn_digit_4').addEventListener('click', () => inputDigit('4'));
    document.getElementById('btn_digit_5').addEventListener('click', () => inputDigit('5'));
    document.getElementById('btn_digit_6').addEventListener('click', () => inputDigit('6'));
    document.getElementById('btn_digit_7').addEventListener('click', () => inputDigit('7'));
    document.getElementById('btn_digit_8').addEventListener('click', () => inputDigit('8'));
    document.getElementById('btn_digit_9').addEventListener('click', () => inputDigit('9'));
    document.getElementById('btn_digit_dot').addEventListener('click', inputDecimal);
    
    // Кнопки с операторами
    document.getElementById('btn_op_plus').addEventListener('click', () => handleOperator('+'));
    document.getElementById('btn_op_minus').addEventListener('click', () => handleOperator('-'));
    document.getElementById('btn_op_mult').addEventListener('click', () => handleOperator('x'));
    document.getElementById('btn_op_div').addEventListener('click', () => handleOperator('/'));
    document.getElementById('btn_op_equal').addEventListener('click', () => {
        if (operator && !waitingForSecondOperand) {
            const result = performCalculation();
            displayValue = String(result);
            firstOperand = result;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    });
    
    // Специальные кнопки
    document.getElementById('btn_op_clear').addEventListener('click', resetCalculator);
    document.getElementById('btn_op_sign').addEventListener('click', changeSign);
    document.getElementById('btn_op_percent').addEventListener('click', calculatePercentage);
    
    // Кнопка "луна"
    document.getElementById('btn_luna').addEventListener('click', calculateLunarFallTime);
    
    // Показываем начальное значение
    updateDisplay();
});
