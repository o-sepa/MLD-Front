import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Jornada } from '@home/interfaces/jornada.interface';

@Component({
  selector: 'app-data-table',
  imports: [DatePipe, RouterLink],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {
  jornadas = input.required<Jornada[]>();
  onDelete = output<string>();
}
