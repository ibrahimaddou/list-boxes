import { Routes } from '@angular/router';
import { ConfigListComponent } from './config-list/config-list.component';
import { ConfigFormComponent } from './config-form/config-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/configs', pathMatch: 'full' },
  { path: 'configs', component: ConfigListComponent },
  { path: 'config-form/:id', component: ConfigFormComponent }
];