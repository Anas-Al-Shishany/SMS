import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Teacher } from 'src/app/shared/Models/Teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-add-edit',
  templateUrl: './teacher-add-edit.component.html',
  styleUrls: ['./teacher-add-edit.component.css']
})
export class TeacherAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  teacherId: number = 0;
  pageMode: PageMode = PageMode.Add;

  teacherForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    date_of_birth: ['', Validators.required],
    school_degree: ['', Validators.required],
    alamamater: ['', Validators.required],
    class: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private teacherSvc: TeacherService,
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

  addEditTeacher(): void {

    if (this.teacherForm.valid) {

      const teacher: Teacher = this.teacherForm.value;

      if (this.pageMode == PageMode.Add) {
        this.teacherSvc.CreateTeacher(teacher).subscribe(
          res => {
            this.snackBar.open("Teacher has been hired");
            this.router.navigate(["/teachers"]);
          }
        )
      }
      else {
        this.teacherSvc.EditTeacher(teacher).subscribe( 
          res => {
            this.snackBar.open("Teacher has changed some personal info");
            this.router.navigate(["/teachers"]);
          }
        );
      }
    }
  }

  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.teacherId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEditMode(): void {

    this.teacherSvc.getTeacherById(this.teacherId).subscribe(
      teacher => {

        this.teacherForm.patchValue({
          id: teacher.id,
          name: teacher.name,
          date_of_birth: teacher.date_of_birth,
          school_degree: teacher.school_degree,
          alamamater: teacher.alamamater,
          class: teacher.class,
          
        });
      }
    );
  }

}
