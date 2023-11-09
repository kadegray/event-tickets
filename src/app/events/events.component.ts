import { Component } from '@angular/core';
import { debounceTime, lastValueFrom } from 'rxjs';
import { EventService } from '../event.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Image } from '../types/image.type';
import { Event } from '../types/event.type';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  events: Array<Event> = [];

  cityFormControl = new FormControl('', []);
  dateRangeFormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.fetchEvents();

    this.cityFormControl.valueChanges.pipe(debounceTime(500)).subscribe(changes => this.fetchEvents());
    this.dateRangeFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(changes => this.fetchEvents());
  }

  async fetchEvents() {

    const city = this.cityFormControl.value ?? undefined;
    const startDateTime = this.dateRangeFormGroup.controls.start.value ?? undefined;
    const endDateTime = this.dateRangeFormGroup.controls.end.value ?? undefined;
    
    let events: any = this.eventService.get(city, startDateTime, endDateTime);
    events = await lastValueFrom(events);

    this.events = events._embedded?.['events'];

    return this.events;
  }

  getEventImage(event: Event, ratio: string = '16_9', size: number = 1136): Image | undefined {
    return event.images.find(img => img.ratio === ratio && img.width === size);
  }
}
