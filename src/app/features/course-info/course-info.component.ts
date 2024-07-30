import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) { }
  backButtonStyle = {
    'width': '55%',
    'margin-right': '120px'
  };

  authors = '';
  course!: Course;

  @Output() back = new EventEmitter<void>();

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.debug(`my id = ${id}`);
    if (id) {
      this.coursesService.getCourse(id).subscribe(course => {
        this.course = course;
        console.debug(this.course);
      });
    }

    this.coursesService.getAllAuthors().subscribe(allAuthors => {
      const courseAuthors = this.course.authors;
      const authors = allAuthors.filter(author => courseAuthors.includes(author.id));
      this.authors = authors.map(author => author.name).join(', ');
    });
  }

  goBack() {
    console.debug("goBack");
    this.router.navigate(['/courses', { goBack: true }]);
  }
}