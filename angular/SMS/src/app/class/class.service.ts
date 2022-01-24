import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../shared/Models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private url: string = 'https://localhost:44313/api/class/'

  constructor(private http:HttpClient) { }

  getClasses():Observable<Class[]>{
    return this.http.get<Class[]>(this.url + 'GetClasses')
  }

  getClassById(id:Number):Observable<Class>{
    return this.http.get<Class>(this.url + 'GetClass/' + id)
  }

  EditClass(classs: Class):Observable<any>{
    return this.http.put<any>(this.url + 'EditClass/' + classs.id, classs)
  }

  CreateClass(classs: Class):Observable<Class>{
    return this.http.post<Class>(this.url + 'CreateClass', classs)
  }

  DeleteClass(id:Number):Observable<any>{
    return this.http.delete<any>(this.url + 'DeleteClass/' + id)
  }

  
}
