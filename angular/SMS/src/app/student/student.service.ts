import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../shared/Models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url: string = 'https://localhost:44313/api/student/'

  constructor(private http:HttpClient) { }

  getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.url + 'GetStudents')
  }

  getStudentById(id:Number):Observable<Student>{
    return this.http.get<Student>(this.url + 'GetStudent/' + id)
  }

  EditStudent(student: Student):Observable<any>{
    return this.http.put<any>(this.url + 'EditStudent/' + student.id, student)
  }

  CreateStudent(student: Student):Observable<Student>{
    return this.http.post<Student>(this.url + 'CreateStudent', student)
  }

  DeleteStudent(id:Number):Observable<any>{
    return this.http.delete<any>(this.url + 'DeleteStudent/' + id)
  }
}
