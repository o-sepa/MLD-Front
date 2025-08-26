import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './home-layout.component.html',
})
export class HomeLayoutComponent { }
