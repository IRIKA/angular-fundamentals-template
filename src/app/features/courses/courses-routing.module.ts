import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components/course-form/course-form.component';
import { CourseCardComponent } from '@app/shared/components';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';


const routes: Routes = [
    // { path: '', component: CoursesComponent, canActivate: [AuthorizedGuard] },
    // { path: 'add', component: CourseFormComponent, canActivate: [AuthorizedGuard] },
    // { path: ':id', component: CourseCardComponent, canActivate: [AuthorizedGuard] },
    // { path: 'edit/:id', component: CourseFormComponent, canActivate: [AuthorizedGuard] }
    { path: '', component: CoursesComponent },
    { path: 'add', component: CourseFormComponent, canActivate: [AdminGuard] },
    { path: ':id', component: CourseCardComponent },
    { path: 'edit/:id', component: CourseFormComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }