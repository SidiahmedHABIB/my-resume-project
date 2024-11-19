import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTmpTwoComponent } from './resume-tmp-two.component';

describe('ResumeTmpTwoComponent', () => {
  let component: ResumeTmpTwoComponent;
  let fixture: ComponentFixture<ResumeTmpTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeTmpTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeTmpTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
