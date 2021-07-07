DROP TABLE IF EXISTS clothes;

CREATE TABLE clothes(
  id SERIAL PRIMARY KEY,
  name varchar(255),
  color varchar(255)
);
