import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp } from './signup.component';

describe('UserProfileComponent', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUp ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
