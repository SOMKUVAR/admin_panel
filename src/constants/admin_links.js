import { AiFillHome, AiOutlineBranches } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { MdCastForEducation,MdSubject } from "react-icons/md";
import {BsMortarboardFill,BsFileEarmarkSpreadsheet} from "react-icons/bs";

const LINKS = [
    {
        to: "/dashboard",
        Icon: AiFillHome,
        name: "DASHBOARD"
    },
    {
        to: "/grade-system",
        Icon: AiFillHome,
        name: "GRADE SYSTEM"
    },
    {
        title: "COLLEGE",
        subLinks: [
            {
                to: "/colleges",
                Icon: FaUniversity,
                name: "COLLEGES"
            },
            {
                to: "/college-program",
                Icon: MdCastForEducation,
                name: "COLLEGE PROGRAM"
            },
            {
                to: "/college-program-branch",
                Icon: AiOutlineBranches,
                name: "COLLEGE BRANCH"
            },
            {
                to:"/college-program-branch-subject",
                Icon: MdSubject,
                name: "SUBJECTS"
            }
        ]
    },
    {
            title: "STUDENT",
            subLinks: [
                {
                    to: "/student",
                    Icon: BsMortarboardFill,
                    name: "STUDENT"
                },
                {
                    to: "/student-marks",
                    Icon: BsFileEarmarkSpreadsheet,
                    name: "STUDENT MARKS"
                },
            ]
    }
]

export default LINKS;