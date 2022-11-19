import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileListComponent } from './public-profile-list.component';

describe('PublicProfileComponent', () => {
  let component: PublicProfileListComponent;
  let fixture: ComponentFixture<PublicProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProfileListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
