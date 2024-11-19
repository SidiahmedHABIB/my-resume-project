import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTmpOneComponent } from './resume-tmp-one.component';

describe('ResumeTmpOneComponent', () => {
  let component: ResumeTmpOneComponent;
  let fixture: ComponentFixture<ResumeTmpOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeTmpOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeTmpOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
