import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepublicoComponent } from './homepublico.component';

describe('HomepublicoComponent', () => {
  let component: HomepublicoComponent;
  let fixture: ComponentFixture<HomepublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
