import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcommentComponent } from './adcomment.component';

describe('AdcommentComponent', () => {
  let component: AdcommentComponent;
  let fixture: ComponentFixture<AdcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdcommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
