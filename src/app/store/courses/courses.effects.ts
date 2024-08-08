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
                    map(courses => CourseActions.requestAllCoursesSuccess({ courses })),
                    catchError(error => of(CourseActions.requestAllCoursesFail({ error })))
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
                    return CourseActions.requestFilteredCoursesSuccess({ courses: [] });
                }
                const filteredCourses = courses.filter(course => course.title?.includes(action.title));
                return CourseActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
            })
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestSingleCourse),
            mergeMap(action =>
                this.coursesService.getCourse(action.id).pipe(
                    map(course => CourseActions.requestSingleCourseSuccess({ course })),
                    catchError(error => of(CourseActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestCreateCourse),
            mergeMap(action =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => CourseActions.requestCreateCourseSuccess({ course })),
                    catchError(error => of(CourseActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestEditCourse),
            mergeMap(action =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(() => CourseActions.requestEditCourseSuccess({ course: action.course })),
                    catchError(error => of(CourseActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.requestDeleteCourse),
            mergeMap(action =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CourseActions.requestAllCourses()),
                    catchError(error => of(CourseActions.requestDeleteCourseFail({ error })))
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