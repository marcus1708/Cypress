Cypress.Commands.add('Login',(user)=>{
    cy.visit('/login')
    cy.get('#email').type(user.email)
    cy.get('#password').type(user.password)
    cy.contains('Entrar').click()
    cy.contains('Este é seu sistema para administrar seu ecommerce.').should('be.visible')
    cy.contains('Home').should('be.visible')
})
