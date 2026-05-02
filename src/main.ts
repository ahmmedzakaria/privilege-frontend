import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {apiResponseInterceptor} from "./app/core/interceptors/api-response.interceptor";  // ✅ keep this


bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([jwtInterceptor,apiResponseInterceptor])   // ✅ Register here
        ),
        importProvidersFrom(
            BrowserAnimationsModule,
            MatSnackBarModule
        )
    ]
}).catch(err => console.error(err));