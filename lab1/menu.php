<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Меню лабораторных работ</title>
    
    <!-- Подключаем CSS файл -->
    <link rel="stylesheet" href="menu.css">  <!-- стили для меню -->
</head>

<body>
<?php
// Проверяем, что сессия запущена
session_start();

// Определяем текущую страницу
$current_page = basename($_SERVER['PHP_SELF']);

// Количество лабораторных работ
$totalLabs = 8;

// Базовый путь к лабораторным работам
$basePath = $_SERVER['DOCUMENT_ROOT'] . '/_mgtu/xml/';

// Базовый URL для лабораторных работ
$baseUrl = '/_mgtu/xml/';

// URL по умолчанию для несуществующих лабораторных
$defaultUrl = 'https://frolovsv.ru/_mgtu/xml/1.png';
?>

<div class="menu">
    <div class="menu-container">
        <ul class="menu-list">
            <?php for ($i = 1; $i <= $totalLabs; $i++): 
                $labFolder = "lab{$i}";
                $labPath = $basePath . $labFolder;
                
                // Проверяем существование директории
                $labExists = is_dir($labPath);
                
                // Определяем URL для кнопки
                $buttonUrl = $labExists ? $baseUrl . $labFolder : $defaultUrl;
                
                // Определяем активна ли текущая страница
                $isActive = (strpos($current_page, "lab{$i}") !== false) ? 'active' : '';
            ?>
                <li>
                    <a href="<?php echo $buttonUrl; ?>" 
                       class="menu-button <?php echo $isActive; ?>">
                        Лаб. работа <?php echo $i; ?>
                    </a>
                </li>
            <?php endfor; ?>
            <li>
                <a href="/_mgtu/xml/" class="menu-button home-button">Главная</a>
            </li>
        </ul>
    </div>
</div>

<?php
// Для отладки - вывод информации о путях
if (isset($_GET['debug'])) {
    echo "<div style='margin-top: 20px; padding: 10px; background: #f0f0f0; border: 1px solid #ccc;'>";
    echo "<p>DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
    echo "<p>Базовый путь: " . $basePath . "</p>";
    
    for ($i = 1; $i <= $totalLabs; $i++) {
        $labFolder = "lab{$i}";
        $labPath = $basePath . $labFolder;
        echo "<p>Путь к lab{$i}: " . $labPath . " - " . (is_dir($labPath) ? "существует" : "не существует") . "</p>";
    }
    echo "</div>";
}
?>

</body>
</html>
