import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EletrodomesticoComponent } from './eletrodomestico.component';

describe('EletrodomesticoComponent', () => {
  let component: EletrodomesticoComponent;
  let fixture: ComponentFixture<EletrodomesticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EletrodomesticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EletrodomesticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
