import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  showCourseInfo = false;
  selectedCourse!: Course;

  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  onShowCourse(course: Course) {
    this.showCourseInfo = true;
    this.selectedCourse = course;
    this.showCourse.emit(course);
  }

  onEditCourse(course: Course) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: Course) {
    this.deleteCourse.emit(course);
  }

  onBack() {
    this.showCourseInfo = false;
  }
}
