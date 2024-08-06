import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private API_URL = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Course[]> {
        return this.http.get<{ successful: boolean, result: Course[] }>(`${this.API_URL}/courses/all`)
            .pipe(
                map(response => {
                    return response.result;
                })
            );
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<{ successful: boolean, result: Course }>(`${this.API_URL}/courses/add`, course)
            .pipe(map(({ result }) => result));
    }

    getCourse(id: string): Observable<Course> {
        return this.http.get<{ successful: boolean, result: Course }>(`${this.API_URL}/courses/${id}`)
            .pipe(
                tap(response => {
                    // Логування відповіді для перевірки її структури
                    console.debug('API Response:', response);
                    if (response.successful) {
                        console.debug('Course Result:', response.result);
                    } else {
                        console.error('API Response not successful:', response);
                    }
                }),
                map(response => {
                    console.debug(response.result);
                    return response.result;
                }),
                catchError(error => {
                    // Логування помилки, якщо щось пішло не так
                    console.error('Error fetching course:', error);
                    return throwError(() => new Error('Error fetching course'));
                })
            );
    }

    editCourse(id: string, course: Course): Observable<Course> {
        return this.http.put<{ successful: boolean, result: Course }>(`${this.API_URL}/courses/${id}`, course)
            .pipe(map(({ result }) => result));
    }

    deleteCourse(id: string): Observable<string> {
        return this.http.delete<{ successful: boolean, result: string }>(`${this.API_URL}/courses/${id}`)
            .pipe(map(({ result }) => result));
    }

    filterCourses(value: string): Observable<Course[]> {
        const params = { title: value, description: value };
        return this.http.get<{ successful: boolean, result: Course[] }>(`${this.API_URL}/courses/filter`, { params })
            .pipe(map(({ result }) => result));
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<{ successful: boolean, result: Author[] }>(`${this.API_URL}/authors/all`)
            .pipe(
                map(({ result }) => result),
                catchError(() => of([]))
            );
    }

    getAuthorsByCourse(course: Course): Observable<string> {
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
        return this.http.post<{ successful: boolean, result: Author }>(`${this.API_URL}/authors/add`, { name })
            .pipe(map(({ result }) => result));
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<{ successful: boolean, result: Author }>(`${this.API_URL}/authors/${id}`)
            .pipe(map(({ result }) => result));
    }
}