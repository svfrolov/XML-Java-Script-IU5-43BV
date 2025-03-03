<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторные работы</title>
    <link rel="stylesheet" href="styles_gl.css">
</head>
<body>
    <div class="lab-buttons">
        <?php
        // Автоматическое определение доступных лабораторных работ
        $availableLabs = [];
        for ($i = 1; $i <= 10; $i++) { // Проверяем до 10 лабораторных работ
            $labPath = "lab{$i}";
            if (is_dir($labPath) && file_exists("{$labPath}/calculator.html")) {
                $availableLabs[] = $i;
                echo "<button class=\"lab-button\" id=\"btn_lab_{$i}\" onclick=\"loadLab({$i})\">Лаб {$i}</button>";
            }
        }
        ?>
    </div>
    
    <div class="current-lab" id="currentLab">Выберите лабораторную работу</div>
    
    <div class="lab-content">
        <iframe id="labFrame" src="about:blank"></iframe>
    </div>

    <script>
        function loadLab(labNumber) {
            // Путь к файлу calculator.html в соответствующей папке lab{N}
            const labPath = `lab${labNumber}/calculator.html`;
            
            // Обновляем src для iframe
            document.getElementById('labFrame').src = labPath;
            
            // Обновляем текст текущей лабораторной работы
            document.getElementById('currentLab').textContent = `Лабораторная работа №${labNumber}`;
            
            // Обновляем активную кнопку
            const buttons = document.querySelectorAll('.lab-button');
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            document.getElementById(`btn_lab_${labNumber}`).classList.add('active');
        }
        
        // Загрузка первой доступной лабораторной работы по умолчанию
        window.onload = function() {
            <?php
            if (!empty($availableLabs)) {
                echo "loadLab({$availableLabs[0]});";
            }
            ?>
        };
    </script>
</body>
</html>
