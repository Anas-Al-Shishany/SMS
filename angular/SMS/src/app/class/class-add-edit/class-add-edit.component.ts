import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Class } from 'src/app/shared/Models/Class';
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

  classForm = this.fb.group({
    id: [0],
    roomName: ['', Validators.required],
    semester: ['', Validators.required],
    time: ['', Validators.required],
    courseId: ['', Validators.required],
    course: ['', Validators.required],
    teacherId: ['', Validators.required],
    teacher: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private classSvc: ClassService,
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
          course: classs.course,
          teacherId: classs.teacherId,
          teacher: classs.teacher
        });
      }
    );
  }

}
