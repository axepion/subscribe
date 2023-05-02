create TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    date_registration DATE
);


create TABLE subscribe (
    id SERIAL PRIMARY KEY,
    status INTEGER,
    date_first_sub DATE,
    date_last_sub DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) 
);