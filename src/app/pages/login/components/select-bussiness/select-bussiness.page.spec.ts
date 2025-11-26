import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectBussinessPage } from './select-bussiness.page';

describe('SelectBussinessPage', () => {
  let component: SelectBussinessPage;
  let fixture: ComponentFixture<SelectBussinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBussinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectBussinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
