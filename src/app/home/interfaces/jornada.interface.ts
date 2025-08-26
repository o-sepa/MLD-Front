export interface Jornada {
  id: string;
  fecha: Date;
  horaTeoricaEntrada: string;
  horaTeoricaSalida: string;
  horaRealEntrada: string;
  horaRealSalida: string;
  tiempoDesfaseEntrada?: string;
  tiempoDesfaseSalida?: string;
  tiempoDesfaseTotal?: string;
  observaciones?: string;
}
