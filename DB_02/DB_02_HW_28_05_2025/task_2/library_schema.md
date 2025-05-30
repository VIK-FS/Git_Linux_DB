
# Схема Базы Данных Библиотеки

## Основные таблицы

```sql
-- Таблица Readers
CREATE TABLE Readers (
    reader_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    registration_date DATE NOT NULL,
    birth_date DATE
);

-- Таблица Library_Cards
CREATE TABLE Library_Cards (
    card_id SERIAL PRIMARY KEY,
    reader_id INT UNIQUE NOT NULL,
    card_number VARCHAR(20) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (reader_id) REFERENCES Readers(reader_id)
);

-- Таблица Categories
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Таблица Authors
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT,
    nationality VARCHAR(50)
);

-- Таблица Books
CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publication_year INT,
    pages_count INT,
    category_id INT,
    publisher VARCHAR(100),
    copies_total INT DEFAULT 1,
    copies_available INT DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Таблица Staff
CREATE TABLE Staff (
    staff_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2)
);

-- Таблица Book_Loans
CREATE TABLE Book_Loans (
    loan_id SERIAL PRIMARY KEY,
    reader_id INT NOT NULL,
    book_id INT NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    is_returned BOOLEAN DEFAULT FALSE,
    fine_amount DECIMAL(8,2) DEFAULT 0.00,
    FOREIGN KEY (reader_id) REFERENCES Readers(reader_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);
```

## Промежуточные таблицы (Many-to-Many)

```sql
-- Таблица Book_Authors
CREATE TABLE Book_Authors (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

-- Таблица Loan_Processing
CREATE TABLE Loan_Processing (
    loan_id INT,
    staff_id INT,
    processing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (loan_id, staff_id, action_type),
    FOREIGN KEY (loan_id) REFERENCES Book_Loans(loan_id),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);
```

## Схема связей

```text
- Readers (1) → Library_Cards (1)         — отношение 1:1
- Categories (1) → Books (∞)              — отношение 1:Many  
- Authors (∞) ← Book_Authors → Books (∞)  — отношение Many:Many
- Readers (1) → Book_Loans (∞)            — отношение 1:Many
- Books (1) → Book_Loans (∞)              — отношение 1:Many
- Book_Loans (∞) ← Loan_Processing → Staff (∞) — отношение Many:Many
```
