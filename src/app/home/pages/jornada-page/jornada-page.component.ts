import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JornadasService } from '@home/services/jornadas.service';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { JornadaFormComponent } from "@home/components/jornada-form/jornada-form.component";


@Component({
  selector: 'app-jornada-page',
  imports: [ReactiveFormsModule, JornadaFormComponent],
  templateUrl: './jornada-page.component.html',
})
export class JornadaPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  jornadasService = inject(JornadasService);

  jornadaId = toSignal(this.activatedRoute.params.pipe(
    map(params => params['id'])
  ));

  jornadaResource = rxResource({
    request: () => ({id: this.jornadaId()}),
    loader: ({request}) => this.jornadasService.getPorId(request.id)
  });

  redirectEffect = effect(() => {
    if(this.jornadaResource.error()){
      this.router.navigate(['/home/dashboard']);
    }
  });

}

