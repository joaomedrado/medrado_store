import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private esconderCabecalhoRodapeSubject = new BehaviorSubject<boolean>(false);
  esconderCabecalhoRodape$ = this.esconderCabecalhoRodapeSubject.asObservable();

  setEsconderCabecalhoRodape(esconder: boolean): void {
    this.esconderCabecalhoRodapeSubject.next(esconder);
  }
}
