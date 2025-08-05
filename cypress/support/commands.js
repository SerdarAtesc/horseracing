Cypress.Commands.add('startRaceAndWait', () => {
  cy.contains('Generate Schedule').click()
  cy.contains('Start Tournament').click()
  cy.get('.race-results', { timeout: 15000 }).should('be.visible')
  
  cy.get('.round-header').first().click()
  cy.get('.result-row').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('checkHorseCard', (horseNumber) => {
  cy.get('.horse-card').eq(horseNumber - 1).within(() => {
    cy.get('.horse-name').should('be.visible')
    cy.get('.horse-condition').should('be.visible')
    cy.get('.horse-avatar').should('be.visible')
  })
})

Cypress.Commands.add('verifyRaceResults', () => {
  cy.get('.round-header').each(($header) => {
    cy.wrap($header).click()
  })
  
  cy.get('.result-row').should('have.length.greaterThan', 0)
  
  cy.get('.result-row').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('.position').should('be.visible')
      cy.get('.horse-name').should('be.visible')
      cy.get('.time').should('match', /\d+\.\d{2}s/)
    })
  })
})
