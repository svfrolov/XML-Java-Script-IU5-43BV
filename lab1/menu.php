<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Меню лабораторных работ</title>
    <link rel="stylesheet" href="menu.css">
</head>
<body>
    <div class="menu-container">
        <h1>Лабораторные работы</h1>
        <div class="lab-menu">
            <?php
            // Количество лабораторных работ
            $totalLabs = 8;
            
            // Корневая директория сайта
            $rootDir = $_SERVER['DOCUMENT_ROOT'];
            
            // URL по умолчанию для несуществующих лабораторных
            $defaultUrl = 'https://frolovsv.ru/_mgtu/xml/1.png';
            
            // Создаем кнопки для каждой лабораторной работы
            for ($i = 1; $i <= $totalLabs; $i++) {
                $labFolder = "lab{$i}";
                $labPath = "{$rootDir}/{$labFolder}";
                
                // Проверяем существование директории
                $labExists = is_dir($labPath);
                
                // Определяем URL для кнопки
                $buttonUrl = $labExists ? "/{$labFolder}" : $defaultUrl;
                
                // Определяем класс для кнопки
                $buttonClass = $labExists ? "lab-button lab-exists" : "lab-button";
                
                // Выводим кнопку
                echo "<a href=\"{$buttonUrl}\" class=\"{$buttonClass}\">";
                echo "<span class=\"lab-text\">Лабораторная работа {$i}</span>";
                echo "</a>";
            }
            ?>
        </div>
    </div>
</body>
</html>
