import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mes } from '@home/interfaces/mes.interface';

@Component({
  selector: 'app-botonera-dashboard',
  imports: [RouterLink],
  templateUrl: './botonera-dashboard.component.html',
})
export class BotoneraDashboardComponent {

  opciones: Mes[] = [
    {value: 1, label: 'Enero'},
    {value: 2, label: 'Febrero'},
    {value: 3, label: 'Marzo'},
    {value: 4, label: 'Abril'},
    {value: 5, label: 'Mayo'},
    {value: 6, label: 'Junio'},
    {value: 7, label: 'Julio'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Septiembre'},
    {value: 10, label: 'Octubre'},
    {value: 11, label: 'Noviembre'},
    {value: 12, label: 'Diciembre'},
  ];

  selectedMonth = signal<Mes|null>(null);
  open = false;

  seleccionar(value: Mes) {
    this.selectedMonth.set(value);
    this.open = false;
  }

  onToggle(event: Event) {
    this.open = (event.target as HTMLDetailsElement).open;
  }

  getNombreMes(){
    return this.selectedMonth() ? this.selectedMonth()?.label : 'Filtrar por mes'
  }
}
