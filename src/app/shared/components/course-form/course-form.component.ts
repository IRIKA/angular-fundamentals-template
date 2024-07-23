import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  testFunction() {
    console.debug('Method not implemented.');
  }
  createAuthorClicked = false;

  constructor(
    private coursesStoreService: CoursesStoreService,
    public fb: FormBuilder,
    public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  ngOnInit() {
    const authorsFromService = this.coursesStoreService.getAllAuthors();
    const authorFormGroups = authorsFromService.map(author =>
      this.fb.group({
        id: [author.id, Validators.required],
        name: [author.name, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]]
      })
    );

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      duration: ['', this.durationValidator],
      author: this.fb.group({
        id: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]]
      }),
      authors: this.fb.array(authorFormGroups),
      courseAuthors: this.fb.array([])
    });
  }

  get titleControl() {
    return this.courseForm.get('title');
  }

  get descriptionControl() {
    return this.courseForm.get('description');
  }

  get durationControl() {
    return this.courseForm.get('duration');
  }

  get authorControl() {
    return this.courseForm.get('author');
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

  get authors() {
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
      const newauthorId = generateUUID();
      const newAuthor = this.fb.group({
        id: newauthorId,
        name: authorName
      });
      this.authors.push(newAuthor);
      this.courseForm.get('author.name')?.reset();
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
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
