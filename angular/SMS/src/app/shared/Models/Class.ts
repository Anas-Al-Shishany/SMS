import { Time } from "@angular/common";
import { Course } from "./Course";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Class{
    id:Number;
    room_name:String;
    semester:String;
    Time:Time;

    student:Student;

    course_id:Number;
    course:Course;

    teacher_id:Number;
    teacher:Teacher

}