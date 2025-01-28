create table COMPANIES
(
    COMPANY_ID     VARCHAR2(36) not null
        constraint PK_COMPANIES
            primary key,
    NAME           VARCHAR2(64) not null,
    SECTOR         VARCHAR2(256),
    LOCATION       VARCHAR2(256),
    CODE           VARCHAR2(16),
    EMAIL          VARCHAR2(256),
    WEBSITE        VARCHAR2(256),
    LATITUDE       NUMBER(10, 6),
    LONGITUDE      NUMBER(10, 6),
    CONTACT_NUMBER VARCHAR2(32),
    LOGO_LINK      VARCHAR2(512)
)
-- end COMPANIES table
/

create table UNIVERSITIES
(
    UNIVERSITY_ID  VARCHAR2(36) not null
        constraint PK_UNIVERSITIES
            primary key,
    NAME           VARCHAR2(256) not null
        constraint UNIQUE_NAME
            unique,
    LOCATION       VARCHAR2(256),
    LATITUDE       NUMBER(10, 6),
    LONGITUDE      NUMBER(10, 6),
    COURSES        VARCHAR2(256),
    WEBSITE        VARCHAR2(256),
    EMAIL          VARCHAR2(256),
    CONTACT_NUMBER VARCHAR2(32),
    LOGO_LINK      VARCHAR2(512)
)
-- end UNIVERSITIES table
/

create table USERS
(
    USER_ID        VARCHAR2(36) not null
        constraint PK_USERS
            primary key,
    EMAIL          VARCHAR2(256) not null,
    PASSWORD       VARCHAR2(32) not null,
    ROLE           VARCHAR2(16)
        check (ROLE IN ('STUDENT', 'SUPERVISOR', 'ADVISOR', 'ADMIN')),
    CREATED_AT     TIMESTAMP(6) default CURRENT_TIMESTAMP,
    UPDATED_AT     TIMESTAMP(6) default CURRENT_TIMESTAMP,
    NAME           VARCHAR2(256),
    COMPANY_ID     VARCHAR2(36)
        constraint FK_COMPANY_ID
            references COMPANIES,
    UNIVERSITY_ID  VARCHAR2(36)
        constraint FK_UNIVERSITY_ID
            references UNIVERSITIES,
    SEMESTER       NUMBER(2),
    SUBJECT        VARCHAR2(256),
    POSITION       VARCHAR2(256),
    IMAGE_LINK     VARCHAR2(512),
    CONTACT_NUMBER VARCHAR2(32),
    IS_APPROVED    NUMBER(1),
    ADDRESS        VARCHAR2(512)
)
/

create unique index SYS_C007128
    on USERS (EMAIL)
-- end USERS table
/

create table GRADES
(
    GRADES_ID  VARCHAR2(36) not null
        constraint PK_GRADES
            primary key,
    STUDENT_ID VARCHAR2(36)
        constraint FKS_STUDENT_ID
            references USERS,
    MONTH      VARCHAR2(8)  not null
        check (MONTH IN
               ('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
                'AUG', 'SEP', 'OCT', 'NOV', 'DEC')),
    GRADE      CHAR
        check (GRADE IN ('A', 'B', 'C', 'D', 'E')),
    CREATED_AT TIMESTAMP(6) default CURRENT_TIMESTAMP
)
-- end GRADES table
/

create table ACTIVITIES
(
    ACTIVITY_ID          VARCHAR2(36)                           not null
        constraint PK_ACTIVITIES
            primary key,
    STUDENT_ID           VARCHAR2(36)
        constraint FK_STUDENT_ID
            references USERS,
    ACTIVITY_DESCRIPTION VARCHAR2(1024)                         not null,
    ACTIVITY_DATE        TIMESTAMP(6) default CURRENT_TIMESTAMP not null,
    IS_APPROVED          NUMBER       default 0                 not null
        check (IS_APPROVED IN (1, 0)),
    APPROVED_BY_ID       VARCHAR2(36)
        constraint FK_APPROVED_BY_ID
            references USERS,
    APPROVED_AT          TIMESTAMP(6),
    ACTIVITY_TITLE       VARCHAR2(64) default 'Default Title'   not null
)
-- end ACTIVITIES table
/

create table COMMENTS
(
    COMMENT_ID   VARCHAR2(36)                           not null
        constraint PK_COMMENTS
            primary key,
    ACTIVITY_ID  VARCHAR2(36)
        constraint FK_ACTIVITY_ID
            references ACTIVITIES,
    "COMMENT"    VARCHAR2(255)                          not null,
    CREATED_AT   TIMESTAMP(6) default CURRENT_TIMESTAMP not null,
    USER_ID      VARCHAR2(36)
        constraint FK_USER_ID
            references USERS,
    ACKNOWLEDGED NUMBER       default 0                 not null
        check (ACKNOWLEDGED IN (1, 0))
)
-- end COMMENTS table
/

create table STUDENT_CONSULTANTS
(
    STUDENT_ID            VARCHAR2(36),
    ADVISOR_ID            VARCHAR2(36)
        constraint FK_ADVISOR_ID
            references USERS,
    SUPERVISOR_ID         VARCHAR2(36)
        constraint FK_SUPERVISOR_ID
            references USERS,
    ASSIGNED_AT           TIMESTAMP(6) default CURRENT_TIMESTAMP not null,
    STUDENT_CONSULTANT_ID VARCHAR2(36)                           not null
        constraint PK_STUDENT_CONSULTANTS
            primary key
)
-- end STUDENT_CONSULTANTS table
/

