import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudentMarksSemester, fetchStudentMarksYear } from "../../api";
import StudentMarksForm from "../../component/Form/student/StudentMarksForm";
import { Button } from "../../component/UI";

const StudentMarks = () => {
  const [subjectMarks, setSubjectMarks] = useState([]);
  const onSubmit = async (data) => {
    if(parseInt(data['program_semester_id']) > 0){
    const studentMarks = await fetchStudentMarksSemester(data["student_id"],data['program_semester_id']);
    setSubjectMarks(studentMarks);
    return;
    }
    const studentMarks = await fetchStudentMarksYear(data["student_id"],data['program_year_id']);
    setSubjectMarks(studentMarks);
  };

  return (
    <div >
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          STUDENT MARKS
        </div>
      </h1>
      <div className="p-4 my-5 mx-20">
        <div className="mx-5">
          <Button>
            <Link to="../add-student-marks">Add Marks</Link>
          </Button>
        </div>
        <StudentMarksForm onSubmit={onSubmit} />
      </div>
      {subjectMarks.length > 0 && (
        <div className="p-4 bg-white shadow-md mb-10  mx-28">
          <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-gray-500 font-bold">
                <td className="px-6 py-3">Subject Code</td>
                <td className="px-6 py-3">Subject</td>
                <td className="px-6 py-3">Marks</td>
                <td className="px-6 py-3">Total Marks</td>
              </thead>
              <tbody>
              {subjectMarks.map((subject) => {
                if (subject.total_theory_marks === 0) return null;

                return (
                  <tr>
                    <td className="px-6 py-2">{subject.subject_code}</td>
                    <td className="px-6 py-2">{subject.subject_name} [T]</td>
                    <td className="px-6 py-2">{subject.theory_marks}</td>
                    <td className="px-6 py-2">{subject.total_theory_marks}</td>
                  </tr>
                );
              })}{" "}
               {subjectMarks.map((subject) => {
                if (subject.total_practical_marks === 0) return null;

                return (
                  <tr >
                    <td className="px-6 py-2">{subject.subject_code}</td>
                    <td className="px-6 py-2">{subject.subject_name} [P]</td>
                    <td className="px-6 py-2">{subject.practical_marks}</td>
                    <td className="px-6 py-2">{subject.total_practical_marks}</td>
                  </tr>
                );
              })}{" "}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {" "}
    </div>
  );
};

export default StudentMarks;
