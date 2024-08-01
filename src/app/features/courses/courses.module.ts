import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { CoursesService } from '@app/services/courses.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseInfoComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoursesRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
