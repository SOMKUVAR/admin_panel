import {fetchAllCollegesProgram,addCollegeProgram,updateCollegeProgram,fetchCollegePrograms,
        fetchCollegeProgramId,fetchAllCollegesProgramOfUniversity} from './college_program';
import {fetchAllColleges,addCollege,updateCollege,fetchColleges} from './college';
import {fetchCollegeProgramBranch,addCollegeProgramBranch,updateCollegeProgramBranch,fetchAllCollegesBranchOfUniversity} from './college_program_branch';
import {fetchProgramSemester} from './program_semester';
import { fetchProgramYear } from './program_year';

export {fetchAllCollegesProgram,addCollegeProgram,updateCollegeProgram,fetchAllColleges,fetchCollegePrograms,fetchCollegeProgramId,
addCollege,updateCollege,fetchColleges,fetchCollegeProgramBranch,addCollegeProgramBranch,updateCollegeProgramBranch,
fetchAllCollegesProgramOfUniversity,fetchAllCollegesBranchOfUniversity,fetchProgramSemester,fetchProgramYear
};