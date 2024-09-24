import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './layout/header/header.component';
import { AdminNavegationComponent } from "./layout/admin-navegation/admin-navegation.component";
import { AdminHeaderComponent } from "./layout/admin-header/admin-header.component";
import { NavComponent } from "./layout/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent, AdminNavegationComponent, AdminHeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MarketPlaceApp';





}
