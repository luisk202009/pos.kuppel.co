import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalClientesPage } from './modal-clientes.page';

describe('ModalClientesPage', () => {
  let component: ModalClientesPage;
  let fixture: ComponentFixture<ModalClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
