import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../index';
import { Course } from '@app/models/course.model';
import * as fromCourses from '@app/store/courses/courses.selectors';
import * as CourseActions from '@app/store/courses/courses.actions';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    constructor(private store: Store<State>) { }

    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(fromCourses.isAllCoursesLoadingSelector));
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(fromCourses.isSingleCourseLoadingSelector));
    isSearchingState$: Observable<boolean> = this.store.pipe(select(fromCourses.isSearchingStateSelector));
    courses$: Observable<Course[]> = this.store.pipe(select(fromCourses.getCourses));
    allCourses$: Observable<Course[]> = this.store.pipe(select(fromCourses.getAllCourses));
    course$: Observable<Course | null> = this.store.pipe(select(fromCourses.getCourse));
    errorMessage$: Observable<string | null> = this.store.pipe(select(fromCourses.getErrorMessage));

    getAllCourses() {
        this.store.dispatch(CourseActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CourseActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(title: string) {
        this.store.dispatch(CourseActions.requestFilteredCourses({ title }));
    }

    createCourse(course: Course) {
        this.store.dispatch(CourseActions.requestCreateCourse({ course }));
    }

    editCourse(id: string, course: Course) {
        this.store.dispatch(CourseActions.requestEditCourse({ id, course }));
    }

    deleteCourse(id: string) {
        this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
    }
}
