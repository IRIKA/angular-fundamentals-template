import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  // @Input() isLoggedIn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    public userStoreService: UserStoreService
  ) {
    this.route.params.subscribe(params => {
      if (params['goBack']) {
        this.onBack();
      }
    });
    this.courses$ = this.coursesStoreService.courses$;
  }

  ngOnInit(): void {
    this.coursesStoreService.getAll();
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
    this.coursesStoreService.deleteCourse(course.id);
    this.router.navigate(['/courses']);
  }

  onBack() {
    console.debug('Event received in app-courses, navigating to /courses.');
    this.router.navigate(['/courses']);
  }
}