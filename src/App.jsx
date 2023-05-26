import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import University from "./pages/University";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import { Branch, Program, ProgramTypes, Semester,Year } from "./pages/master";
import {CollegeProgram,Colleges,CollegeProgramBranch, Subjects} from "./pages/college";
import { Student,StudentMarks } from "./pages/student";
import GradeSystem from "./pages/GradeSystem";
import AddStudentMarksForm from "./component/Form/student/AddStudentMarksForm";

function App() {
  const isLogin = localStorage.getItem('admin_login');
  return (
    <div className="bg-red-50 min-h-screen">
      <Routes>
            {
              !isLogin && <Route path="/" element={<Login/>}/>
            }
            {
              isLogin &&   <Route path="/" element={<MainPage/>}>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='university' element={<University/>}/>
              <Route path='colleges' element={<Colleges/>}/>
              <Route path='college-program' element={<CollegeProgram/>}/>
              <Route path='college-program-branch' element={<CollegeProgramBranch/>}/>
              <Route path='college-program-branch-subject' element={<Subjects/>}/>
              <Route path='courses' element={<Courses/>}/>
              <Route path='master/program-type' element={<ProgramTypes/>}/>
              <Route path='master/program' element={<Program/>}/>
              <Route path='master/branch' element={<Branch/>}/>
              <Route path='master/semester' element={<Semester/>}/>
              <Route path='master/year' element={<Year/>}/>
              <Route path='student' element={<Student/>}/>
              <Route path="grade-system" element={<GradeSystem/>}/>
              <Route path="student-marks" element={<StudentMarks/>}/>
              <Route path="add-student-marks" element={<AddStudentMarksForm/>}/>
             </Route>
            }
          
         </Routes>
    </div>
  );
}

export default App;
