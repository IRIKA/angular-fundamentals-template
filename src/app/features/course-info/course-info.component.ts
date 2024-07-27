import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  authors = '';

  // Use the names for the input `course`.
  @Input() course!: Course;
  @Output() back = new EventEmitter<void>();

  ngOnInit() {
    this.coursesService.getAllAuthors().subscribe(allAuthors => {
      const courseAuthors = this.course.authors;
      const authors = allAuthors.filter(author => courseAuthors.includes(author.id));
      this.authors = authors.map(author => author.name).join(', ');
    });
  }

  goBack() {
    this.back.emit();
  }
}
