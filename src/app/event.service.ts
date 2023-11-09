import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HalResource } from 'hal-types';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<HalResource> {

    let urlSearchParams = new URLSearchParams({
      apikey: environment.ticketmaterApiKey,
      locale: '*',
    });

    const paramString = urlSearchParams.toString();
    const endpoint = `https://app.ticketmaster.com/discovery/v2/events?${paramString}`;

    return this.http.get<HalResource>(endpoint);
  }
}
