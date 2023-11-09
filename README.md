# EventTickets

## Getting started

1. Run `npm i` to install the packages.
2. Copy `src/environments/environment.ts` to `src/environments/environment.development.ts` and within this file update `ticketmasterApiKey`. And update `defaultCity` if you like too.
3. Then run the dev server with `ng serve --open`.

## Build

1. Copy `src/environments/environment.ts` to `src/environments/environment.production.ts` and within this file update `ticketmasterApiKey`.
2. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
3. Start a server for this directory `npx angular-http-server --open --path dist/event-tickets`.

## Running unit tests

1. Copy `src/environments/environment.ts` to `src/environments/environment.test.ts` and within this file update `ticketmasterApiKey`.
2. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
