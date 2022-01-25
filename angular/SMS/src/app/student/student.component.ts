import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../shared/Models/Student';
import { StudentDeleteDialogComponent } from './student-delete-dialog/student-delete-dialog.component';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students!: Student[]
  showSpinner:boolean = true

  constructor(private studentSvc: StudentService,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  deleteStudent(id: Number): void{
    const dialogBox = this.dialog.open(StudentDeleteDialogComponent,{
      width: "200px"
    });

    dialogBox.afterClosed().subscribe(
      res =>{

        if(res){

          this.studentSvc.DeleteStudent(id).subscribe(
            result =>{
              this.snackBar.open("Student has been expelled")
              this.getAllStudents()
            },
            err =>{
              this.snackBar.open("INTERNAL 500")
            }
          )
        }

      }
    )
  }

  private getAllStudents(){
    this.studentSvc.getStudents().subscribe(
      student =>{
        this.students = student,
        this.showSpinner == false
      }
    )
  }

}
