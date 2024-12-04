import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductnewComponent } from './listproductnew.component';

describe('ListproductnewComponent', () => {
  let component: ListproductnewComponent;
  let fixture: ComponentFixture<ListproductnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListproductnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListproductnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
