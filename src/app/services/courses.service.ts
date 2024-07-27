import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private API_URL = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Course[]> {
        // Add your code here
        return this.http.get<{ successful: boolean, result: Course[] }>(`${this.API_URL}/courses/all`)
            .pipe(
                map(response => {
                    console.debug(response.result);
                    return response.result;
                })
            );
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
        return this.http.get<{ successful: boolean, result: Author[] }>(`${this.API_URL}/authors/all`)
            .pipe(
                map(response => {
                    return response.result;
                }));
    }

    getAuthorsByCourse(course: Course): Observable<string> {
        // Add your code here
        return this.getAllAuthors().pipe(
            map(authors =>
                course.authors
                    .map(id => authors.find(author => author.id === id))
                    .filter((author): author is Author => Boolean(author))
                    .map(author => author.name)
                    .join(', ')
            )
        );
    }

    createAuthor(name: string): Observable<Author> {
        // Add your code here
        return this.http.post<Author>(`${this.API_URL}/authors/add`, { name });
    }

    getAuthorById(id: string): Observable<Author> {
        // Add your code here
        return this.http.get<Author>(`${this.API_URL}/authors/${id}`);
    }
}
