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
```text
-- Создание базы данных
CREATE DATABASE MobilePhoneStore;
USE MobilePhoneStore;

-- 1. Таблица: Телефоны (каталог товаров)
CREATE TABLE phones (
    phone_id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,          -- Бренд (например, Apple, Samsung)
    model VARCHAR(50) NOT NULL,          -- Модель
    price DECIMAL(10, 2) NOT NULL,       -- Цена
    storage_capacity INT,                -- Объем памяти (ГБ)
    color VARCHAR(30),                   -- Цвет
    stock_quantity INT NOT NULL DEFAULT 0 -- Количество на складе
);

-- 2. Таблица: Продавцы (сотрудники магазина)
CREATE TABLE sellers (
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,     -- Имя
    last_name VARCHAR(50) NOT NULL,      -- Фамилия
    phone_number VARCHAR(20),            -- Телефон
    email VARCHAR(100) UNIQUE            -- Email (для авторизации)
);

-- 3. Таблица: Покупатели (клиенты сайта / личного кабинета)
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,     -- Имя
    last_name VARCHAR(50) NOT NULL,      -- Фамилия
    email VARCHAR(100) UNIQUE NOT NULL,  -- Email (для логина на странице авторизации)
    password_hash VARCHAR(255) NOT NULL, -- Хэш пароля (для страницы регистрации/авторизации)
    phone_number VARCHAR(20),            -- Контактный телефон
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Дата регистрации
);

-- 4. Сводная таблица: Продажи (транзакции)
CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    phone_id INT NOT NULL,               -- Ссылка на товар
    seller_id INT NOT NULL,              -- Ссылка на продавца
    customer_id INT NOT NULL,            -- Ссылка на покупателя
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Дата продажи
    quantity INT NOT NULL DEFAULT 1,     -- Количество купленного товара
    total_price DECIMAL(10, 2) NOT NULL, -- Итоговая стоимость
    FOREIGN KEY (phone_id) REFERENCES phones(phone_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
