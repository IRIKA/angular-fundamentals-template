import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components/course-form/course-form.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { AdminGuard } from '@app/user/guards/admin.guard';


const routes: Routes = [
    { path: '', component: CoursesComponent },
    { path: 'add', component: CourseFormComponent, canActivate: [AdminGuard] },
    { path: ':id', component: CourseInfoComponent },
    { path: 'edit/:id', component: CourseFormComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }