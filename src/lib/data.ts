export const data = [
  {
    index: 1,
    content: `print the department with the highest number of students.(Display DepartmentName and StudentCount).`,
    query: `SELECT Departments.DepartmentName, COUNT(Students.StudentID) AS StudentCount
        FROM Departments
        LEFT JOIN Students ON Departments.DepartmentID = Students.DepartmentID
        GROUP BY Departments.DepartmentName
        ORDER BY StudentCount DESC
        LIMIT 1;`,
  },
  {
    index: 2,
    content: `List the names of students who are enrolled in more than one courses.(Display FirstName and LastName)`,
    query: `SELECT Students.FirstName, Students.LastName
    FROM Students
    JOIN Enrollment ON Students.StudentID = Enrollment.StudentID
    GROUP BY Students.StudentID
    HAVING COUNT(Enrollment.CourseID) > 1;`,
  },
  {
    index: 3,
    content: `Find the courses with the highest number of enrolled students.(CourseID & CourseName & EnrolledStudentsCount )`,
    query: `SELECT Courses.CourseID, Courses.CourseName, COUNT(Enrollment.StudentID) AS EnrolledStudentsCount
        FROM Courses
        JOIN Enrollment ON Courses.CourseID = Enrollment.CourseID
        GROUP BY Courses.CourseID, Courses.CourseName
        HAVING EnrolledStudentsCount = (
            SELECT MAX(EnrolledStudentsCount)
             FROM (
                 SELECT Courses.CourseID, COUNT(Enrollment.StudentID) AS EnrolledStudentsCount
                 FROM Courses
                 JOIN Enrollment ON Courses.CourseID = Enrollment.CourseID
                 GROUP BY Courses.CourseID
             ) AS CourseEnrollment
         );`,
  },
  {
    index: 4,
    content: `List the names(FirstName and LastName) of staff members who are not currently assigned to teach any course.
    `,
    query: `SELECT Staffs.FirstName, Staffs.LastName
    FROM Staffs
    LEFT JOIN Courses ON Staffs.StaffID = Courses.CourseID
    WHERE Staffs.CourseID IS NULL;
    `,
  },
  {
    index: 5,
    content: `Find the students who have the highest marks in each course.(CourseName & FirstName &LastName & HighestMark)`,
    query: `SELECT Courses.CourseName, Students.FirstName, Students.LastName, MAX(Enrollment.Mark) AS HighestMark
    FROM Courses
    JOIN Enrollment ON Courses.CourseID = Enrollment.CourseID
    JOIN Students ON Enrollment.StudentID = Students.StudentID
    WHERE (Courses.CourseID, Enrollment.Mark) IN (
        SELECT CourseID, MAX(Mark) AS MaxMark
        FROM Enrollment
        GROUP BY CourseID
    );
    
    
    GROUP BY Courses.CourseName, Students.FirstName, Students.LastName;
    `,
  },
  {
    index: 6,
    content: `List the names of courses along with the number of students enrolled in each course.(CourseName & EnrolledStudents)`,
    query: `SELECT Courses.CourseName, COUNT(Enrollment.StudentID) AS EnrolledStudents
    FROM Courses
    LEFT JOIN Enrollment ON Courses.CourseID = Enrollment.CourseID
    GROUP BY Courses.CourseName;`,
  },
  {
    index: 7,
    content: `List the courses and their respective department names where the course name contains the word "Programming".(CourseName & DepartmentName)
    `,
    query: `
    SELECT Courses.CourseName, Departments.DepartmentName
    FROM Courses
    JOIN Departments ON Courses.DepartmentID = Departments.DepartmentID
    WHERE Courses.CourseName LIKE ' %Programming%';
    `,
  },
  {
    index: 8,
    content: `Retrieve the  FirstName & LastName of students who are not enrolled in any courses.
    `,
    query: `SELECT FirstName, LastName
    FROM Students
    WHERE StudentID NOT IN (
        SELECT DISTINCT StudentID
        FROM Enrollment
    );`,
  },
  {
    index: 9,
    content: `Retrive the name FIRST NAME and LAST NAME of students whose First Name starts with 'A' and are studying in the COMPUTER SCIENCE(FirstName  & LastName)`,
    query: `SELECT FirstName, LastName
    FROM Students WHERE FirstName LIKE 'a%' AND DepartmentID=1 ;`,
  },
] as const;

export type Submission = {
  index: number;
  answer: string;
  time: Date;
};

export const submissions: Submission[] = [];
