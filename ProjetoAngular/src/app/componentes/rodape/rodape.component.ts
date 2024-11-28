import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {
  hideHeaderFooter: boolean = false;
  constructor(private layoutService: LayoutService) { }

  mensagemEmail:string = "jaomedrado01@gmail.com"
  ngOnInit(): void {
    this.layoutService.esconderCabecalhoRodape$.subscribe(hide => {
      this.hideHeaderFooter = hide;
    });
  }

}
