To create schema for Oracle database, run the following commands:

```sql
CREATE USER TRANSTRACK IDENTIFIED BY oracle;
GRANT CONNECT, RESOURCE TO TRANSTRACK;
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE, CREATE VIEW, CREATE PROCEDURE, CREATE TRIGGER TO TRANSTRACK;
ALTER SESSION SET CURRENT_SCHEMA = TRANSTRACK
```

To create a table for users, run the following commands:
```sql
CREATE SEQUENCE user_seq
START WITH 1
INCREMENT BY 1;

CREATE TABLE USERS (
  id          NUMBER PRIMARY KEY,
  name        VARCHAR2(255) NOT NULL,
  email       VARCHAR2(255) NOT NULL,
  password    VARCHAR2(255) NOT NULL
);

CREATE TRIGGER before_insert_users
BEFORE INSERT ON USERS
FOR EACH ROW
BEGIN
    IF :new.id IS NULL THEN
        SELECT user_seq.NEXTVAL INTO :new.id FROM dual;
    END IF;
END;
```

To check if the table was created successfully, run the following command:
```sql
SELECT * FROM USERS;
```
