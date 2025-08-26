import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Jornada } from '@home/interfaces/jornada.interface';
import { firstValueFrom } from 'rxjs';
import { JornadasService } from '../../services/jornadas.service';
import { Router } from '@angular/router';
import { FormValidationUtils } from '@utils/form-validation-utils';

@Component({
  selector: 'app-jornada-form',
  imports: [ReactiveFormsModule],
  templateUrl: './jornada-form.component.html',
})
export class JornadaFormComponent implements OnInit {

  jornada = input.required<Jornada>();
  jornadasService = inject(JornadasService);

  fb = inject(FormBuilder);
  form = this.fb.group({
    fecha: ['', Validators.required],
    horaTeoricaEntrada: [null, Validators.required],
    horaTeoricaSalida: [null, Validators.required],
    horaRealEntrada: [null, Validators.required],
    horaRealSalida: [null, Validators.required],
    observaciones: [null],
  });

  wasSaved = signal<boolean>(false);
  router = inject(Router);
  formValidationUtils = FormValidationUtils;

  ngOnInit(): void {
    this.setFormValue(this.jornada())
  }

  setFormValue(formData: Jornada){
    this.form.reset(formData as any);
    const fechaFormateada = this.formatDate(formData.fecha);
    this.form.patchValue({fecha: fechaFormateada});
  }

  async submit(){
    const isValid = this.form.valid;
    if(!isValid){
      this.form.markAllAsTouched();
      return;
    }

    const jornada: Partial<Jornada> = {
      ...this.form.value as any,
    };

    if(!this.jornada()){
      jornada.id = '';
      const jornada$ = await firstValueFrom(
        this.jornadasService.insertar(jornada)
      );

      this.router.navigate(['home/dashboard'])
    }else{
      await firstValueFrom(
        this.jornadasService.actualizar(this.jornada())
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);

  }

  private formatDate(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = `${fecha.getMonth() + 1}`.padStart(2, '0');
    const day = `${fecha.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
