import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../shared/Models/Teacher';
import { TeacherDeleteDialogComponent } from './teacher-delete-dialog/teacher-delete-dialog.component';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers!: Teacher[]
  showSpinner:boolean = true

  constructor(private teacherSvc: TeacherService,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  deleteTeacher(id: Number): void{
    const dialogBox = this.dialog.open(TeacherDeleteDialogComponent,{
      width: "275px"
    });

    dialogBox.afterClosed().subscribe(
      res =>{

        if(res){

          this.teacherSvc.DeleteTeacher(id).subscribe(
            result =>{
              this.snackBar.open("Teacher has been fired")
              this.getAllTeachers()
            },
            err =>{
              this.snackBar.open("INTERNAL 500")
            }
          )
        }

      }
    )
  }

  private getAllTeachers(){
    this.teacherSvc.getTeachers().subscribe(
      teacher =>{
        this.teachers = teacher,
        this.showSpinner = false
      }
    )
  }
}
