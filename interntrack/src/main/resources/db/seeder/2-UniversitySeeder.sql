-- start universities seeder

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmnza', 'Stanford University', 'California', 36.778259, -119.417931, 'Engineering, Science, Business', 'https://www.stanford.edu', 'info@stanford.edu', '987-654-3210', 'https://www.stanford.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmnzb', 'Harvard University', 'California', 36.778259, -119.417931, 'Engineering, Science, Business', 'https://www.harvard.edu', 'info@harvard.edu', '987-654-3210', 'https://www.harvard.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmnzc', 'MIT', 'Massachusetts', 36.778259, -119.417931, 'Engineering, Science, Business', 'https://www.mit.edu', 'info@mit.edu', '987-654-3210', 'https://www.mit.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmnzd', 'UiTM', 'Shah Alam', 36.778259, -119.417931, 'Engineering, Science, Business', 'https://www.uitm.edu', 'info@uitm.edu', '987-654-3210', 'https://www.uitm.edu/logo.png');
COMMIT;
-- end universities seeder