import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersExportComponent } from './players-export.component';

describe('PlayersExportComponent', () => {
  let component: PlayersExportComponent;
  let fixture: ComponentFixture<PlayersExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
