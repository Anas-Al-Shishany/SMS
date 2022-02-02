import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../shared/Models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url: string = 'https://localhost:44313/api/teacher/'

  constructor(private http:HttpClient) { }

  getTeachers():Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.url + 'GetTeachers')
  }

  getTeacherById(id:Number):Observable<Teacher>{
    return this.http.get<Teacher>(this.url + 'GetTeacher/' + id)
  }

  EditTeacher(teacher: Teacher):Observable<any>{
    return this.http.put<any>(this.url + 'EditTeacher/' + teacher.id, teacher)
  }

  CreateTeacher(teacher: Teacher):Observable<Teacher>{
    return this.http.post<Teacher>(this.url + 'CreateTeacher', teacher)
  }

  DeleteTeacher(id:Number):Observable<any>{
    return this.http.delete<any>(this.url + 'DeleteTeacher/' + id)
  }
}
