import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-admin-navegation',
  standalone: true,
  imports: [RouterLink,MatSliderModule],
  templateUrl: './admin-navegation.component.html',
  styleUrl: './admin-navegation.component.css'
})
export class AdminNavegationComponent {

}
