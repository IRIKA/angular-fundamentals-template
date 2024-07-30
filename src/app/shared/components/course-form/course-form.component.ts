import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Course } from '@app/models/course.model';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  createAuthorClicked = false;
  courseId: string = '';
  creationMode = true;
  courseForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private coursesStoreService: CoursesStoreService,
    public fb: FormBuilder,
    public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: new FormControl(),
      description: new FormControl(),
      duration: new FormControl(),
      author: this.fb.group({
        id: new FormControl(),
        name: new FormControl()
      }),
      authors: new FormArray([]),
      courseAuthors: new FormArray([])
    });
  }

  createAuthorGroup(author: Author) {
    return this.fb.group({
      id: [author.id, Validators.required],
      name: [author.name, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]],
    });
  }

  createCourseAuthorGroup(authorsFromService: Author[], authorId: string) {
    const author = authorsFromService.find(a => a.id == authorId);
    return author ? this.createAuthorGroup(author) : null;
  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      console.debug(params);
      const mode = params.get('mode');
      console.debug(mode);
      this.creationMode = mode == 'create';
    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', this.durationValidator],
      author: this.fb.group({
        id: new FormControl(),
        name: new FormControl()
      }),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([], Validators.required)
    });

    this.coursesStoreService.getAllAuthors();
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';

    this.coursesStoreService.authors$.pipe(
      switchMap(authorsFromService => {
        if (this.courseId) {
          return this.coursesStoreService.getCourse(this.courseId).pipe(
            tap(course => {
              if (course) {
                this.courseForm.patchValue({
                  title: course.title,
                  description: course.description,
                  duration: course.duration
                });

                const courseAuthorsArray = course.authors.map(authorId =>
                  this.createCourseAuthorGroup(authorsFromService, authorId)
                ).filter(group => group !== null) as FormGroup[];

                this.courseForm.setControl('courseAuthors', this.fb.array(courseAuthorsArray));
              }
            }),
            map(course => course ? authorsFromService.filter(author => !course.authors.includes(author.id)) : authorsFromService)
          );
        } else {
          return of(authorsFromService);
        }
      })
    ).subscribe(authorsFromService => {
      const authorFormGroups = authorsFromService.map(this.createAuthorGroup.bind(this));
      this.courseForm.setControl('authors', this.fb.array(authorFormGroups));
    });
  }

  get titleControl() {
    return this.courseForm ? this.courseForm.get('title') : null;
  }

  get descriptionControl() {
    return this.courseForm ? this.courseForm.get('description') : null;
  }

  get durationControl() {
    return this.courseForm ? this.courseForm.get('duration') : null;
  }

  get authorControl() {
    return this.courseForm ? this.courseForm.get('author') : null;
  }

  isFieldInvalid(control: AbstractControl | null, checkTouched: boolean = true) {
    if (checkTouched) {
      return control?.invalid && (control?.dirty || control?.touched);
    } else {
      return control?.invalid;
    }
  }

  getRequiredFieldError(control: AbstractControl | null, fieldName: string) {
    return this.isFieldInvalid(control) && control?.hasError('required')
      ? `${fieldName} is required.`
      : '';
  }

  getMinLengthError(control?: AbstractControl | null, fieldName?: string, checkTouched: boolean = true) {
    if (!control) {
      return '';
    }
    if (this.isFieldInvalid(control, checkTouched) && control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName} should be at least ${requiredLength} characters.`;
    }
    return '';
  }

  getInvalidDurationError(control: AbstractControl | null) {
    return this.isFieldInvalid(control) && control?.hasError('invalidDuration')
      ? 'Duration cannot be less than 0.'
      : '';
  }

  getPatternError(control?: AbstractControl | null) {
    if (!control || !this.createAuthorClicked) {
      return '';
    }
    if (this.isFieldInvalid(control) && control?.hasError('pattern')) {
      return 'New author should contain only latin letters and numbers.';
    }
    return '';
  }

  durationValidator(control: FormControl) {
    const duration = control.value;
    if (duration < 0) {
      return { 'invalidDuration': true };
    }
    return null;
  }

  isCourseAuthorsEmpty(): boolean {
    return this.courseAuthors.value.length == 0;
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  onCreateAuthor() {
    this.createAuthorClicked = true;

    const authorNameControl = this.authorControl?.get('name');
    if (authorNameControl?.hasError('pattern')) {
      return;
    }
    const authorName = authorNameControl?.value;
    if (authorName && authorName.trim().length >= 2) {
      this.coursesService.createAuthor(authorName).subscribe(result => {
        console.debug(result);
        if (result) {
          const newAuthor = this.fb.group({
            id: result.id,
            name: result.name
          });
          this.authors.push(newAuthor);
          this.courseForm.get('author.name')?.reset();
        }
      });
      //const newauthorId = generateUUID();
      // const newAuthor = this.fb.group({
      //   id: newauthorId,
      //   name: authorName
      // });
      // this.authors.push(newAuthor);
      //this.courseForm.get('author.name')?.reset();
    }
    this.createAuthorClicked = false;
  }

  addCourseAuthor(index: number) {
    const author = this.authors.at(index);
    this.courseAuthors.push(author);
    this.authors.removeAt(index);
  }

  removeCourseAuthor(index: number) {
    const author = this.courseAuthors.at(index);
    this.authors.push(author);
    this.courseAuthors.removeAt(index);
  }

  goBack() {
    console.debug("goBack");
    this.router.navigate(['/courses', { goBack: true }]);
  }

  onSubmit() {
    if (!this.courseForm.valid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }
    const formValues = this.courseForm.value;
    console.debug(formValues);
    const authors: string[] = formValues.courseAuthors.map((author: any) => author.id);
    const course: Course = {
      id: this.courseId,
      title: formValues.title,
      description: formValues.description,
      creationDate: '',
      duration: Number(formValues.duration),
      authors: authors
    };

    const handleCourseOperation = (operation: Observable<Course>) => {
      operation.subscribe({
        next: (course: Course) => {
          console.debug(`Course ${this.creationMode ? 'created' : 'edited '} successfully:`, course);
          this.goBack();
        },
        error: (error: any) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.debug('Operation completed');
        }
      });
    };

    if (this.creationMode) {
      handleCourseOperation(this.coursesService.createCourse(course));
    } else {
      handleCourseOperation(this.coursesService.editCourse(this.courseId, course));
    }
  }
}

// function generateUUID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
//}