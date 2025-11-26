import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarClientePage } from './agregar-cliente.page';

describe('AgregarClientePage', () => {
  let component: AgregarClientePage;
  let fixture: ComponentFixture<AgregarClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
