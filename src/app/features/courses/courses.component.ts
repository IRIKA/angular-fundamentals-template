import { Component } from '@angular/core';
import { mockedCoursesList } from '@shared/mocks/mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  mockedCoursesList = mockedCoursesList;
  isLoggedIn: boolean = true;

  showCourse(course: any) {
    console.debug('showCourse not implemented: ', course);
  }

  editCourse(course: any) {
    console.debug('editCourse not implemented: ', course);
  }

  deleteCourse(course: any) {
    console.debug('deleteCourse not implemented: ', course);
  }
}
