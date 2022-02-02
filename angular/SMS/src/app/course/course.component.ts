import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../shared/Models/Course';
import { CourseDeleteDialogComponent } from './course-delete-dialog/course-delete-dialog.component';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses!: Course[]
  showSpinner:boolean = true

  constructor(private courseSvc: CourseService,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

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
        this.showSpinner == false
      }
    )
  }

}
