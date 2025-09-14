import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigListComponent } from './config-list/config-list.component';
import { ConfigFormComponent } from './config-form/config-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/configs', pathMatch: 'full' },
  { path: 'configs', component: ConfigListComponent },
  { path: 'config-form/:id', component: ConfigFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
