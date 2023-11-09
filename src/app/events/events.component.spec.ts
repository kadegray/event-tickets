import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsComponent],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        MatDatepickerModule,
      ]
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch events', async () => {
    const fixture = TestBed.createComponent(EventsComponent);
    const comp = fixture.componentInstance;

    await comp.fetchEvents();
    expect(comp.events).toBeDefined();
    expect(comp.events.length).toEqual(20);
  });

  it('should get event image', async () => {
      const fixture = TestBed.createComponent(EventsComponent);
      const comp = fixture.componentInstance;

      await comp.fetchEvents();
      const firstEvent = comp.events[0];
      const imgUrl = comp.getEventImage(firstEvent, '16_9', 1136);
      console.log(imgUrl);
      expect(imgUrl).toBeDefined();
      expect(imgUrl?.ratio).toEqual('16_9');
      expect(imgUrl?.width).toEqual(1136);
      expect(imgUrl?.url).toContain('16_9.');
  });
});
