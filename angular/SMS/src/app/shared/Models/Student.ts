import { Time } from "@angular/common";
import { Class } from "./Class";
import { Course } from "./Course";
import { Teacher } from "./Teacher";

export interface Student{
    id:Number;
    name:String;
    gpa:Number;
    classes:Class[];

    roomName:String;
    semester:String;
    time:Time;

    courseId:Number;
    course:Course;

    teacherId:Number;
    teacher:Teacher;
}