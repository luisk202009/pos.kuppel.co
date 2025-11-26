import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFacturasEsperaPage } from './modal-facturas-espera.page';

describe('ModalFacturasEsperaPage', () => {
  let component: ModalFacturasEsperaPage;
  let fixture: ComponentFixture<ModalFacturasEsperaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFacturasEsperaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFacturasEsperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
