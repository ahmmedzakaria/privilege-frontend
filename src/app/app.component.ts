import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LayoutService} from "./core/services/layout.service";
import {AuthService} from "./core/services/auth/auth.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public layoutService: LayoutService, private authService: AuthService) {
        const token = this.authService.getToken();
        if (token) {
            this.layoutService.setAuthenticatedLayout();
        } else {
            this.layoutService.setPublicLayout();
        }
    }
}
