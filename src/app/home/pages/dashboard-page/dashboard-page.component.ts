import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BotoneraDashboardComponent } from "@home/components/botonera-dashboard/botonera-dashboard.component";
import { DataTableComponent } from '@home/components/data-table/data-table.component';
import { JornadasService } from '@home/services/jornadas.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [DataTableComponent, BotoneraDashboardComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {

  private readonly jornadasService = inject(JornadasService);
  jornadasResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.jornadasService.getAll();
    }
  });

  onDelete(id: string){
    this.jornadasService.borrar(id).subscribe({
      next: () => location.reload()
    });
  }
}
