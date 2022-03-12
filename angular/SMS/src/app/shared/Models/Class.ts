import { Course } from "./Course";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Class{
    id:Number;
    roomName:String;
    semester:String;
    time:Date;

    students:Student[];

    courseId?:number;
    course:Course;

    teacherId?:number;
    teacher:Teacher;
}