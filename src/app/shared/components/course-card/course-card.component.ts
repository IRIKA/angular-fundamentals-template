import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '@shared/models/course.model';
import { mockedAuthorsList } from '@shared/mocks/mock';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable = false;

  @Output() show = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();

  get authorNames(): string {
    return this.course.authors.map(id => {
      const author = mockedAuthorsList.find(author => author.id === id);
      return author ? author.name : null;
    }).join(', ');
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
