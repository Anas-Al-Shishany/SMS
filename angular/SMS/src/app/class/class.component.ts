import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Class } from '../shared/Models/Class';
import { ClassDeleteDialogComponent } from './class-delete-dialog/class-delete-dialog.component';
import { ClassService } from './class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classes!: Class[]
  showSpinner = true

  constructor(private classSvc:ClassService,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getAllClasses();

  }

  deleteClass(id: Number): void{
    const dialogBox = this.dialog.open(ClassDeleteDialogComponent,{
      width: "275px"
    });

    dialogBox.afterClosed().subscribe(
      res =>{

        if(res){

          this.classSvc.DeleteClass(id).subscribe(
            result =>{
              this.snackBar.open("class has been destroyed")
              this.getAllClasses()
            },
            err =>{
              this.snackBar.open("wrecking ball missing(INTERNAL 500)")
            }
          )
        }

      }
    )
  }

  private getAllClasses(){
    this.classSvc.getClasses().subscribe(
      classs =>{
        this.classes = classs,
        this.showSpinner = false
      }
    )
  }

}
