# База данных университета

## 1. Создание структуры БД

```sql
-- Создание базы данных
CREATE DATABASE university_db;

-- Факультеты
CREATE TABLE faculties (
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(100) NOT NULL UNIQUE,
    dean_name VARCHAR(100) NOT NULL,
    building VARCHAR(50),
    created_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT check_faculty_name CHECK (LENGTH(faculty_name) >= 3)
);

-- Кафедры
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    faculty_id INTEGER NOT NULL,
    head_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE CASCADE,
    CONSTRAINT check_phone CHECK (phone ~ '^[0-9\-\+\(\)\s]+$')
);

-- Преподаватели
CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    department_id INTEGER NOT NULL,
    position VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2),
    hire_date DATE DEFAULT CURRENT_DATE,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE RESTRICT,
    CONSTRAINT check_salary CHECK (salary > 0),
    CONSTRAINT check_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT check_names CHECK (LENGTH(first_name) >= 2 AND LENGTH(last_name) >= 2)
);

-- Студенты
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    student_number VARCHAR(20) NOT NULL UNIQUE,
    faculty_id INTEGER NOT NULL,
    course INTEGER NOT NULL,
    group_number VARCHAR(10) NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    birth_date DATE NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE RESTRICT,
    CONSTRAINT check_course CHECK (course BETWEEN 1 AND 6),
    CONSTRAINT check_birth_date CHECK (birth_date < CURRENT_DATE AND birth_date > '1900-01-01'),
    CONSTRAINT check_age CHECK (EXTRACT(YEAR FROM AGE(birth_date)) >= 16),
    CONSTRAINT check_student_number CHECK (LENGTH(student_number) >= 5)
);

-- Предметы
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    department_id INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    hours_total INTEGER NOT NULL,
    hours_lectures INTEGER DEFAULT 0,
    hours_seminars INTEGER DEFAULT 0,
    hours_labs INTEGER DEFAULT 0,
    semester INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE RESTRICT,
    CONSTRAINT check_credits CHECK (credits BETWEEN 1 AND 10),
    CONSTRAINT check_hours CHECK (hours_total > 0 AND hours_total = hours_lectures + hours_seminars + hours_labs),
    CONSTRAINT check_semester CHECK (semester BETWEEN 1 AND 12)
);

-- Расписание
CREATE TABLE schedule (
    schedule_id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    group_number VARCHAR(10) NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    classroom VARCHAR(20) NOT NULL,
    lesson_type VARCHAR(20) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT,
    CONSTRAINT check_day_of_week CHECK (day_of_week BETWEEN 1 AND 7),
    CONSTRAINT check_time CHECK (start_time < end_time),
    CONSTRAINT check_lesson_type CHECK (lesson_type IN ('лекция', 'семинар', 'лабораторная', 'практика'))
);

-- Оценки
CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    grade_type VARCHAR(20) NOT NULL,
    grade_date DATE DEFAULT CURRENT_DATE,
    semester INTEGER NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE RESTRICT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT,
    CONSTRAINT check_grade CHECK (grade BETWEEN 2 AND 5),
    CONSTRAINT check_grade_type CHECK (grade_type IN ('экзамен', 'зачет', 'контрольная', 'курсовая')),
    CONSTRAINT check_semester_grades CHECK (semester BETWEEN 1 AND 12),
    CONSTRAINT check_academic_year CHECK (academic_year ~ '^20[0-9]{2}-20[0-9]{2}$')
);

-- Индексы
CREATE INDEX idx_students_faculty ON students(faculty_id);
CREATE INDEX idx_students_course ON students(course);
CREATE INDEX idx_teachers_department ON teachers(department_id);
CREATE INDEX idx_grades_student ON grades(student_id);
CREATE INDEX idx_grades_subject ON grades(subject_id);
CREATE INDEX idx_schedule_teacher ON schedule(teacher_id);
CREATE INDEX idx_schedule_group ON schedule(group_number);

-- 2. Заполнение данными

-- Факультеты
INSERT INTO faculties (faculty_name, dean_name, building) VALUES
('Факультет информационных технологий', 'Иванов Петр Сергеевич', 'Корпус А'),
('Экономический факультет', 'Петрова Мария Александровна', 'Корпус Б'),
('Юридический факультет', 'Сидоров Алексей Владимирович', 'Корпус В'),
('Факультет иностранных языков', 'Козлова Елена Николаевна', 'Корпус Г');

-- Кафедры
INSERT INTO departments (department_name, faculty_id, head_name, phone) VALUES
('Кафедра программирования', 1, 'Николаев Сергей Петрович', '+7-495-123-4567'),
('Кафедра информационных систем', 1, 'Волков Андрей Игоревич', '+7-495-123-4568'),
('Кафедра финансов', 2, 'Морозова Ольга Викторовна', '+7-495-123-4569'),
('Кафедра менеджмента', 2, 'Белов Игорь Александрович', '+7-495-123-4570'),
('Кафедра гражданского права', 3, 'Орлов Владимир Сергеевич', '+7-495-123-4571'),
('Кафедра английского языка', 4, 'Смирнова Анна Петровна', '+7-495-123-4572');

-- Преподаватели
INSERT INTO teachers (first_name, last_name, middle_name, department_id, position, salary, email, phone) VALUES
('Алексей', 'Петров', 'Николаевич', 1, 'Профессор', 85000.00, 'petrov@university.edu', '+7-905-123-4567'),
('Мария', 'Сидорова', 'Александровна', 1, 'Доцент', 65000.00, 'sidorova@university.edu', '+7-905-123-4568'),
('Дмитрий', 'Козлов', 'Владимирович', 2, 'Старший преподаватель', 55000.00, 'kozlov@university.edu', '+7-905-123-4569'),
('Елена', 'Новикова', 'Сергеевна', 3, 'Доцент', 67000.00, 'novikova@university.edu', '+7-905-123-4570'),
('Игорь', 'Волков', 'Петрович', 4, 'Профессор', 88000.00, 'volkov@university.edu', '+7-905-123-4571'),
('Владимир', 'Орлов', 'Сергеевич', 5, 'Профессор', 90000.00, 'orlov@university.edu', '+7-905-123-4572'),
('Анна', 'Михайлова', 'Игоревна', 6, 'Преподаватель', 45000.00, 'mikhailova@university.edu', '+7-905-123-4573');

-- Студенты
INSERT INTO students (first_name, last_name, middle_name, student_number, faculty_id, course, group_number, birth_date, email, phone) VALUES
('Александр', 'Иванов', 'Петрович', 'ST2023001', 1, 2, 'ИТ-21', '2003-05-15', 'ivanov@student.edu', '+7-916-123-4567'),
('Екатерина', 'Петрова', 'Сергеевна', 'ST2023002', 1, 2, 'ИТ-21', '2003-08-22', 'petrova@student.edu', '+7-916-123-4568'),
('Михаил', 'Сидоров', 'Александрович', 'ST2023003', 2, 3, 'ЭК-20', '2002-12-10', 'sidorov@student.edu', '+7-916-123-4569'),
('Ольга', 'Козлова', 'Владимировна', 'ST2023004', 2, 1, 'ЭК-23', '2004-03-07', 'kozlova@student.edu', '+7-916-123-4570'),
('Андрей', 'Новиков', 'Игоревич', 'ST2023005', 3, 4, 'ЮР-19', '2001-09-18', 'novikov@student.edu', '+7-916-123-4571'),
('Дарья', 'Федорова', 'Николаевна', 'ST2023006', 4, 1, 'ИЯ-23', '2004-01-25', 'fedorova@student.edu', '+7-916-123-4572'),
('Александра', 'Медведева', 'Игоревна', 'ST2023007', 5, 2, 'МЕД-21', '2003-04-15', 'medvedeva@student.edu', '+7-916-123-4573'),
('Иван', 'Смирнов', 'Андреевич', 'ST2023008', 5, 2, 'МЕД-21', '2002-11-02', 'smirnov@student.edu', '+7-916-123-4574');

-- Предметы
INSERT INTO subjects (subject_name, department_id, credits, hours_total, hours_lectures, hours_seminars, hours_labs, semester) VALUES
('Основы программирования', 1, 5, 144, 36, 36, 72, 1),
('Базы данных', 1, 4, 108, 36, 18, 54, 3),
('Веб-разработка', 1, 4, 108, 18, 18, 72, 4),
('Информационные системы', 2, 3, 72, 36, 36, 0, 5),
('Микроэкономика', 3, 4, 108, 54, 54, 0, 1),
('Макроэкономика', 3, 4, 108, 54, 54, 0, 2),
('Гражданское право', 5, 5, 144, 72, 72, 0, 1),
('Английский язык', 6, 3, 72, 0, 72, 0, 1);

-- Расписание
INSERT INTO schedule (subject_id, teacher_id, group_number, day_of_week, start_time, end_time, classroom, lesson_type) VALUES
(1, 1, 'ИТ-21', 1, '09:00', '10:30', 'А101', 'лекция'),
(1, 2, 'ИТ-21', 3, '10:45', '12:15', 'А201', 'лабораторная'),
(2, 1, 'ИТ-21', 2, '12:30', '14:00', 'А101', 'лекция'),
(3, 3, 'ИТ-22', 2, '11:00', '12:30', 'А103', 'лекция'),
(4, 5, 'ЭК-22', 3, '13:00', '14:30', 'Б202', 'семинар'),
(5, 4, 'ЭК-20', 1, '14:15', '15:45', 'Б301', 'лекция'),
(7, 5, 'ЮР-19', 4, '09:00', '10:30', 'В201', 'лекция'),
(8, 6, 'ИЯ-23', 5, '10:45', '12:15', 'Г101', 'семинар');

-- Оценки
INSERT INTO grades (student_id, subject_id, teacher_id, grade, grade_type, semester, academic_year) VALUES
(1, 1, 1, 5, 'экзамен', 1, '2023-2024'),
(1, 2, 1, 4, 'экзамен', 3, '2023-2024'),
(2, 1, 1, 4, 'экзамен', 1, '2023-2024'),
(2, 2, 1, 5, 'экзамен', 3, '2023-2024'),
(3, 5, 4, 4, 'экзамен', 1, '2023-2024'),
(4, 5, 4, 3, 'экзамен', 1, '2023-2024'),
(5, 7, 5, 5, 'экзамен', 1, '2023-2024'),
(6, 8, 6, 4, 'зачет', 1, '2023-2024');


-- 3.  Агрегатные запросы
-- 1. Средний балл по предметам
SELECT 
    s.subject_name,
    ROUND(AVG(g.grade::numeric), 2) as average_grade,
    COUNT(g.grade) as total_grades
FROM subjects s
JOIN grades g ON s.subject_id = g.subject_id
GROUP BY s.subject_id, s.subject_name
ORDER BY average_grade DESC;

-- 2. Распределение студентов по факультетам и курсам
SELECT 
    f.faculty_name,
    st.course,
    COUNT(st.student_id) as student_count
FROM faculties f
JOIN students st ON f.faculty_id = st.faculty_id
GROUP BY f.faculty_id, f.faculty_name, st.course
ORDER BY f.faculty_name, st.course;

-- 3. Статистика зарплат по кафедрам
SELECT 
    d.department_name,
    COUNT(t.teacher_id) as teacher_count,
    ROUND(AVG(t.salary), 2) as avg_salary,
    MIN(t.salary) as min_salary,
    MAX(t.salary) as max_salary
FROM departments d
LEFT JOIN teachers t ON d.department_id = t.department_id
GROUP BY d.department_id, d.department_name
ORDER BY avg_salary DESC;

-- 4. Топ-5 студентов по успеваемости
SELECT 
    st.first_name,
    st.last_name,
    st.group_number,
    ROUND(AVG(g.grade::numeric), 2) as avg_grade,
    COUNT(g.grade) as total_exams
FROM students st
JOIN grades g ON st.student_id = g.student_id
GROUP BY st.student_id
HAVING COUNT(g.grade) >= 2
ORDER BY avg_grade DESC
LIMIT 5;

-- 5. Нагрузка преподавателей (часов/неделю)
SELECT 
    t.first_name,
    t.last_name,
    COUNT(sch.schedule_id) as classes_per_week,
    SUM(EXTRACT(EPOCH FROM (sch.end_time - sch.start_time))/3600) as hours_per_week
FROM teachers t
LEFT JOIN schedule sch ON t.teacher_id = sch.teacher_id
GROUP BY t.teacher_id
ORDER BY hours_per_week DESC;

-- 6. Статистика оценок по типам аттестации
SELECT 
    grade_type,
    COUNT(*) as total_count,
    ROUND(AVG(grade::numeric), 2) as avg_grade,
    COUNT(CASE WHEN grade = 5 THEN 1 END) as excellent,
    COUNT(CASE WHEN grade = 4 THEN 1 END) as good,
    COUNT(CASE WHEN grade = 3 THEN 1 END) as satisfactory,
    COUNT(CASE WHEN grade = 2 THEN 1 END) as unsatisfactory
FROM grades
GROUP BY grade_type
ORDER BY avg_grade DESC;

-- 7. Популярность предметов (по количеству студентов)
SELECT 
    s.subject_name,
    COUNT(DISTINCT g.student_id) as student_count,
    s.credits,
    ROUND(AVG(g.grade::numeric), 2) as avg_grade
FROM subjects s
JOIN grades g ON s.subject_id = g.subject_id
GROUP BY s.subject_id
ORDER BY student_count DESC;

-- 8. Возрастная статистика студентов
SELECT 
    f.faculty_name,
    COUNT(st.student_id) as total_students,
    ROUND(AVG(EXTRACT(YEAR FROM AGE(st.birth_date))), 1) as avg_age,
    MIN(EXTRACT(YEAR FROM AGE(st.birth_date))) as min_age,
    MAX(EXTRACT(YEAR FROM AGE(st.birth_date))) as max_age
FROM faculties f
JOIN students st ON f.faculty_id = st.faculty_id
GROUP BY f.faculty_id
ORDER BY avg_age DESC;

-- 9. Нагрузка по семестрам
SELECT 
    semester,
    COUNT(*) as subject_count,
    SUM(credits) as total_credits,
    ROUND(AVG(credits::numeric), 1) as avg_credits,
    SUM(hours_total) as total_hours
FROM subjects
GROUP BY semester
ORDER BY semester;

-- 10. Успеваемость по группам
SELECT 
    st.group_number,
    COUNT(DISTINCT st.student_id) as students_in_group,
    COUNT(g.grade) as total_grades,
    ROUND(AVG(g.grade::numeric), 2) as avg_grade,
    ROUND(
      COUNT(CASE WHEN g.grade >= 4 THEN 1 END) * 100.0 / 
      NULLIF(COUNT(g.grade), 0), 1) as quality_percentage
FROM students st
LEFT JOIN grades g ON st.student_id = g.student_id
GROUP BY st.group_number
ORDER BY avg_grade DESC;