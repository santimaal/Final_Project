import Account from "../page-objects/Account"
describe('reserve', () => {
  it('No User Logged', () => {
    cy.visit('http://localhost:3000/reserve')
    cy.get(".card-list").first().should('be.visible').click()
    cy.url().should('include', '/signup')
  })

  it('User Logged', () => {
    Account.Login()
    cy.visit('http://localhost:3000/profile');
    cy.get('.reserve-line').its('length').then((val) => {
      cy.visit('http://localhost:3000/reserve');
      cy.get(".card-list").first().should('be.visible').click()
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
      cy.log(tomorrowFormatted)
      cy.get("[name='fechavalue']:visible").first().then($input => {
        $input.val(tomorrowFormatted);
      });
      cy.get("select#time:visible").first().select(1);
      cy.get("button#modal-reserve-btn:visible").first().click();
      cy.get("[class*='success']").should('be.visible');
      cy.get(".header-profile").should('be.visible').click();
      cy.get('.reserve-line').its('length').should('equal', parseInt(val + 1))
    });
  })
})