import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/Models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private url: string = 'https://localhost:44313/api/course/'

  constructor(private http:HttpClient) { }

  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.url + 'GetCourses')
  }

  getCourseById(id:Number):Observable<Course>{
    return this.http.get<Course>(this.url + 'GetCourse/' + id)
  }

  EditCourse(course: Course):Observable<any>{
    return this.http.put<any>(this.url + 'EditCourse/' + course.id, course)
  }

  CreateCourse(course: Course):Observable<any>{
    return this.http.post<Course>(this.url + 'CreateCourse', course)
  }

  DeleteCourse(id:Number):Observable<any>{
    return this.http.delete<any>(this.url + 'DeleteCourse/' + id)
  }



}
