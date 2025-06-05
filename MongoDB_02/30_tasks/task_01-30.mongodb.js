// ПРОСТЫЕ ЗАДАНИЯ (1-15)

// 1. Создание базы данных
// Теория: В MongoDB база данных создается автоматически при первом обращении к ней. Используется команда use <database_name>.
// Задание: Создайте новую базу данных с названием shop.

use("shop")

// 2. Создание коллекции
// Теория: Коллекции создаются автоматически при добавлении первого документа.
db.createCollection("products");

// 3. Добавление одного документа
// Теория: Документы — JSON-подобные объекты. insertOne() добавляет один документ.
db.products.insertOne({ name: "Phone", price: 800, category: "Electronics" });

// 4. Добавление нескольких документов
// Теория: insertMany() добавляет несколько документов сразу.
db.products.insertMany([
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Tablet", price: 500, category: "Electronics" },
  { name: "Chair", price: 150, category: "Furniture" }
]);

// 5. Вывод всех товаров
// Теория: find() возвращает все документы коллекции.
db.products.find();

// 6. Поиск товара по названию
// Теория: findOne() ищет первый подходящий документ.
db.products.findOne({ name: "Phone" });

// 7. Фильтрация товаров по цене
// Теория: Операторы сравнения ($gt, $lt).
db.products.find({ price: { $gt: 600 } });

// 8. Обновление данных товара
// Теория: updateOne() обновляет один документ.
db.products.updateOne({ name: "Laptop" }, { $set: { price: 1300 } });

// 9. Удаление одного товара
// Теория: deleteOne() удаляет один документ.
db.products.deleteOne({ name: "Tablet" });

// 10. Удаление товаров по условию
// Теория: deleteMany() удаляет все подходящие документы.
db.products.deleteMany({ price: { $lt: 600 } });

// 11. Создание индекса
// Теория: Индексы ускоряют поиск. createIndex().
db.products.createIndex({ name: 1 });

// 12. Подсчет количества товаров
// Теория: countDocuments() считает документы.
db.products.countDocuments({});

// 13. Поиск товаров в ценовом диапазоне
// Теория: $gte и $lte для диапазона.
db.products.find({ price: { $gte: 600, $lte: 1000 } });

// 14. Фильтрация по категории
// Теория: find() по значению поля.
db.products.find({ category: "Electronics" });

// 15. Добавление нового поля ко всем товарам
// Теория: updateMany() обновляет несколько документов.
db.products.updateMany({}, { $set: { stock: 50 } });

// СРЕДНИЕ ЗАДАНИЯ (16-30)

// 16. Добавление товара с вложенным документом
// Теория: Вложенные объекты.
db.products.insertOne({ name: "Smartwatch", price: 400, category: "Electronics", details: { brand: "FitBrand", model: "X100" } });

// 17. Поиск товаров с определенным полем
// Теория: $exists проверяет наличие поля.
db.products.find({ details: { $exists: true } });

// 18. Массовое обновление цен
// Теория: $mul умножает числовые значения.
db.products.updateMany({}, { $mul: { price: 1.1 } });

// 19. Добавление массива в товары
// Теория: Массивы — списки значений.
db.products.updateMany({}, { $set: { reviews: [ { user: "Ivan", rating: 5, comment: "Отлично!" } ] } });

// 20. Добавление отзыва в массив
// Теория: $push добавляет элемент в массив.
db.products.updateOne({ name: "Laptop" }, { $push: { reviews: { user: "Anna", rating: 4, comment: "Хороший ноутбук" } } });

// 21. Поиск товаров с определенным рейтингом
// Теория: $elemMatch для поиска в массивах.
db.products.find({ reviews: { $elemMatch: { rating: 5 } } });

// 22. Удаление вложенных данных
// Теория: $unset удаляет поле.
db.products.updateOne({ name: "Laptop" }, { $unset: { reviews: "" } });

// 23. Создание новой коллекции и добавление данных
// Теория: Коллекции создаются при вставке данных.
db.orders.insertOne({ product: "Phone", quantity: 2, status: "Pending" });

// 24. Обновление данных в коллекции заказов
// Теория: updateOne() обновляет документы.
db.orders.updateOne({ status: "Pending" }, { $set: { status: "Shipped" } });

// 25. Подсчет заказов по статусу
// Теория: countDocuments() с фильтром.
db.orders.countDocuments({ status: "Shipped" });

// 26. Удаление заказов с определенными товарами
// Теория: deleteMany() по условию.
db.orders.deleteMany({ product: "Phone" });

// 27. Создание связи между заказами и пользователями
// Теория: Хранение идентификаторов связанных документов.
db.users.insertOne({ name: "Petr", email: "petr@mail.com" });
// Получить user_id пользователя Petr
var user = db.users.findOne({ name: "Petr" });
db.orders.updateMany({}, { $set: { user_id: user._id } });

// 28. Объединение данных из двух коллекций
// Теория: $lookup объединяет коллекции.
db.orders.aggregate([
  { $lookup: {
    from: "users",
    localField: "user_id",
    foreignField: "_id",
    as: "user"
  } }
]);

// 29. Сортировка товаров по цене
// Теория: sort() сортирует результаты.
db.products.find({ price: { $gt: 1000 } }).sort({ price: -1 });

// 30. Создание уникального индекса
// Теория: Индексы предотвращают дублирование.
db.customers.createIndex({ email: 1 }, { unique: true });