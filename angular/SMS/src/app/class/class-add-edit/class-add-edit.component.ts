import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course/course.service';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Class } from 'src/app/shared/Models/Class';
import { Course } from 'src/app/shared/Models/Course';
import { Student } from 'src/app/shared/Models/Student';
import { Teacher } from 'src/app/shared/Models/Teacher';
import { StudentService } from 'src/app/student/student.service';
import { TeacherService } from 'src/app/teacher/teacher.service';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class-add-edit',
  templateUrl: './class-add-edit.component.html',
  styleUrls: ['./class-add-edit.component.css']
})
export class ClassAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  classId: number = 0;
  pageMode: PageMode = PageMode.Add;

  teachers!:Teacher[]
  courses!:Course[]

  classForm = this.fb.group({
    id: [0],
    roomName: ['', Validators.required],
    semester: ['', Validators.required],
    time: ['', Validators.required],
    courseId: [''],
    teacherId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private classSvc: ClassService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private teacherSvc:TeacherService,
    private courseSvc: CourseService,
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }

    this.getTeachers()
    this.getCourses()
  }

  addEditClass(): void {

    if (this.classForm.valid) {

      const classs: Class = this.classForm.value;

      if (this.pageMode == PageMode.Add) {
        this.classSvc.CreateClass(classs).subscribe(
          res => {
            this.snackBar.open("Class has been constructed");
            this.router.navigate(["/classes"]);
          }
        )
      }
      else {
        this.classSvc.EditClass(classs).subscribe( 
          res => {
            this.snackBar.open("class has been renovated");
            this.router.navigate(["/classes"]);
          }
        );
      }
    }
  }



  getTeachers(){
    this.teacherSvc.getTeachers().subscribe(
      teacher =>{
        this.teachers = teacher
      }
    )
  }

  getCourses(){
    this.courseSvc.getCourses().subscribe(
      course =>{
        this.courses = course
      }
    )
  }
  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.classId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEditMode(): void {

    this.classSvc.getClassById(this.classId).subscribe(
      classs => {

        this.classForm.patchValue({
          id: classs.id,
          roomName: classs.roomName,
          semester: classs.semester,
          time: classs.time,
          courseId: classs.courseId,
          teacherId: classs.teacherId
        });
      }
    );
  }

}
