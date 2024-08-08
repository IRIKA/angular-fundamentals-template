import { Course } from '@app/models/course.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[] | null;
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: null,
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer( // Add your code here
    initialState,
    on(CourseActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CourseActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CourseActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null
    })),
    on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
        errorMessage: null
    })),
    on(CourseActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),
    on(CourseActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CourseActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CourseActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CourseActions.requestCreateCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),
    on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: state.allCourses ? [...state.allCourses, course] : [course],
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CourseActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CourseActions.requestEditCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),
    on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course: course,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CourseActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CourseActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),
    on(CourseActions.requestDeleteCourseSuccess, (state, { id }) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: null,
        errorMessage: null
    })),
    on(CourseActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    }))
);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => coursesReducer(state, action);
