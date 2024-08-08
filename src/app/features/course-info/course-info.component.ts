import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade
  ) { }
  backButtonStyle = {
    'width': '55%',
    'margin-right': '120px'
  };

  authors = '';
  course!: Course;
  private courseSubscription: Subscription | null = null;

  @Output() back = new EventEmitter<void>();

  ngOnInit() {
    console.debug('ngOnInit called');
    let id = this.route.snapshot.paramMap.get('id');
    console.debug(`my id = ${id}`);
    if (id) {
      console.debug('getSingleCourse called 1');
      this.coursesStateFacade.getSingleCourse(id);
      console.debug('getSingleCourse called 2');
      this.courseSubscription = this.coursesStateFacade.course$.subscribe(course => {
        if (course) {
          this.course = course;
          console.debug(this.course);
        } else {
          console.error('Course not found');
        }
      });

      this.coursesService.getAllAuthors().subscribe(allAuthors => {
        const courseAuthors = this.course.authors;
        const authors = allAuthors.filter(author => courseAuthors?.includes(author.id));
        this.authors = authors.map(author => author.name).join(', ');
      });
      // this.coursesStateFacade.course$.pipe(
      //   tap(course => {
      //     // Якщо курс вже отримано, виконуємо подальші дії
      //     if (course) {
      //       this.course = course;
      //       console.debug(this.course);

      //       // Тепер виконуємо запит на отримання авторів
      //       this.coursesService.getAllAuthors().subscribe(allAuthors => {
      //         const courseAuthors = this.course.authors;
      //         const authors = allAuthors.filter(author => courseAuthors.includes(author.id));
      //         this.authors = authors.map(author => author.name).join(', ');
      //       });
      //     } else {
      //       console.error('Course not found');
      //     }
      //   }),
      //   // Обробка помилок для потоку курсів
      //   catchError(error => {
      //     console.error('Error fetching course:', error);
      //     return of(null); // Повертаємо null для обробки помилки
      //   })
      // ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  goBack() {
    console.debug("goBack");
    this.router.navigate(['/courses', { goBack: true }]);
  }
}