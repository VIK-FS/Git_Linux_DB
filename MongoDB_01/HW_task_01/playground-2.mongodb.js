use("drinks_db");

// db.drinks.deleteMany({});

// 1. Добавление напитков в коллекцию drinks
db.drinks.insertMany([
  {
    name: "Эспрессо",
    price: 120,
    strength: 8,
    volume: 30,
    tags: ["горячий", "кофейный"]
  },
  {
    name: "Мохито",
    price: 350,
    strength: 5,
    volume: 250,
    tags: ["коктейль", "освежающий"]
  },
  {
    name: "Виски",
    price: 450,
    strength: 40,
    volume: 50,
    tags: ["крепкий", "алкогольный"]
  },
  {
    name: "Горячий шоколад",
    price: 200,
    strength: 0,
    volume: 200,
    tags: ["горячий", "десертный"]
  },
  {
    name: "Латте",
    price: 180,
    strength: 3,
    volume: 350,
    tags: ["горячий", "кофейный", "молочный"]
  },
  {
    name: "Текила",
    price: 400,
    strength: 38,
    volume: 50,
    tags: ["крепкий", "алкогольный"]
  }
]);

// 2. Вывод самого дорогого напитка
console.log("Самый дорогой напиток:");
db.drinks.find().sort({price: -1}).limit(1);

// 3. Вывод топ-3 самых дешевых напитков
console.log("Топ-3 самых дешевых напитков:");
db.drinks.find().sort({price: 1}).limit(3);

// 4. Вывод названия самого крепкого напитка
console.log("Название самого крепкого напитка:");
db.drinks.find().sort({strength: -1}).limit(1).projection({name: 1, _id: 0});

// Дополнительное задание: получение напитков с определенным тегом
console.log("Напитки с тегом 'горячий':");
db.drinks.find({tags: "горячий"}, {name: 1, _id: 0});
