import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HalResource } from 'hal-types';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  get(
    city?: string,
    startDateTime?: Date,
    endDateTime?: Date
  ): Observable<HalResource> {

    let urlSearchParams = new URLSearchParams({
      apikey: environment.ticketmaterApiKey,
      locale: '*',
    });

    city = [null, undefined, ''].includes(city) ? environment.defaultCity : city;

    const filters = [
      ['city', city],
      ['startDateTime', startDateTime ? moment(startDateTime).format() : undefined],
      ['endDateTime', endDateTime ? moment(endDateTime).format() : undefined]
    ];
    
    filters.forEach((f: Array<any>) => {
      const [filter, value] = f;
      if ([null, undefined, ''].includes(value)) {
        return;
      }
      urlSearchParams.append(filter, value);
    });

    const paramString = urlSearchParams.toString();
    const endpoint = `https://app.ticketmaster.com/discovery/v2/events?${paramString}`;

    return this.http.get<HalResource>(endpoint);
  }
}
