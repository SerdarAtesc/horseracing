declare namespace Cypress {
  interface Chainable {
    startRaceAndWait(): Chainable<void>
    checkHorseCard(horseNumber: number): Chainable<void>
    verifyRaceResults(): Chainable<void>
  }
}