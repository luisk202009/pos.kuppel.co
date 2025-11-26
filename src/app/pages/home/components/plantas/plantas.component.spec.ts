import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantasComponent } from './plantas.component';

describe('PlantasComponent', () => {
  let component: PlantasComponent;
  let fixture: ComponentFixture<PlantasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
