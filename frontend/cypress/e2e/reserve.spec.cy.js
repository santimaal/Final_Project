import Account from "../page-objects/Account"
describe('reserve', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/ureserves").as('getReservesByUser')
    cy.intercept('POST', "http://localhost:3001/api/reserves/*").as('getReserves')
  })

  it('No User Logged', () => {
    cy.visit('http://localhost:3000/reserve')
    cy.get(".card-list").first().should('be.visible').click()
    cy.url().should('include', '/signup')
  })

  it('User Logged', () => {
    Account.Login()
    cy.visit('http://localhost:3000/profile');
    cy.wait('@getReservesByUser').wait(500);
    cy.get("#reserve-table").then(($table) => {
      return ($table.find(".reserve-line").length)
    }).then((val) => {
      cy.visit('http://localhost:3000/reserve');
      cy.get(".card-list").first().should('be.visible').click()
      cy.get("[name='fechavalue']:visible").first().then(() => {
        cy.get("[name='fechavalue']:visible").first().type(tomorrowFormatted)
        cy.wait('@getReserves').wait(500);
      });
      cy.get("select#time:visible").first().select(1).then(() => {
        cy.get("button#modal-reserve-btn:visible").first().click();
      });
      cy.get("[class*='success']").should('be.visible');
      cy.visit('http://localhost:3000/profile');
      cy.get('.reserve-line').its('length').should('equal', parseInt(val + 1))
    });
  });
});