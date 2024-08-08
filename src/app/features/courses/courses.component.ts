import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
// import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Course[] | null>;
  // @Input() isLoggedIn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //private coursesStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade,
    public userStoreService: UserStoreService
  ) {
    this.route.params.subscribe(params => {
      if (params['goBack']) {
        this.onBack();
      }
    });
    this.courses$ = this.coursesStateFacade.allCourses$;
  }

  ngOnInit(): void {
    this.coursesStateFacade.getAllCourses();
    this.courses$.subscribe(courses => console.debug(courses));
  }

  showCourse(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }

  editCourse(course: Course) {
    console.debug('editCourse not implemented: ', course);
    this.router.navigate(['/courses/edit', course.id], { queryParams: { mode: 'edit' } });
  }

  deleteCourse(course: Course) {
    console.debug('deleteCourse not implemented: ', course);
    if (course.id) {
      this.coursesStateFacade.deleteCourse(course.id);
    }
    this.router.navigate(['/courses']);
  }

  onBack() {
    console.debug('Event received in app-courses, navigating to /courses.');
    this.router.navigate(['/courses']);
  }
}