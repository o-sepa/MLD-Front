import { Routes } from "@angular/router";
import { HomeLayoutComponent } from "./layout/home-layout/home-layout.component";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { JornadaPageComponent } from "./pages/jornada-page/jornada-page.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: ':id',
        component: JornadaPageComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

export default authRoutes;
