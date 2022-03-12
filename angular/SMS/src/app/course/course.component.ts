import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassService } from '../class/class.service';
import { Class } from '../shared/Models/Class';
import { Course } from '../shared/Models/Course';
import { CourseDeleteDialogComponent } from './course-delete-dialog/course-delete-dialog.component';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseId: number = 0;

  classes!:Class[]
  courses!: Course[]
  showSpinner:boolean = true

  courseForm = this.fb.group({
    id: [0],
    classes: ['', Validators.required],
  });

  constructor(private courseSvc: CourseService,
              private dialog:MatDialog,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  deleteCourse(id: Number): void{
    const dialogBox = this.dialog.open(CourseDeleteDialogComponent,{
      width: "275px"
    });

    dialogBox.afterClosed().subscribe(
      res =>{

        if(res){

          this.courseSvc.DeleteCourse(id).subscribe(
            result =>{
              this.snackBar.open("Course has been removed")
              this.getAllCourses()
            },
            err =>{
              this.snackBar.open("INTERNAL 500")
            }
          )
        }

      }
    )
  }

      
  private getAllCourses(){
    this.courseSvc.getCourses().subscribe(
      course =>{
        this.courses = course,
        this.showSpinner = false
      }
    )
  }



}
