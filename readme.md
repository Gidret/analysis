# Анализ монотонности наборов чисел

Веб-приложение для проверки последовательностей чисел на возрастание и убывание. Проект выполнен в рамках учебного задания.

## 📌 Описание функционала

Приложение запрашивает у пользователя количество наборов $K$ и сами числовые последовательности (каждый набор завершается числом `0`). Для каждого набора выполняется проверка:

- **Возвращает `1`** — если элементы набора строго возрастают.
- **Возвращает `-1`** — если элементы набора строго убывают.
- **Возвращает `0`** — если элементы набора не являются строго возрастающими или убывающими (или содержат менее 2 элементов).

Также проект содержит готовый шаблон **тест-кейсов (таблицу тестирования)** с описанием шагов, ожидаемых и фактических результатов.

## 🛠 Технологии

- **HTML5** — структура страницы и формы ввода
- **CSS3** — стилизация интерфейса
- **JavaScript (ES6+)** — логика обработки и анализа последовательностей

## 📁 Структура проекта

```text
.
├── index.html   # Основная разметка и интерфейс
├── style.css    # Стили и оформление
└── script.js    # Алгоритм проверки и DOM-манипуляции

<? require_once "php/check_session.php"; ?>
<?php require_once "php/db/conn.php";
$data = $conn ->prepare("SELECT * from users where id = :id ");
$data->execute([":id"=>$_SESSION['user_id']]);
$user = $data->fetch(PDO::FETCH_ASSOC); 

$test = $conn->prepare("SELECT scenario_id, score, created_at FROM results WHERE user_id = ? ORDER BY created_at DESC");
$test->execute([$_SESSION['user_id']]);
$data = $test->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/script.js"></script>
    <title>Редактированние профиля</title>
</head>
<body>
    <header>
        <div class="logo">
            <a href="index.php" style="text-decoration: none;"><h2>ИСТОРИКЪ</h2></a>
        </div>
        
        <input type="checkbox" id="burger-check" style="display: none;">
        
        <label for="burger-check" class="burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </label>
    
        <div class="headNav">
            <a href="aboutUs.html">О нас</a>
            <a href="choosetest.php">Викторины</a>
            <a href="userProfile.php">Профиль</a>
        </div>
    </header>
<main class="profile-page">
    <div class="container">
        <div class="welcome-section">
            <h1>Добро пожаловать, <?=  htmlspecialchars($user['name'] ?? 'Гость') ?> 👋</h1>
            <div class="avatar-wrap">
                <img src="<?= htmlspecialchars($user['avatar'] ?? 'media/avatar.png') ?>" alt="Avatar" class="profile-avatar">
                <div class="edit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </div>
            </div>
        </div >
         <div> <!--ава поменяна -->
            <?php if (!empty($_SESSION['ava_success'])): ?>
            <div class="avasuc">
                <?= htmlspecialchars($_SESSION['ava_success']) ?>
                <?php unset($_SESSION['ava_success']); ?> 
            </div>
        <?php endif; ?>
        </div>
            <div style=" color: #f00606; text-align: center;  font-size: 19px;">
                <? if(!empty($_SESSION["errors"]) ?? ''): ?>
                <? foreach ($_SESSION['errors'] as $error) echo $error. "<br>" ?>
                <? endif; ?>
            </div> <!-- ошибки при обновлении -->
        <div class="profile-form">
    <div class="inputs-flex">
        <div class="inputs">
            <p>ФИО</p>
            <input type="text" value="<?= htmlspecialchars($user['name']??'Гость') ?>">
        </div>
        <div class="inputs">
            <p>Почта</p>
            <input type="email" placeholder="Ваш Email" value="<?= htmlspecialchars($user['email']?? ''); ?>">
        </div>
            <div class="inputs">
                <p>Пароль</p>
                <input name = "password" type="password"  placeholder="Не меньше 8 символов">
            </div>
        </div>
        <a href="editUserProfile.php"><input type="submit" value="Изменить"></a>
        <a href="php/auth/logout.php"><input class="btn-exit" value="Выйти"></a>
    </div>
        <div>
<h2 class="section-title" >Пройденные тесты</h2>
<div class="tests-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; padding: 20px;">
    <?php 
    $test_info = [
        1 => ['title' => 'Сумерки империи', 'img' => 'media/background.png'],
        2 => ['title' => 'Международные отношения', 'img' => 'media/test7.png'],
        3 => ['title' => 'Россия XX-XXI веков', 'img' => 'media/test4.png'],
        4 => ['title' => 'Космическая гонка', 'img' => 'media/test2.png']
    ];

    if (!empty($data) && is_array($data)): 
        foreach ($data as $index => $dat): 
            $s_id = $dat['scenario_id'];
            $current = $test_info[$s_id] ?? ['title' => 'Тест #' . $s_id, 'img' => 'media/avatar.png'];
            $delay = $index * 0.2; 
    ?>
        
        <div class="test-card" 
             style="background-image:url('<?= $current['img'] ?>'); 
                    width: 500px; height: 250px; border-radius: 15px; background-size: cover; position: relative;">
            
            <div class="test-overlay" style="position: absolute; bottom: 15px; left: 15px; color: white;">
                <h3><?= htmlspecialchars($current['title']) ?></h3>
                <p >Результат: <?= htmlspecialchars($dat['score']) ?> баллов</p>
                <small><?= $dat['created_at'] ?></small>
            </div>
        </div>

    <?php 
        endforeach; 
    else: 
    ?>
        <p>Вы еще не прошли ни одного теста. Все результаты появятся здесь.</p>
    <?php endif; ?>
        </div>
    </div>
    <div>
</div>
</main>
    <footer>
        <div class="container">
            <div class="footerLogo"><p>ИСТОРИКЪ</p></div>
            <div class="footerGrid">
                <div class="footerCol footerColSoc">
                    <h3>Мы в соцсетях:</h3>
                    <div class="socials">
                        <a class="socialsSvg" href="#"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0ZM25 2C12.2975 2 2 12.2975 2 25C2 37.7025 12.2975 48 25 48C37.7025 48 48 37.7025 48 25C48 12.2975 37.7025 2 25 2ZM29.3193 25.8779C30.1988 25.344 31.3584 25.6001 31.9111 26.4492C32.4641 27.2967 32.1991 28.4169 31.3213 28.9512C30.1613 29.6544 28.9016 30.1533 27.5957 30.4404L31.1826 33.9033C31.9171 34.6111 31.9173 35.7603 31.1826 36.4688C30.4486 37.1772 29.2586 37.1772 28.5254 36.4688L24.999 33.0664L21.4756 36.4688C21.1082 36.8225 20.6268 37 20.1455 37C19.6651 36.9999 19.1847 36.8225 18.8174 36.4688C18.0835 35.7603 18.0834 34.6119 18.8164 33.9033L22.4033 30.4404C21.0974 30.1532 19.8378 29.6537 18.6777 28.9512C17.7999 28.4169 17.536 27.2974 18.0889 26.4492C18.6405 25.5999 19.8012 25.3437 20.6807 25.8779C23.3072 27.4728 26.6912 27.4732 29.3193 25.8779ZM24.9834 13C28.5224 13 31.3993 15.778 31.3994 19.1934C31.3994 22.6077 28.5225 25.3857 24.9834 25.3857C21.4452 25.3856 18.5674 22.6076 18.5674 19.1934C18.5675 15.7781 21.4453 13.0002 24.9834 13Z"/>
                        </svg></a>
                        <a class="socialsSvg" href="#"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0ZM25 2C12.2975 2 2 12.2975 2 25C2 37.7025 12.2975 48 25 48C37.7025 48 48 37.7025 48 25C48 12.2975 37.7025 2 25 2ZM35.1201 15.5811C36.1759 15.1017 37.1949 15.8343 36.792 17.4502L32.8555 36.0029C32.5805 37.3213 31.7834 37.6363 30.6797 37.0273L24.6826 32.5967L21.7998 35.4004C21.465 35.7259 21.1994 36 20.5996 36L21.0078 29.8818L32.1367 19.8389C32.6251 19.4054 32.0302 19.1939 31.3818 19.5869L17.6475 28.252L11.7148 26.4004C10.4338 26.0081 10.4243 25.128 12.002 24.4951L35.1201 15.5811Z"/>
                        </svg></a>
                        <a class="socialsSvg" href="#"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0ZM25 2C12.2975 2 2 12.2975 2 25C2 37.7025 12.2975 48 25 48C37.7025 48 48 37.7025 48 25C48 12.2975 37.7025 2 25 2ZM24.5098 18.6035C25.5803 18.6146 25.8885 18.6797 26.3066 18.7793C27.5675 19.078 27.1396 20.2319 27.1396 23.001C27.1396 23.8871 26.9766 25.1347 27.6289 25.5488C27.9094 25.7257 28.5947 25.5738 30.3086 22.7178C31.1212 21.3634 31.7295 19.7715 31.7295 19.7715C31.7343 19.7613 31.8675 19.4856 32.0703 19.3662C32.2819 19.2422 32.5674 19.2803 32.5674 19.2803L36.416 19.2568C36.416 19.2568 37.5728 19.1205 37.7598 19.6338C37.9563 20.1709 37.3275 21.4279 35.7549 23.4854C33.1734 26.8636 32.8855 26.5481 35.0303 28.501C37.0773 30.3665 37.5022 31.2746 37.5723 31.3877C38.4139 32.7583 36.6561 32.8744 36.6318 32.876L33.2119 32.9229C33.1979 32.9255 32.469 33.0592 31.5117 32.4141C30.2321 31.5525 29.026 29.312 28.0869 29.6045C27.1396 29.9007 27.1628 31.8945 27.1631 31.916C27.1631 31.916 27.1707 32.3476 26.9541 32.5762C26.7215 32.8214 26.2712 32.8742 26.2559 32.876H24.7256C24.7256 32.876 21.3497 33.0753 18.376 30.0371C15.133 26.7224 12.2695 20.1455 12.2695 20.1455C12.268 20.1414 12.1054 19.7137 12.2832 19.5068C12.4817 19.2757 13.0177 19.2573 13.0342 19.2568L16.6924 19.2334C16.7055 19.2356 17.0414 19.2921 17.2832 19.4668C17.4847 19.6124 17.5977 19.8819 17.6006 19.8887C17.6006 19.8887 18.192 21.3562 18.9746 22.6836C20.503 25.275 21.2141 25.8417 21.7324 25.5645C22.4887 25.1601 22.2627 21.9004 22.2627 21.9004C22.2629 21.8812 22.2728 20.7144 21.8818 20.1914C21.5763 19.7834 21.0003 19.664 20.7461 19.6309C20.5397 19.6037 20.8782 19.134 21.3164 18.9238C21.975 18.6082 23.1366 18.59 24.5098 18.6035Z"/>
                        </svg></a>
                    </div>
                </div>
                <div class="footerCol">
                    <h3>Контакты</h3>
                    <p>По общим вопросам</p>
                    <a href="mailto:info@istorik.media">info@istorik.media</a>
                </div>
                <div class="footerCol">
                    <h3>Информация</h3>
                    <a href="#">Пользовательское соглашение</a>
                    <a href="#">Политика конфиденциальности</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
