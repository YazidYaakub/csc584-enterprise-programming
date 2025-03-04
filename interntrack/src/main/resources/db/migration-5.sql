-- step:
-- 1. delete data from table and COMMIT
-- 2. drop sequence 
-- 3. drop constraints
-- 4. alter table change to varchar for uuid and add trigger
-- 5. re add constraints

-- you may searc STEP<step_no> , eg: STEP 1 through this sql file to go to the step

-- STEP 1

DELETE FROM STUDENT_CONSULTANTS;
DELETE FROM GRADES;
DELETE FROM COMMENTS;
DELETE FROM ACTIVITIES;
DELETE FROM USERS;
DELETE FROM COMPANIES;
DELETE FROM UNIVERSITIES;

COMMIT;

-- STEP 2

DROP SEQUENCE ACTIVITY_SEQUENCE;
DROP SEQUENCE GRADE_SEQUENCE;
DROP SEQUENCE COMMENT_SEQUENCE;
DROP SEQUENCE USER_SEQUENCE;
DROP SEQUENCE COMPANY_SEQUENCE;
DROP SEQUENCE UNI_SEQUENCE;
DROP SEQUENCE STUDENT_CONSULTANT_SEQUENCE;
DROP SEQUENCE STUDENT_CONSULTANT_SEQ;

-- STEP 3

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'STUDENT_CONSULTANTS'
          AND a.COLUMN_NAME IN ('STUDENT_ID', 'SUPERVISOR_ID', 'ADVISOR_ID', 'STUDENT_CONSULTANT_ID')
    ) LOOP
        v_sql := 'ALTER TABLE STUDENT_CONSULTANTS DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        DBMS_OUTPUT.PUT_LINE('Dropping constraint: ' || c.CONSTRAINT_NAME || ' on column: ' || c.COLUMN_NAME);
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
END;
/

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'GRADES'
          AND a.COLUMN_NAME IN ('GRADES_ID', 'STUDENT_ID')
    ) LOOP
        v_sql := 'ALTER TABLE GRADES DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
        DBMS_OUTPUT.PUT_LINE('Dropped constraint: ' || c.CONSTRAINT_NAME || ' on column: ' || c.COLUMN_NAME);
    END LOOP;
END;
/

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'COMMENTS'
          AND a.COLUMN_NAME IN ('COMMENT_ID', 'ACTIVITY_ID', 'USER_ID')
    ) LOOP
        v_sql := 'ALTER TABLE COMMENTS DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('All related constraints have been dropped for COMMENTS.');
END;
/

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'ACTIVITIES'
          AND a.COLUMN_NAME IN ('ACTIVITY_ID', 'STUDENT_ID', 'APPROVED_BY_ID')
    ) LOOP
        v_sql := 'ALTER TABLE ACTIVITIES DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('All related constraints have been dropped for ACTIVITIES.');
END;
/

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'USERS'
          AND a.COLUMN_NAME IN ('USER_ID', 'COMPANY_ID', 'UNIVERSITY_ID')
    ) LOOP
        v_sql := 'ALTER TABLE USERS DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('All related constraints have been dropped for USERS.');
END;
/

-- DROP CONSTRAINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'COMPANIES'
          AND a.COLUMN_NAME = 'COMPANY_ID'
    ) LOOP
        v_sql := 'ALTER TABLE COMPANIES DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('All related constraints have been dropped for COMPANIES.');
END;
/

-- DROP CONSTRINTS
DECLARE
    v_sql VARCHAR2(1000);
BEGIN
    FOR c IN (
        SELECT a.CONSTRAINT_NAME, a.COLUMN_NAME, c.CONSTRAINT_TYPE
        FROM USER_CONS_COLUMNS a
        JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        WHERE a.TABLE_NAME = 'UNIVERSITIES'
          AND a.COLUMN_NAME = 'UNIVERSITY_ID'
    ) LOOP
        v_sql := 'ALTER TABLE UNIVERSITIES DROP CONSTRAINT ' || c.CONSTRAINT_NAME;
        EXECUTE IMMEDIATE v_sql;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('All related constraints have been dropped for UNIVERSITIES.');
END;
/


-- STEP 4

-- start STUDENT_CONSULTANTS table
-- Alter the STUDENT_CONSULTANTS table primary key to use UUID
ALTER TABLE STUDENT_CONSULTANTS MODIFY (STUDENT_CONSULTANT_ID VARCHAR2(36));
ALTER TABLE STUDENT_CONSULTANTS MODIFY (STUDENT_ID VARCHAR2(36));
ALTER TABLE STUDENT_CONSULTANTS MODIFY (ADVISOR_ID VARCHAR2(36));
ALTER TABLE STUDENT_CONSULTANTS MODIFY (SUPERVISOR_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_STUDENT_CONSULTANTS;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_STUDENT_CONSULTANTS
    BEFORE INSERT
    ON STUDENT_CONSULTANTS
    FOR EACH ROW
BEGIN
    IF :new.STUDENT_CONSULTANT_ID IS NULL THEN
        :new.STUDENT_CONSULTANT_ID := SYS_GUID();
    END IF;
END;
-- end STUDENT_CONSULTANTS table

-- start GRADES table
-- Alter the GRADES table primary key to use UUID
ALTER TABLE GRADES MODIFY (GRADES_ID VARCHAR2(36));
ALTER TABLE GRADES MODIFY (STUDENT_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_GRADES;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_GRADES
    BEFORE INSERT
    ON GRADES
    FOR EACH ROW
BEGIN
    IF :new.GRADES_ID IS NULL THEN
        :new.GRADES_ID := SYS_GUID();
    END IF;
END;
-- end GRADES table

-- start COMMENTS table
-- Alter the COMMENTS table primary key to use UUID
ALTER TABLE COMMENTS MODIFY (COMMENT_ID VARCHAR2(36));
ALTER TABLE COMMENTS MODIFY (ACTIVITY_ID VARCHAR2(36));
ALTER TABLE COMMENTS MODIFY (USER_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_COMMENTS;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_COMMENTS
    BEFORE INSERT
    ON COMMENTS
    FOR EACH ROW
BEGIN
    IF :new.COMMENT_ID IS NULL THEN
        :new.COMMENT_ID := SYS_GUID();
    END IF;
END;
-- end COMMENTS table

-- start ACTIVITIES table
-- Alter the ACTIVITIES table primary key to use UUID
ALTER TABLE ACTIVITIES MODIFY (ACTIVITY_ID VARCHAR2(36));
ALTER TABLE ACTIVITIES MODIFY (STUDENT_ID VARCHAR2(36));
ALTER TABLE ACTIVITIES MODIFY (APPROVED_BY_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_ACTIVITIES;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_ACTIVITIES
    BEFORE INSERT
    ON ACTIVITIES
    FOR EACH ROW
BEGIN
    IF :new.ACTIVITY_ID IS NULL THEN
        :new.ACTIVITY_ID := SYS_GUID();
    END IF;
END;
-- end ACTIVITIES table

-- start USERS table
-- Alter the USERS table primary key to use UUID
ALTER TABLE USERS MODIFY (USER_ID VARCHAR2(36));
ALTER TABLE USERS MODIFY (COMPANY_ID VARCHAR2(36));
ALTER TABLE USERS MODIFY (UNIVERSITY_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_USER;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_USER
    BEFORE INSERT
    ON USERS
    FOR EACH ROW
BEGIN
    IF :new.USER_ID IS NULL THEN
        :new.USER_ID := SYS_GUID();
    END IF;
END;
-- end USERS table

-- start COMPANIES table
-- Alter the COMPANIES table primary key to use UUID
ALTER TABLE COMPANIES MODIFY (COMPANY_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_COMPANY;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_COMPANY
    BEFORE INSERT
    ON COMPANIES
    FOR EACH ROW
BEGIN
    IF :new.COMPANY_ID IS NULL THEN
        :new.COMPANY_ID := SYS_GUID();
    END IF;
END;
-- end COMPANIES table

-- start UNIVERSITIES table
-- Alter the UNIVERSITIES table primary key to use UUID
ALTER TABLE UNIVERSITIES MODIFY (UNIVERSITY_ID VARCHAR2(36));
-- Drop the old trigger
DROP TRIGGER BEFORE_INSERT_UNIVERSITY;

CREATE OR REPLACE TRIGGER BEFORE_INSERT_UNIVERSITY
    BEFORE INSERT
    ON UNIVERSITIES
    FOR EACH ROW
BEGIN
    IF :new.UNIVERSITY_ID IS NULL THEN
        :new.UNIVERSITY_ID := SYS_GUID();
    END IF;
END;
-- end UNIVERSITIES table



-- STEP 5

-- RE ADD CONSTRAINTS 

--  START UNIVERSITIES TABLE
-- Add the primary key constraint
ALTER TABLE UNIVERSITIES ADD CONSTRAINT PK_UNIVERSITIES PRIMARY KEY (UNIVERSITY_ID);
--  END UNIVERSITIES TABLE

--  START COMPANIES TABLE
-- Add the primary key constraint
ALTER TABLE COMPANIES ADD CONSTRAINT PK_COMPANIES PRIMARY KEY (COMPANY_ID);
--  END COMPANIES TABLE

--  START USERS TABLE
-- Add the primary key constraint
ALTER TABLE USERS ADD CONSTRAINT PK_USERS PRIMARY KEY (USER_ID);
-- Add the foreign key constraints
ALTER TABLE USERS ADD CONSTRAINT FK_COMPANY_ID FOREIGN KEY (COMPANY_ID)
    REFERENCES COMPANIES(COMPANY_ID);
ALTER TABLE USERS ADD CONSTRAINT FK_UNIVERSITY_ID FOREIGN KEY (UNIVERSITY_ID)
    REFERENCES UNIVERSITIES(UNIVERSITY_ID);
--  END USERS TABLE

--  START ACTIVITIES TABLE
-- Add the primary key constraint
ALTER TABLE ACTIVITIES ADD CONSTRAINT PK_ACTIVITIES PRIMARY KEY (ACTIVITY_ID);
-- Add the foreign key constraints
ALTER TABLE ACTIVITIES ADD CONSTRAINT FK_STUDENT_ID FOREIGN KEY (STUDENT_ID)
    REFERENCES USERS(USER_ID);
ALTER TABLE ACTIVITIES ADD CONSTRAINT FK_APPROVED_BY_ID FOREIGN KEY (APPROVED_BY_ID)
    REFERENCES USERS(USER_ID);
--  END ACTIVITIES TABLE


--  START COMMENTS TABLE
-- Add the primary key constraint
ALTER TABLE COMMENTS ADD CONSTRAINT PK_COMMENTS PRIMARY KEY (COMMENT_ID);
-- Add the foreign key constraints
ALTER TABLE COMMENTS ADD CONSTRAINT FK_ACTIVITY_ID FOREIGN KEY (ACTIVITY_ID)
    REFERENCES ACTIVITIES(ACTIVITY_ID);
ALTER TABLE COMMENTS ADD CONSTRAINT FK_USER_ID FOREIGN KEY (USER_ID)
    REFERENCES USERS(USER_ID);
--  END COMMENTS TABLE


--  START GRADES TABLE
-- Add the primary key constraint
ALTER TABLE GRADES ADD CONSTRAINT PK_GRADES PRIMARY KEY (GRADES_ID);
-- Add the foreign key constraints
ALTER TABLE GRADES ADD CONSTRAINT FK_STUDENT_ID FOREIGN KEY (STUDENT_ID)
    REFERENCES USERS(USER_ID);
--  END COMMENTS TABLE

--  START STUDENT_CONSULTANTS TABLE
-- Add the primary key constraint
ALTER TABLE STUDENT_CONSULTANTS ADD CONSTRAINT PK_STUDENT_CONSULTANTS PRIMARY KEY (STUDENT_CONSULTANT_ID);
-- Add the foreign key constraints
ALTER TABLE STUDENT_CONSULTANTS ADD CONSTRAINT FK_STUDENT_ID FOREIGN KEY (STUDENT_ID)
    REFERENCES USERS(USER_ID);
ALTER TABLE STUDENT_CONSULTANTS ADD CONSTRAINT FK_ADVISOR_ID FOREIGN KEY (ADVISOR_ID)
    REFERENCES USERS(USER_ID);
ALTER TABLE STUDENT_CONSULTANTS ADD CONSTRAINT FK_SUPERVISOR_ID FOREIGN KEY (SUPERVISOR_ID)
    REFERENCES USERS(USER_ID);
--  END STUDENT_CONSULTANTS TABLE

-- END ADD CONSTRAINTS