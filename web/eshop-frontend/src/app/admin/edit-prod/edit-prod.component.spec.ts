import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdComponent } from './edit-prod.component';

describe('EditProdComponent', () => {
  let component: EditProdComponent;
  let fixture: ComponentFixture<EditProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
