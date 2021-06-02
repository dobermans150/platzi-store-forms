import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorycontainerComponent } from './categorycontainer.component';

describe('CategorycontainerComponent', () => {
  let component: CategorycontainerComponent;
  let fixture: ComponentFixture<CategorycontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorycontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
