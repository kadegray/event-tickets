import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EventService } from '../event.service';

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Event {
  id: number;
  type: string;
  name: string;
  test: boolean;
  locale: string;
  images: Array<Image>;
  dates: Object;
  sales: Object;
  url: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  events: Array<Event> = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.fetchEvents();
  }

  async fetchEvents() {
    
    let events: any = this.eventService.get();
    events = await lastValueFrom(events);

    this.events = events._embedded?.['events'];

    return this.events;
  }

  getEventImage(event: Event) {
    return event.images.find(img => img.ratio === '16_9');
  }
}
