import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesasComponent } from './mesas.component';

describe('MesasComponent', () => {
  let component: MesasComponent;
  let fixture: ComponentFixture<MesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
