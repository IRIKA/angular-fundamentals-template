import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';
import { Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  // showCourseInfo = false;
  selectedCourse!: Course;

  constructor(
    private router: Router,
    private coursesService: CoursesService
  ) { }

  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  onShowCourse(course: Course) {
    console.debug(`onShowCourse ${course.id}`);
    // this.showCourseInfo = true;
    this.selectedCourse = course;
    this.showCourse.emit(course);
  }

  onEditCourse(course: Course) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: Course) {
    this.deleteCourse.emit(course);
  }

  // onBack() {
  //   // this.showCourseInfo = false;
  // }

  onSearch(value: string) {
    console.debug('onSearch not implemented with value:', value);
    this.coursesService.filterCourses(value).subscribe(result => {
      result.forEach(item => {
        console.debug(`id = ${item.id}, title = ${item.title}`);
      });
      this.courses = result;
    });
  }

  addNewCourse() {
    console.debug('addNewCourse not implemented');
    this.router.navigate(['/courses/add']);
  }
}
