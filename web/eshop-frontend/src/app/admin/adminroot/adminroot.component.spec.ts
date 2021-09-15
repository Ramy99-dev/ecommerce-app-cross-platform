import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrootComponent } from './adminroot.component';

describe('AdminrootComponent', () => {
  let component: AdminrootComponent;
  let fixture: ComponentFixture<AdminrootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminrootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
