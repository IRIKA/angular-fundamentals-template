import { Injectable } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    getAll() {
        // Add your code here
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    getCourse(id: string) {
        // Add your code here
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    deleteCourse(id: string) {
        // Add your code here
    }

    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors() {
        return mockedAuthorsList;
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
    }
}
