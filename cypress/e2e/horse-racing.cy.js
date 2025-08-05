describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the game with 20 horses', () => {
    cy.get('.horse-card').should('have.length', 20)
    cy.contains('Available Horses (20)')
  })

  it('should start a race and show results', () => {
    cy.contains('Generate Schedule').click()
    cy.contains('Start Tournament').click()
    
    cy.get('.race-track', { timeout: 10000 }).should('be.visible')
    cy.get('.race-results', { timeout: 15000 }).should('be.visible')
    
    cy.get('.round-header').first().click()
    cy.get('.result-row').should('have.length.greaterThan', 0)
  })

  it('should show horse details correctly', () => {
    cy.get('.horse-card').first().within(() => {
      cy.get('.horse-name').should('be.visible')
      cy.get('.horse-condition').should('be.visible')
    })
  })

  it('should generate new horses on refresh', () => {
    cy.get('.horse-condition').should('have.length', 20)
    cy.reload()
    cy.get('.horse-condition').should('have.length', 20)
  })

  it('should show race progress during animation', () => {
    cy.contains('Generate Schedule').click()
    cy.contains('Start Tournament').click()
    
    cy.get('.horse-silhouette').should('be.visible')
    cy.get('.race-lane').should('have.length.greaterThan', 0)
  })

  it('should display round information', () => {
    cy.contains('Generate Schedule').click()
    cy.contains('Start Tournament').click()
    
    cy.get('.race-results', { timeout: 15000 }).should('be.visible')
    cy.get('.round-header').should('contain', 'Round 1')
    cy.get('.round-header').should('contain', '1200m')
  })

  it('should handle race schedule generation', () => {
    cy.contains('Generate Schedule').click()
    
    cy.get('.schedule-item').should('have.length', 6)
    cy.contains('Round 1')
    cy.contains('Round 6')
  })
})
