import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPagosPage } from './modal-pagos.page';

describe('ModalPagosPage', () => {
  let component: ModalPagosPage;
  let fixture: ComponentFixture<ModalPagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPagosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
