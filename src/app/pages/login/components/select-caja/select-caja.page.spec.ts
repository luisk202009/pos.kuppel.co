import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCajaPage } from './select-caja.page';

describe('SelectCajaPage', () => {
  let component: SelectCajaPage;
  let fixture: ComponentFixture<SelectCajaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCajaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCajaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
