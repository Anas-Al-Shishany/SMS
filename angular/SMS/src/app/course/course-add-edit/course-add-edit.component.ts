import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/class/class.service';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Class } from 'src/app/shared/Models/Class';
import { Course } from 'src/app/shared/Models/Course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent implements OnInit {

  pageModeEnum = PageMode;


  courseId: number = 0;
  pageMode: PageMode = PageMode.Add;

  courseForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private courseSvc: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar ,

  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }

  }

  addEditCourse(): void {

    if (this.courseForm.valid) {

      const course: Course = this.courseForm.value;

      if (this.pageMode == PageMode.Add) {
        this.courseSvc.CreateCourse(course).subscribe(
          res => {
            this.snackBar.open("Course has been created");
            this.router.navigate(["/courses"]);
          }
        )
      }
      else {
        this.courseSvc.EditCourse(course).subscribe( 
          res => {
            this.snackBar.open("course has been re-decided");
            this.router.navigate(["/courses"]);
          }
        );
      }
    }
  }


  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.courseId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }


  private preparePageForEditMode(): void {

    this.courseSvc.getCourseById(this.courseId).subscribe(
      course => {

        this.courseForm.patchValue({
          id: course.id,
          name: course.name,
          description: course.description
        });
      }
    );
  }

}
