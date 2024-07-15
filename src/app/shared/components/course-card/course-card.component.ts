import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  authors = '';
  constructor(private coursesService: CoursesService) { }

  @Input() course!: Course;
  @Input() editable = false;

  @Output() show = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();

  ngOnInit() {
    this.authors = this.coursesService.getAllAuthors(this.course);
  }

  showCourse(course: Course) {
    this.show.emit(course);
  }

  editCourse(course: Course) {
    this.edit.emit(course);
  }

  deleteCourse(course: Course) {
    this.delete.emit(course);
  }
}
