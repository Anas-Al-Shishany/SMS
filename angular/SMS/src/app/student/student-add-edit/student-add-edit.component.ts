import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/PageMode';
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

  studentForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    GPA: ['', Validators.required],
    class: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private studentSvc: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }
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
          GPA: student.GPA,
          class: student.class,
          
        });
      }
    );
  }

}
