import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/shared/Models/Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentDetails!: Student

  constructor(private studentSvc: StudentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'))

    this.studentSvc.getStudentById(studentId).subscribe(
      student =>{
        this.studentDetails = student
      }

    )
  }

}
