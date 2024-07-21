import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
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

  isFieldInvalid(control: AbstractControl | null) {
    return control?.invalid && (control?.dirty || control?.touched);
  }

  getRequiredFieldError(control: AbstractControl | null, fieldName: string) {
    return this.isFieldInvalid(control) && control?.hasError('required')
      ? `${fieldName} is required.`
      : '';
  }

  getMinLengthError(control: AbstractControl | null, fieldName: string) {
    if (this.isFieldInvalid(control) && control?.hasError('minlength')) {
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
    const authorName = this.authorControl?.get('name')?.value;
    if (authorName && authorName.trim().length >= 2) {
      const newauthorId = uuidv4();
      const newAuthor = this.fb.group({
        id: newauthorId,
        name: authorName
      });
      this.authors.push(newAuthor);
      this.courseForm.get('author.name')?.reset();
    }
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
