import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
    private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public courses$: Observable<Course[]> = this.courses$$.asObservable();
    public authors$: Observable<Author[]> = this.authors$$.asObservable();
    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    getAll() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe(courses => {
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
            this.authors$$.next(authors);
            this.isLoading$$.next(false);
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