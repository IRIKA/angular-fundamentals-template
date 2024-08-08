import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as CourseActions from './courses.actions';
import { CoursesService } from '../../services/courses.service';
import { CoursesStateFacade } from '../../store/courses/courses.facade';
import { CoursesState } from './courses.reducer';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private store: Store<CoursesState>,
        private router: Router
    ) { }

    // Add your code here

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map(courses => {
                        this.store.dispatch(CourseActions.requestAllCoursesSuccess({ courses }));
                        return CourseActions.requestAllCoursesSuccess({ courses })
                    }),
                    catchError(error => {
                        this.store.dispatch(CourseActions.requestAllCoursesFail({ error }));
                        return of(CourseActions.requestAllCoursesFail({ error }));
                    })
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([action, courses]) => {
                if (!courses) {
                    this.store.dispatch(CourseActions.requestFilteredCoursesFail({ error: 'No courses available' }));
                    return CourseActions.requestFilteredCoursesFail({ error: 'No courses available' });
                }
                try {
                    const filteredCourses = courses.filter(course => course.title?.includes(action.title));
                    this.store.dispatch(CourseActions.requestFilteredCoursesSuccess({ courses: filteredCourses }));
                    return CourseActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
                } catch (error) {
                    this.store.dispatch(CourseActions.requestFilteredCoursesFail({ error: 'No courses available' }));
                    return CourseActions.requestFilteredCoursesFail({ error });
                }
            }),
            catchError(error => {
                this.store.dispatch(CourseActions.requestFilteredCoursesFail({ error }));
                return of(CourseActions.requestFilteredCoursesFail({ error }));
            })
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestSingleCourse),
            mergeMap(action =>
                this.coursesService.getCourse(action.id).pipe(
                    map(course => {
                        this.store.dispatch(CourseActions.requestSingleCourseSuccess({ course }));
                        return CourseActions.requestSingleCourseSuccess({ course })
                    }),
                    catchError(error => {
                        this.store.dispatch(CourseActions.requestSingleCourseFail({ error }));
                        return of(CourseActions.requestSingleCourseFail({ error }));
                    })
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestCreateCourse),
            mergeMap(action =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => {
                        this.store.dispatch(CourseActions.requestSingleCourseSuccess({ course }));
                        return CourseActions.requestCreateCourseSuccess({ course })
                    }),
                    catchError(error => {
                        this.store.dispatch(CourseActions.requestSingleCourseFail({ error }));
                        return of(CourseActions.requestCreateCourseFail({ error }))
                    })
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestEditCourse),
            mergeMap(action =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(() => {
                        this.store.dispatch(CourseActions.requestEditCourseSuccess({ course: action.course }));
                        return CourseActions.requestEditCourseSuccess({ course: action.course })
                    }),
                    catchError(error => {
                        this.store.dispatch(CourseActions.requestEditCourseFail({ error }));
                        return of(CourseActions.requestEditCourseFail({ error }))
                    })
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestDeleteCourse),
            mergeMap(action =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => {
                        this.store.dispatch(CourseActions.requestAllCourses());
                        return CourseActions.requestAllCourses()
                    }),
                    catchError(error => {
                        this.store.dispatch(CourseActions.requestDeleteCourseFail({ error }));
                        return of(CourseActions.requestDeleteCourseFail({ error }))
                    })
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CourseActions.requestCreateCourseSuccess,
                CourseActions.requestEditCourseSuccess,
                CourseActions.requestSingleCourseFail
            ),
            map(() => {
                this.router.navigate(['/courses']);
            })
        ),
        { dispatch: false }
    );
}