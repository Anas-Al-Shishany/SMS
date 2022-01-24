import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/shared/Models/Class';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  classDetails!: Class

  constructor(private classSvc: ClassService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const classId = Number(this.route.snapshot.paramMap.get('id'))

    this.classSvc.getClassById(classId).subscribe(
      classs =>{
        this.classDetails = classs
      }

    )
  }

}
