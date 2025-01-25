-- start companies seeder
INSERT INTO COMPANIES (COMPANY_ID, NAME, SECTOR, LOCATION, CODE, EMAIL, WEBSITE, LATITUDE, LONGITUDE, CONTACT_NUMBER, LOGO_LINK)
VALUES
('1a2b3c4d-5e6f-7g8h-9i0j1k2l3aaa', 'TM', 'Technology', 'Bangsar', 'TM001', 'contact@tm.com', 'https://www.tm.com.my/', 3.116134, 101.664881, '+60322409494', 'https://www.tm.com/logo.png');

INSERT INTO COMPANIES (COMPANY_ID, NAME, SECTOR, LOCATION, CODE, EMAIL, WEBSITE, LATITUDE, LONGITUDE, CONTACT_NUMBER, LOGO_LINK)
VALUES
('1a2b3c4d-5e6f-7g8h-9i0j1k2l3aab', 'Petronas', 'Oil & Gas', 'Kuala Lumpur City Centre', 'PTR002', 'contact@petronas.com', 'https://www.petronas.com/', 3.157764, 101.711861, '+60320515000', 'https://www.petronas.com/logo.png');

INSERT INTO COMPANIES (COMPANY_ID, NAME, SECTOR, LOCATION, CODE, EMAIL, WEBSITE, LATITUDE, LONGITUDE, CONTACT_NUMBER, LOGO_LINK)
VALUES
('1a2b3c4d-5e6f-7g8h-9i0j1k2l3aac', 'Astro', 'Multimedia', 'Bukit Jalil', 'AST003', 'contact@astro.com', 'https://corporate.astro.com.my/', 3.0546, 101.6879, '+60395436688', 'https://www.astro.com/logo.png');

INSERT INTO COMPANIES (COMPANY_ID, NAME, SECTOR, LOCATION, CODE, EMAIL, WEBSITE, LATITUDE, LONGITUDE, CONTACT_NUMBER, LOGO_LINK)
VALUES
('1a2b3c4d-5e6f-7g8h-9i0j1k2l3aad', 'Unifi', 'Technology', 'Kuala Lumpur', 'UNI004', 'contact@unifi.com', 'https://unifi.com.my/', 3.116134, 101.664881, '+60379332400', 'https://www.unifi.com/logo.png');
COMMIT;
-- end companies seeder