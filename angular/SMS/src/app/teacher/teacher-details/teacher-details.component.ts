import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/shared/Models/Teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  teacherDetails!: Teacher

  constructor(private teacherSvc: TeacherService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const teacherId = Number(this.route.snapshot.paramMap.get('id'))

    this.teacherSvc.getTeacherById(teacherId).subscribe(
      teacher =>{
        this.teacherDetails = teacher
      }

    )
  }

}
