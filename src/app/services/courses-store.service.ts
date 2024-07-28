import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { BehaviorSubject, first, map, Observable, take, tap } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
    private authorsByCourse$$ = new BehaviorSubject<string>('');
    private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public courses$: Observable<Course[]> = this.courses$$.asObservable();
    public authors$: Observable<Author[]> = this.authors$$.asObservable();
    public authorsByCourse$ = this.authorsByCourse$$.asObservable();
    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    getAll() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe(courses => {
            console.debug(courses);
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
        });
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).subscribe(() => {
            this.getAll();
        });
    }

    getCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.coursesService.getCourse(id);
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).subscribe(() => {
            this.getAll();
        });
    }

    deleteCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).subscribe(() => {
            this.getAll();
        });
    }

    filterCourses(value: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).subscribe(courses => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
        });
    }

    getAllAuthors() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().subscribe(authors => {
            console.debug(`authors in getAllAuthors is ${authors}`);
            this.authors$$.next(authors);
            this.isLoading$$.next(false);
        });
    }

    getAuthorsByCourse(course: Course) {
        this.isLoading$$.next(true);
        this.authors$$.pipe(
            map(authors =>
                course.authors
                    .map(authorId => authors.find(author => author.id === authorId))
                    .filter((author): author is Author => Boolean(author))
                    .map(author => author.name)
                    .join(', ')
            ),
            tap(() => this.isLoading$$.next(false)),
            take(1)
        ).subscribe(authorsNames => {
            this.authorsByCourse$$.next(authorsNames);
        });
    }

    createAuthor(name: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createAuthor(name).subscribe(() => {
            this.getAllAuthors();
        });
    }

    getAuthorById(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.coursesService.getAuthorById(id);
    }
}