import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatizationtoolComponent } from './templatizationtool.component';

describe('TemplatizationtoolComponent', () => {
  let component: TemplatizationtoolComponent;
  let fixture: ComponentFixture<TemplatizationtoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatizationtoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatizationtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
