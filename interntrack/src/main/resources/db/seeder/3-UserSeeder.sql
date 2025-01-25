-- start users seeder
INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE, CREATED_AT, UPDATED_AT, NAME, COMPANY_ID, UNIVERSITY_ID, SEMESTER, SUBJECT, POSITION, IMAGE_LINK, CONTACT_NUMBER, IS_APPROVED, ADDRESS)
VALUES
('d4e5f6g7-h8i9-j0kl1m2n3o4p5q6r7scaa', 'student001@gmail.com', 'user1234', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Mohamad Afiq', '1a2b3c4d-5e6f-7g8h-9i0j1k2l3aab', 'a1b2c3d4-e5f6-7890-abcd-efghijklmbad', 3, 'Computer Science', 'Intern', 'https://www.example.com/stud.jpg', '+60122289872', 1, '1, Jalan Kelawar, Kajang');

INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE, CREATED_AT, UPDATED_AT, NAME, COMPANY_ID, UNIVERSITY_ID, SEMESTER, SUBJECT, POSITION, IMAGE_LINK, CONTACT_NUMBER, IS_APPROVED, ADDRESS)
VALUES
('d4e5f6g7-h8i9-j0kl1m2n3o4p5q6r7scab', 'supervisor001@gmail.com', 'user1234', 'SUPERVISOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Khairul Aming', '1a2b3c4d-5e6f-7g8h-9i0j1k2l3aab', '', 3, 'Computer Science', 'Senior Executive', 'https://www.example.com/sv.jpg', '+60199888762', 1, 'Lot 80, Bukit Damansara');

INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, ROLE, CREATED_AT, UPDATED_AT, NAME, COMPANY_ID, UNIVERSITY_ID, SEMESTER, SUBJECT, POSITION, IMAGE_LINK, CONTACT_NUMBER, IS_APPROVED, ADDRESS)
VALUES
('d4e5f6g7-h8i9-j0kl1m2n3o4p5q6r7scac', 'advisor001@gmail.com', 'user1234', 'ADVISOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Muhd Eizan Shafiq', '', 'a1b2c3d4-e5f6-7890-abcd-efghijklmbad', 3, 'Computer Science', 'Lecturer', 'https://www.example.com/adv.jpg', '+60149998876', 1, 'No. 58 , Seksyen 7, Shah Alam');
COMMIT;
-- end users seeder