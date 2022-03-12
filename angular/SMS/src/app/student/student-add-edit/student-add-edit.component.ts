import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/class/class.service';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Class } from 'src/app/shared/Models/Class';
import { Student } from 'src/app/shared/Models/Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {


  pageModeEnum = PageMode;

  studentId: number = 0;
  pageMode: PageMode = PageMode.Add;

  classes!:Class[]

  studentForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    GPA: ['', Validators.required],
    classes: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private studentSvc: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private classSvc: ClassService
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }

    this.getClasses();
  }

  addEditStudent(): void {

    if (this.studentForm.valid) {

      const student: Student = this.studentForm.value;

      if (this.pageMode == PageMode.Add) {
        this.studentSvc.CreateStudent(student).subscribe(
          res => {
            this.snackBar.open("Student has been registered");
            this.router.navigate(["/students"]);
          }
        )
      }
      else {
        this.studentSvc.EditStudent(student).subscribe( 
          res => {
            this.snackBar.open("Student has changed some personal info");
            this.router.navigate(["/students"]);
          }
        );
      }
    }
  }

  getClasses(){
    this.classSvc.getClasses().subscribe(
      res =>{
        this.classes = res;
      }
    )
  }

  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.studentId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEditMode(): void {

    this.studentSvc.getStudentById(this.studentId).subscribe(
      student => {

        this.studentForm.patchValue({
          id: student.id,
          name: student.name,
          GPA: student.gpa,
          classes: student.classes
          
        });
      }
    );
  }
  compareClassesFn(class1: Class, class2: Class): boolean {

    return class1 && class2 ? class1.id === class2.id : class1 === class2;
  }


}
