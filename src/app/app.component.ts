import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Consumir';
  http = inject(HttpClient);
  urlApi = "https://localhost:7257";
  pessoas$?: Observable<Pessoa[]>;
  valorBuscaPessoa = '';
  nomeAdicionar = '';

  ngOnInit(): void {
    this.obterPessoas();
  }
  
  pessoaEncontrada$?: Observable<Pessoa>

  obterPessoas() {
    this.pessoas$ = this.http.get<Pessoa[]> (`${this.urlApi}/pessoas`);    
  }

  obterPessoaEspecifica() {
    this.pessoaEncontrada$ = this.http.get<Pessoa> (`${this.urlApi}/pessoas/${this.valorBuscaPessoa}`);    
  }

  adicionarPessoa() {
    if (!this.nomeAdicionar)
      return;

    const pessoaCriar: Pessoa = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nome: this.nomeAdicionar
    }
    this.nomeAdicionar = '';
    this.http.post<void>(`${this.urlApi}/pessoas`, pessoaCriar).subscribe(_ => this.obterPessoas());
  }
}
