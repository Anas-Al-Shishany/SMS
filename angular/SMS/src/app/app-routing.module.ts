import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassAddEditComponent } from './class/class-add-edit/class-add-edit.component';
import { ClassDetailsComponent } from './class/class-details/class-details.component';
import { ClassComponent } from './class/class.component';

import { CourseAddEditComponent } from './course/course-add-edit/course-add-edit.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';

import { StudentAddEditComponent } from './student/student-add-edit/student-add-edit.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentComponent } from './student/student.component';

import { TeacherAddEditComponent } from './teacher/teacher-add-edit/teacher-add-edit.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {path: 'classes', component:ClassComponent},
  {path: 'classes/:id', component:ClassDetailsComponent},
  {path: 'classes/add', component:ClassAddEditComponent},
  {path: 'classes/edit/:id', component:ClassAddEditComponent},

  {path: 'courses', component:CourseComponent},
  {path: 'courses/:id', component:CourseDetailsComponent},
  {path: 'courses/add', component:CourseAddEditComponent},
  {path: 'courses/edit/:id', component:CourseAddEditComponent},

  {path: 'teachers', component:TeacherComponent},
  {path: 'teachers/:id', component:TeacherDetailsComponent},
  {path: 'teachers/add', component:TeacherAddEditComponent},
  {path: 'teachers/edit/:id', component:TeacherAddEditComponent},

  {path: 'students', component:StudentComponent},
  {path: 'students/:id', component:StudentDetailsComponent},
  {path: 'students/add', component:StudentAddEditComponent},
  {path: 'students/edit/:id', component:StudentAddEditComponent},

  {path: '**', component:HomeComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
