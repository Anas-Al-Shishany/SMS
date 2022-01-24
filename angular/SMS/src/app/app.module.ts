import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { ClassComponent } from './class/class.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { ClassAddEditComponent } from './class/class-add-edit/class-add-edit.component';
import { ClassDeleteDialogComponent } from './class/class-delete-dialog/class-delete-dialog.component';
import { ClassDetailsComponent } from './class/class-details/class-details.component';
import { CourseAddEditComponent } from './course/course-add-edit/course-add-edit.component';
import { CourseDeleteDialogComponent } from './course/course-delete-dialog/course-delete-dialog.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';
import { TeacherDeleteDialogComponent } from './teacher/teacher-delete-dialog/teacher-delete-dialog.component';
import { TeacherAddEditComponent } from './teacher/teacher-add-edit/teacher-add-edit.component';
import { StudentAddEditComponent } from './student/student-add-edit/student-add-edit.component';
import { StudentDeleteDialogComponent } from './student/student-delete-dialog/student-delete-dialog.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    CourseComponent,
    ClassComponent,
    HomeComponent,
    ClassAddEditComponent,
    ClassDeleteDialogComponent,
    ClassDetailsComponent,
    CourseAddEditComponent,
    CourseDeleteDialogComponent,
    CourseDetailsComponent,
    TeacherDetailsComponent,
    TeacherDeleteDialogComponent,
    TeacherAddEditComponent,
    StudentAddEditComponent,
    StudentDeleteDialogComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
