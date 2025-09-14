import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { mockBackendInterceptor } from './interceptors/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule, FormsModule), //for formGroup + formControlName
    provideHttpClient(
      withInterceptors([mockBackendInterceptor]) // interceptor
    )
  ]
};
