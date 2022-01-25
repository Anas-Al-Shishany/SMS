import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/Models/Course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseDetails!: Course

  constructor(private courseSvc: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'))

    this.courseSvc.getCourseById(courseId).subscribe(
      course =>{
        this.courseDetails = course
      }

    )
  }

}
