create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    date_registration DATE
);


create TABLE subscribe(
    id SERIAL PRIMARY KEY,
    status INTEGER,
    date_first_sub DATE,
    date_last_sub DATE,
    FOREIGN KEY (user_id) REFERENCES person (id)
);