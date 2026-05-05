import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptor } from '@kyc/api-common';
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {apiResponseInterceptor} from "@kyc/api-common";


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
