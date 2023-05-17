class Account {
    Login() {
        // cy.session(
        // () => {
        cy.visit('http://localhost:3000/signin');
        cy.get("[type='text']").type("testing@sporty.com")
        cy.get("[type='password']").type("asdf")
        cy.intercept('POST', 'http://localhost:3001/api/login').as('register');
        cy.get("[type='submit']").click();
        cy.wait('@register')
        cy.get("[class*='error']").should('not.exist')
        // })
    }

    Register() {
        cy.visit('http://localhost:3000/signup');
        cy.get("[name='first_name']").type("Sporty")
        cy.get("[name='last_name']").type("Testing")
        cy.get("[name='email']").type("testing@sporty.com")
        cy.get("[name='password_one']").type("asdf")
        cy.get("[name='password_two']").type("asdf")
        cy.intercept('POST', 'http://localhost:3001/api/register').as('register');
        cy.get("[type='submit']").click();
        cy.wait('@register')
        cy.get("[class*='error']").should('not.exist')
    }
}

export default new Account();