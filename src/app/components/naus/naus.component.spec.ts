import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NausComponent } from './naus.component';

describe('NausComponent', () => {
  let component: NausComponent;
  let fixture: ComponentFixture<NausComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NausComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
