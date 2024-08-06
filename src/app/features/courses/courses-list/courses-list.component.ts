import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Course } from '@app/models/course.model';
import { Router } from '@angular/router';
// import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnChanges {
  // showCourseInfo = false;
  selectedCourse!: Course;
  isCourses = false;
  infoTitle = 'Your list is empty';
  infoText = 'Please use "Add New Course" button to add  your first course';
  courses$: Observable<Course[]>;

  constructor(
    private router: Router,
    //private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.courses$ = this.coursesStateFacade.courses$;
  }

  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses']) {
      this.isCourses = this.courses.length > 0;
    }
  }

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
    console.debug('onSearch implemented with value:', value);
    this.coursesStateFacade.getFilteredCourses(value);
    this.coursesStateFacade.courses$.subscribe(result => {
      result.forEach(item => {
        console.debug(`id = ${item.id}, title = ${item.title}`);
      });
      this.courses = result;
    });
  }

  addNewCourse() {
    console.debug('addNewCourse not implemented');
    this.router.navigate(['/courses/add'], { queryParams: { mode: 'create' } });
  }
}
