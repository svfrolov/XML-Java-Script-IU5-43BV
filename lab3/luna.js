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

// Добавляем обработчик события для кнопки "луна" после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка "луна"
    document.getElementById('btn_luna').addEventListener('click', calculateLunarFallTime);
});
