use("cohort60_db");
// Добавили пользователя с именем 
// db.users.insertOne({name:"Mikhail"})

// Пример вложенности: поле адрес - это объект
// db.users.insertOne({
//     name: "Artem1",
//     age:"351",
//     adress:{city:"Berl"}
// })
// db.users.insertMany([
//     {name:"Dave", age:32},
//     {name:"John", age:18 },
//     {name:"Kianu", age:45}
// ])
// db.users.insertOne({
//     name:"Will",
//     age:20,
//     hobbys:["music","serfing","hacking","snowboard","cars"]
// })

// получить всех пользователей
// db.users.find()

// limit - ограничивает
// вывести первые три значения

// db.users.find().limit(3)

// Если хотим вывести упорядоченно
// sort - в алф порядке a...z

// db.users.find().sort({name:1})
// по возр

// db.users.find().sort({name:-1})

// сортировка по имени и потом по возрасту
// db.users.find().sort({name:-1, age:1})

// как мы можем вывести и пропустить первые значения

// db.users.find().skip(1)

// Но как найти всех пользователей по значениям?
// передадим соответвующий параметр в find
// найдем человека с возрастом 45

// db.users.find({age:45})

// найдем первого попавшегося удовлетворяющиего условию

// db.users.findOne({age:32})


// db.users.insertMany([
//     {name:"Dude", age:32},
//     {name:"Johny", age:18 },
//     {name:"Ann", age:32}
// ])


// Операторы

// Больше $gt - greater then
// Получим всех старше 25
// db.users.find({age:{$gt:25}})

// Меньше $lt - less then
// db.users.find({age:{$lt:25}})


// Меньше $lte - less or equal then - меньше или равно
// db.users.find({age:{$lte:25}})


// Больше или равно $gte
// db.users.find({age:{$gte:25}})

// Равно $eq
// db.users.find({name:{$eq:"Dude"}})

// Неравно $ne
// db.users.find({name:{$ne:"Dude"}})

// все, у кого возраст не равен чему-то
// у кого не задано значение - тоже подойдут
// db.users.find({age:{$ne:32}})


// Мы можем вибирать те поля, которые нужны
// вторым параметрам передаем в метод find
// db.users.find({age:32},{name:1})


// Тоже самое, но без id
// db.users.find({age:32},{name:1, _id:0})

// {name: 1}: Это второй аргумент метода find,
// который представляет собой проекцию (projection).
// Проекция определяет, какие поля должны быть включены в результат.
// В данном случае {name: 1} означает,
// что в результате запроса будут включены только поле name.
// Поле _id будет включено по умолчанию, если не указано другое.

// Оператор $in - входит в
// выведем всех с именами

// db.users.find({name:{$in:["John","Ann"]}})


// Оператор $nin - not in - не входит в "черный лист"
// все у кого имя не джон и не анн
// db.users.find({name:{$nin:["John","Ann"]}})

// Логическое и - $and
// найдем человека с возрастом 34 и именем != анна
// db.users.find({$and:[{age:32}, {name:{$ne:"Dude"}}]})




