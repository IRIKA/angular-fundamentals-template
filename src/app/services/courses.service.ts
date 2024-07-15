import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    authors: Author[] = mockedAuthorsList;

    getAll() {
        // Add your code here
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    getCourse(id: string) {
        // Add your code here
    }

    deleteCourse(id: string) {
        // Add your code here
    }

    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors(course: Course): string {
        // Add your code here
        return course.authors.map(id => {
            const author = this.authors.find(author => author.id === id);
            return author ? author.name : null;
        }).join(', ');
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
    }
}
