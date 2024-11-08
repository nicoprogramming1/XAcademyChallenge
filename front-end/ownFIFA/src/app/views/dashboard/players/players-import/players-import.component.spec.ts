import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersImportComponent } from './players-import.component';

describe('PlayersImportComponent', () => {
  let component: PlayersImportComponent;
  let fixture: ComponentFixture<PlayersImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
