describe('Event Tickets basics', () => {
  
  it('Fetch events initially', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://app.ticketmaster.com/discovery/v2/events?**',
      }
    ).as('eventsRequest');
    cy.visit('/');
    cy.wait('@eventsRequest');
    cy.contains('Events');
  })
  
  it('Update events when the City filter is changed', () => {
    cy.visit('/');
    const city = 'Melbourne';
    cy.get('[data-cy="city-input"]').type(city);
    cy.intercept(
      {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events?**&city=${city}`,
      }
    ).as('eventsRequest');
  })
  
  it('Update events when the Dates filter is changed', () => {
    
    cy.intercept(
      {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events?**`,
      }
    ).as('eventsRequest');

    cy.visit('/');

    cy.wait('@eventsRequest');
    
    cy.intercept(
      {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events?**&startDateTime=**&endDateTime=**`,
      }
    ).as('eventsDateRequest');

    // Toggle the Date
    cy.get('[data-cy="date-toggle"]').click();

    // Click on a Wed early in the month
    cy.get('[data-mat-col="3"][data-mat-row="1"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();

    // Click on a Wed near the end of the month
    cy.get('[data-mat-col="3"][data-mat-row="3"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();

    cy.wait('@eventsDateRequest');
  })
})
