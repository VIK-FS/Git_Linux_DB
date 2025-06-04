/**
 * Создайте коллекцию cars, добавьте в нее около 10 машин, пусть у некоторых совпадает год, а у некоторых бренд. Пример одного документа:

  {
    brand: "BMW",
    price: 20000,
    model: "X5",
    year: 2015,
    horsepower: 300,
  }
Copy
Выведите среднюю цену по брендам (задание на использование group).
Выведите среднюю цену по годам.
Выведите максимальную мощность по брендам.
Выведите 3 самых дешевые машины.
Выведите 3 самых дорогие машины определенного бренда.
Выведите случайный автомобиль марки бмв (или другой на ваше усмотрение).
 */

use("carDealershipDB");

// db.cars.deleteMany({});

// db.cars.insertMany([
//     { brand: "BMW", price: 20000, model: "X5", year: 2015, horsepower: 300 },
//     { brand: "BMW", price: 18000, model: "3 Series", year: 2015, horsepower: 250 },
//     { brand: "Audi", price: 22000, model: "A4", year: 2016, horsepower: 260 },
//     { brand: "Audi", price: 25000, model: "Q5", year: 2018, horsepower: 280 },
//     { brand: "Toyota", price: 15000, model: "Camry", year: 2015, horsepower: 200 },
//     { brand: "Toyota", price: 14000, model: "Corolla", year: 2017, horsepower: 180 },
//     { brand: "Ford", price: 17000, model: "Focus", year: 2016, horsepower: 160 },
//     { brand: "Ford", price: 19000, model: "Mondeo", year: 2015, horsepower: 210 },
//     { brand: "Honda", price: 16000, model: "Civic", year: 2018, horsepower: 190 },
//     { brand: "Honda", price: 21000, model: "Accord", year: 2016, horsepower: 240 }
//   ]);

// db.cars.aggregate([
//   { $group: { _id: "$brand", averagePrice: { $avg: "$price" } } },
// ]);
// db.cars.aggregate([
//   { $group: { _id: "$year", averagePrice: { $avg: "$price" } } },
// ]);
// db.cars.aggregate([
//   { $group: { _id: "$brand", maximalHorsePower: { $max: "$horsepower" } } },
// ]);
// db.cars.aggregate([
//   { $group: { _id: "$brand", minPrice: { $min: "$price" } } },
//   {$sort: {minPrice:1}},
//   { $limit: 3 },
// ]);

// db.cars.find().sort({ price: 1 }).limit(3);
// db.cars.find().sort({ price: -1 }).limit(3);

// db.cars.aggregate([
//   { $group: { _id: "$brand", maxPrice: { $max: "$price" } } },
//   {$sort: {maxPrice:-1}},
//   { $limit: 3 },
// ]);

// db.cars.aggregate([
//     { $match: { brand: "BMW" }},
//     {$sample: {size:1}}
// ]);

// db.cars.aggregate([{ $sample: { size: 1 } }]);
