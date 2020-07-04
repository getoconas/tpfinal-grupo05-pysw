import { Afiliado } from './afiliado';

export class Pago {
  _id: string;
  afiliado: Afiliado
  fecha: Date;
  monto: number;
  anio: number;
  mes: string;

  constructor() {
    
  }
}
