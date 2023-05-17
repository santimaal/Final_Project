import Account from "../page-objects/Account"
describe('reserve', () => {
  it('No User Logged', () => {
    cy.visit('http://localhost:3000/reserve')

  })

  it('User Logged', () => {
    Account.Login()
    cy.visit('http://localhost:3000/reserve');
    cy.get(".header-profile").should('be.visible')
    cy.get(".card-list").first().should('be.visible').click()
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    cy.log(tomorrowFormatted)
    cy.get("[name='fechavalue']").first().then($input => {
      $input.val(tomorrowFormatted);
    });
  })
})