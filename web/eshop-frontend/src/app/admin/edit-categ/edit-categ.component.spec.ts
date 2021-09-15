import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategComponent } from './edit-categ.component';

describe('EditCategComponent', () => {
  let component: EditCategComponent;
  let fixture: ComponentFixture<EditCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
