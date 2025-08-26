import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Jornada } from '@home/interfaces/jornada.interface';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;
  private readonly controller = 'jornadas';

  getAll(): Observable<Jornada[]>{
    return this.http.get<Jornada[]>(`${this.baseUrl}/${this.controller}`);
  }

  getAllByMes(mes: number): Observable<Jornada[]>{
    return this.http.get<Jornada[]>(`${this.baseUrl}/${this.controller}/mes/${mes}`);
  }

  getPorId(id: string): Observable<Jornada>{
    return this.http.get<Jornada>(`${this.baseUrl}/${this.controller}/${id}`)
    .pipe(
      map(jornada => ({
        ...jornada,
        fecha: new Date(jornada.fecha)
      }))
    );
  }

  insertar(jornada: Partial<Jornada>): Observable<Jornada>{
    return this.http.post<Jornada>(`${this.baseUrl}/${this.controller}`, jornada);
  }

  actualizar(jornada: Partial<Jornada>){
    return this.http.put<Jornada>(`${this.baseUrl}/${this.controller}`, jornada);
  }

  borrar(id: string){
    return this.http.delete<Jornada>(`${this.baseUrl}/${this.controller}/${id}`);
  }

}
