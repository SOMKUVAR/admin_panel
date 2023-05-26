import { fetchUniversities,updateUniversity,addUniversity,fetchUniversityName } from "./university";
import { fetchStatus } from "./status";
import { fetchProgramType ,addProgramType,updateProgramType} from "./program_type";
import {fetchPrograms,addProgram,updateProgram,addProgramSemster,addProgramYear,fetchProgramExamType} from './program';
import {fetchBranches,addBranch,updateBranch,fetchCollegeBranch} from './branch'
import {fetchSemester,addSemester,updateSemester} from './semester';
import {fetchAllCollegesProgram,addCollegeProgram,updateCollegeProgram,fetchAllColleges , fetchCollegePrograms,fetchProgramSemester,
addCollege,updateCollege,fetchColleges,fetchCollegeProgramBranch,fetchCollegeProgramId,fetchAllCollegesProgramOfUniversity,
addCollegeProgramBranch,updateCollegeProgramBranch,fetchAllCollegesBranchOfUniversity,fetchProgramYear} from './college'
import { addAdminUser } from "./admin_user";
import {emailContains,login} from "./login";
import {fetchYear,addYear,updateYear} from './year';
import { addSubject,fetchSubject,updateSubject,fetchSubjectType,fetchSubjectSemesterWise,fetchSubjectYearWise} from "./subject";
import { fetchStudent,addStudent,updateStudent,fetchStudents,addStudentMarks,fetchStudentMarksSemester,fetchStudentMarksYear ,fetchStudentDetail} from "./student";
import {addGrade,fetchGrade,updateGrade} from './grade_system';

export {fetchUniversities,updateUniversity,addUniversity,fetchAllColleges,fetchCollegePrograms,
fetchUniversityName,fetchStatus,addCollege,updateCollege,fetchProgramType,fetchCollegeBranch,
addProgramType,updateProgramType,fetchPrograms,addProgram,updateProgram,fetchCollegeProgramId,
fetchBranches,addBranch,updateBranch,fetchSemester,addSemester,updateSemester,login,fetchStudentMarksSemester,
fetchAllCollegesProgram,addCollegeProgram,updateCollegeProgram,fetchColleges,emailContains,addStudentMarks,
fetchCollegeProgramBranch,addCollegeProgramBranch,updateCollegeProgramBranch,addAdminUser,fetchSubject,fetchStudentMarksYear,
fetchAllCollegesProgramOfUniversity,fetchAllCollegesBranchOfUniversity,addProgramSemster,addSubject,updateSubject,
fetchYear,addYear,updateYear,addProgramYear,fetchProgramExamType,fetchProgramSemester,fetchProgramYear,fetchStudent,fetchStudentDetail,
addStudent,updateStudent,addGrade,fetchGrade,updateGrade,fetchSubjectType,fetchStudents,fetchSubjectSemesterWise,fetchSubjectYearWise
};