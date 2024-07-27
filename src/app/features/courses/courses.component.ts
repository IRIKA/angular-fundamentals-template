import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  @Input() isLoggedIn = false;

  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    public userStoreService: UserStoreService
  ) {
    this.courses$ = this.coursesStoreService.courses$;
  }

  ngOnInit(): void {
    this.coursesStoreService.getAll();
    this.courses$.subscribe(courses => console.debug(courses));
  }

  showCourse(course: Course) {
    console.debug('course is: ', course);
    return this.coursesStoreService.getCourse(course.id);
  }

  editCourse(course: Course) {
    console.debug('editCourse not implemented: ', course);
    this.router.navigate(['/edit', course.id]);
    //return this.coursesStoreService.editCourse(course.id, course);
  }

  deleteCourse(course: any) {
    console.debug('deleteCourse not implemented: ', course);

  }
}
