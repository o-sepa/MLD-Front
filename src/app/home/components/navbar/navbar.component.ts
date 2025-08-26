import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ToggleThemeComponent } from "@shared/components/toggle-theme/toggle-theme.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ToggleThemeComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
