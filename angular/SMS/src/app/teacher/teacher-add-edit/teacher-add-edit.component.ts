import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/class/class.service';
import { PageMode } from 'src/app/shared/enums/PageMode';
import { Class } from 'src/app/shared/Models/Class';
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

  classes!: Class[]

  teacherForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    schoolDegree: ['', Validators.required],
    almaMater: ['', Validators.required],
    classes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private teacherSvc: TeacherService,
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

    this.getClasses()
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
          dateOfBirth: teacher.dateOfBirth,
          schoolDegree: teacher.schoolDegree,
          almaMater: teacher.almaMater,
          classes: teacher.classes,        
        });
      }
      );
    }
    
    private getClasses(){
      this.classSvc.getClasses().subscribe(
        res =>{
          this.classes = res;
        }
      )
    }

    compareClassesFn(class1: Class, class2: Class): boolean {

      return class1 && class2 ? class1.id === class2.id : class1 === class2;
    }
    
  }
  