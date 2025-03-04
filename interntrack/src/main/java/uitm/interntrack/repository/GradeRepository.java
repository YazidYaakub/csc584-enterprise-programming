package uitm.interntrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uitm.interntrack.entity.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, String> {
  // 1. Query for createGrade from @GradeService.java
  @Query(value = """
      INSERT INTO INTERNTRACK.GRADES (GRADE_ID, GRADE_NAME, GRADE_VALUE)
      VALUES (:gradeId, :gradeName, :gradeValue)
      """, nativeQuery = true)
  Grade createGrade(@Param("gradeId") String gradeId, @Param("gradeName") String gradeName,
      @Param("gradeValue") Double gradeValue);

  // 2. Query for getGrades from @GradeService.java
  @Query(value = """
      SELECT * FROM INTERNTRACK.GRADES
      """, nativeQuery = true)
  List<Grade> getGrades();

  @Query(value = """
      SELECT g
      FROM Grade g
      WHERE g.studentId = :studentId AND g.month = :month
      """)
  Grade getStudentByMonth(@Param("studentId") String studentId, @Param("month") String month);
}
