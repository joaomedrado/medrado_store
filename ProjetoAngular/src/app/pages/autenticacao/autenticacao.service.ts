import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, switchMap,catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly caminhoApiLogin = "http://localhost:3009/usuario";
  private readonly caminhoApiAdmin = "http://localhost:3009/admin";
  public adminLogado = "adminLogado";
  public  usuarioLogadoKey = "usuarioLogado";

  constructor(private http: HttpClient) { }

  
  metodoPostUsuario(pessoa: any): Observable<any> {
    return this.metodoValidarCPF(pessoa.dadosPessoais.cpf).pipe(
      switchMap((cpfExiste: boolean) => {
        if (cpfExiste) {
          alert("Já existe o usuário");
          return EMPTY; 
        } else {
          const dados = { pessoa };
          return this.http.post(this.caminhoApiLogin, dados, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
  }
  
  metodoValidarCPF(cpf: string): Observable<boolean> {
    return this.http.get<any[]>(this.caminhoApiLogin).pipe(
      map(dadosPessoais => {
        const cpfEncontrado = dadosPessoais.some(dado => dado.pessoa.dadosPessoais.cpf === cpf);
        return cpfEncontrado;
      })
    );
  }
  
  metodoLogin(usuario: string, senha: string): Observable<any> {
    return this.http.get<any[]>(this.caminhoApiLogin).pipe(
      map((usuarios) => {
        const usuarioEncontrado = usuarios.find(u => u.pessoa.dadosPessoais.email === usuario && u.pessoa.dadosPessoais.senha === senha);
        if (usuarioEncontrado) {
          localStorage.setItem(this.usuarioLogadoKey, usuarioEncontrado.id);
          return usuarioEncontrado;
        } else {
          throw new Error('Usuário ou senha incorretos');
        }
      })
    )
  }
 
  metodoBuscarPorIdUsuario(id: string):Observable<any> {
    return this.http.get(`http://localhost:3009/usuario/${id}`);
  }



  metodoAtualizarInformaçõesPerfil(id:string, usuario:any):Observable<any>{
    return this.http.put(`${this.caminhoApiLogin}/${id}`,usuario,{
      headers:  { 'Content-Type': 'application/json' }
    })
  }

  obterIdUsuarioLogado(): string {
    return localStorage.getItem(this.usuarioLogadoKey) || "";
  }

  usuarioEstaLogado(): Observable<boolean> {
    const usuario = this.obterIdUsuarioLogado();
    const usuarioID = JSON.parse(usuario)
    if (!usuarioID.id) {
      return of(false); 
    }
    return this.metodoBuscarPorIdUsuario(usuarioID.id).pipe(
      map(usuario => !!usuario), 
      catchError(() => of(false)) 
    );
  }
  logout() {
    localStorage.removeItem(this.usuarioLogadoKey);
  }


  metodoAdmin(admin: string, senha: string): Observable<any> {
    return this.http.get<any[]>(this.caminhoApiAdmin).pipe(
      map((admins) => {
        const adminEncontrado = admins.find(a => a.login === admin && a.senha === senha);
        if (adminEncontrado) {
          localStorage.setItem(this.adminLogado, adminEncontrado.id);
          return adminEncontrado;
        } else {
          throw new Error('Usuário ou senha incorretos');
        }
      })
    )
  }

  metodoBuscarPorIdAdmin(id: string):Observable<any> {
    return this.http.get(`http://localhost:3009/usuario/${id}`);
  }

  obterIdAdminLogado(): string {
    return localStorage.getItem(this.usuarioLogadoKey) || "";
  }

  adminEstaLogado(): Observable<boolean> {
    const admin = this.obterIdAdminLogado();
    const adminID = JSON.parse(admin)
    if (!adminID.id) {
      return of(false); 
    }
    return this.metodoBuscarPorIdAdmin(adminID.id).pipe(
      map(admin => !!admin), 
      catchError(() => of(false)) 
    );
  }


  buscarDadosCompras():Observable<any>{
    return this.http.get<any[]>(this.caminhoApiLogin).pipe(
      map(compras => {
        const comprasEncontrado = compras.map(dado => (
          {
            usuario: dado.pessoa.dadosPessoais,
            endereco: dado.pessoa.endereco,
            compras: dado.pessoa.compras
          }
        ));
        return comprasEncontrado;
      })
    );

  }
}
