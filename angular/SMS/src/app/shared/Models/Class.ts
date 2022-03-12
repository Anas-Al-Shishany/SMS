import { Time } from "@angular/common";
import { Course } from "./Course";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Class{
    id:Number;
    roomName:String;
    semester:String;
    time:Time;

    students:Student[];

    courseId?:number;
    course:Course;

    teacherId?:number;
    teacher:Teacher;
}