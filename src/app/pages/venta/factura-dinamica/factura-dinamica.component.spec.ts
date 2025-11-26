import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturaDinamicaComponent } from './factura-dinamica.component';

describe('FacturaDinamicaComponent', () => {
  let component: FacturaDinamicaComponent;
  let fixture: ComponentFixture<FacturaDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaDinamicaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
