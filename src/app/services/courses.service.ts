import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private API_URL = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Course[]> {
        // Add your code here
        return this.http.get<Course[]>(`${this.API_URL}/courses/all`);
    }

    createCourse(course: Course): Observable<Course> { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<Course>(`${this.API_URL}/courses/add`, course);
    }

    getCourse(id: string): Observable<Course> {
        // Add your code here
        return this.http.get<Course>(`${this.API_URL}/courses/${id}`);
    }

    editCourse(id: string, course: Course): Observable<Course> { // replace 'any' with the required interface
        // Add your code here
        return this.http.put<Course>(`${this.API_URL}/courses/${id}`, course);
    }

    deleteCourse(id: string): Observable<any> {
        // Add your code here
        return this.http.delete(`${this.API_URL}/courses/${id}`);
    }

    filterCourses(value: string): Observable<Course[]> {
        // Add your code here
        const params = { title: value, description: value, creationDate: value, duration: value };
        return this.http.get<Course[]>(`${this.API_URL}/courses/filter`, { params });
    }

    getAllAuthors(): Observable<Author[]> {
        // Add your code here
        return this.http.get<Author[]>(`${this.API_URL}/authors/all`);
    }

    // getAllAuthors(course: Course): string {
    //     // Add your code here
    //     return course.authors.map(id => {
    //         const author = this.authors.find(author => author.id === id);
    //         return author ? author.name : null;
    //     }).join(', ');
    // }

    createAuthor(name: string): Observable<Author> {
        // Add your code here
        return this.http.post<Author>(`${this.API_URL}/authors/add`, { name });
    }

    getAuthorById(id: string): Observable<Author> {
        // Add your code here
        return this.http.get<Author>(`${this.API_URL}/authors/${id}`);
    }
}
