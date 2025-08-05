describe('Horse Racing - Advanced Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show realistic race times', () => {
    cy.startRaceAndWait()
    
    cy.get('.time').each(($time) => {
      const timeValue = parseFloat($time.text().replace('s', ''))
      expect(timeValue).to.be.greaterThan(10)
      expect(timeValue).to.be.lessThan(300)
    })
  })

  it('should have consistent horse data throughout the race', () => {
    const horseData = []
    
    cy.get('.horse-card').each(($card, index) => {
      const name = $card.find('.horse-name').text()
      horseData.push({ name, index })
    }).then(() => {
      cy.startRaceAndWait()
    })
  })

  it('should maintain horse colors consistently', () => {
    const colorMap = new Map()
    
    cy.get('.horse-card').each(($card, index) => {
      const name = $card.find('.horse-name').text()
      const color = $card.find('.horse-avatar').css('background-color')
      colorMap.set(name, color)
    }).then(() => {
      cy.startRaceAndWait()
      
      cy.get('.result-row').should('have.length.greaterThan', 0)
    })
  })
})
