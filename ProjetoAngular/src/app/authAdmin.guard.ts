import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminLogado = localStorage.getItem('adminLogado');
    if (adminLogado && JSON.parse(adminLogado)) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false; 
    }
  }
  
}
