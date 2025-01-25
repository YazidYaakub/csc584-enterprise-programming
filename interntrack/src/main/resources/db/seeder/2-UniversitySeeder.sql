-- start universities seeder

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmbaa', 'University Sains Malaysia', 'Penang', 5.357948, 100.296173, 'Engineering, Science, Business', 'https://www.usm.my/', 'info@usm.my', '+6046533333', 'https://www.usm.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmbab', 'Universiti Malaya', 'Kuala Lumpur', 3.1200, 101.6544, 'Engineering, Science, Pharmaceutical', 'https://www.um.edu.my/', 'uminfo@um.edu.my', '+60379674000', 'https://www.um.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmbac', 'Universiti Kebangsaan Malaysia', 'Bangi', 2.9273, 101.7777, 'Engineering, Literature, Business', 'https://www.ukm.my/portalukm/', 'pro@ukm.edu.my', '+603892150000', 'https://www.ukm.edu/logo.png');

INSERT INTO UNIVERSITIES (UNIVERSITY_ID, NAME, LOCATION, LATITUDE, LONGITUDE, COURSES, WEBSITE, EMAIL, CONTACT_NUMBER, LOGO_LINK)
VALUES
('a1b2c3d4-e5f6-7890-abcd-efghijklmbad', 'Universiti Teknologi MARA', 'Shah Alam', 3.0731, 101.5187, 'Engineering, Musical, Business', 'https://www.uitm.edu.my/', 'info@uitm.edu.my', '+60360265000', 'https://www.uitm.edu/logo.png');
COMMIT;
-- end universities seeder