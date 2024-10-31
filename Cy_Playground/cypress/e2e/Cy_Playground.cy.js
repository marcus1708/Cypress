describe('Web - Cypress Playground', () => {
    beforeEach('cy.click()', () => {
        const now = new Date(2024, 9, 31)//formato: ano/mes/dia, onde 0 - Janeiro, 1 - Fevereiro...
        cy.clock(now)
        cy.visit('/index.html')
    })
    it('cy.click()', () => {

        cy.log("CLICANDO PELO GET")
        cy.get('#click > button').click()

        cy.log("CLICANDO PELO CONTAINS")
        cy.contains("Subscribe").click()
        cy.contains("You've been successfully subscribed to our newsletter.").should('be.visible')
    })
    it('.type()', () => {
        cy.get('#signature-textarea').type('Este é um teste automatizado para validar o type')
    })
    it('.check() and uncheck()', () => {
        cy.get('#signature-textarea-with-checkbox').type('Este é um teste automatizado para validar o check e uncheck')
        cy.get('#signature-checkbox').check()
        cy.get('#signature-checkbox').should('be.checked')
        cy.get('#signature-checkbox').uncheck()
        cy.get('#signature-checkbox').should('not.be.checked')
    })
    it('radio-button', () => {
        cy.get('#on').check()
        cy.get('#on').should('be.checked')
        cy.contains("ON").should('be.visible')
        cy.get('#off').check()
        cy.get('#off').should('be.checked')
        cy.contains("OFF").should('be.visible')        
    })
    it('Select List', () => {
        cy.get('#selection-type').select('Basic')
        cy.contains("Basic").should('be.visible')

        cy.get('#selection-type').select('Standard')
        cy.contains("Standard").should('be.visible')

        cy.get('#selection-type').select('VIP')
        cy.contains("VIP").should('be.visible')
    })
    it('Select Box', () => {
        cy.get('[value="apple"]').click()
        cy.get('[value="banana"]').click()
        cy.get('[value="cherry"]').click()
        cy.get('[value="date"]').click()
        cy.get('[value="elderberry"]').click()
    })
    it('Input File', () => {
        //cy.get('#file-upload').as('fileInput').attachFile('texto.txt')
        cy.get('#file-upload').selectFile('texto.txt')
        cy.contains("texto.txt").should('be.visible')
    })
    it('cy.intercept()', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { statusCode: 200 }).as('getTodo')
        cy.contains('button', 'Get TODO').click()
        cy.wait('@getTodo')     
    })
    it('cy.intercept() - Simulando uma Falha no Servidor', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { statusCode: 500 }).as('serverFailure')
        cy.contains('button', 'Get TODO').click()
        cy.wait('@serverFailure')
          .its('response.statusCode')
          .should('be.equal', 500)
    })
    it('cy.intercept() - Simulando uma Falha de API', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { forceNetworkError: true }).as('networkError')
        cy.contains('button', 'Get TODO').click()
        cy.wait('@networkError')
        cy.contains('.error', "Oops, something went wrong. Check your internet connection, refresh the page, and try again.").should('be.visible')
    })
    it('cy.request()', () => {
        cy.api('GET', 'https://jsonplaceholder.typicode.com/todos/1')
          .its('status')
          .should('be.equal', 200)
    })
    it('.invoke().trigger()', () => {
        cy.get('input[type="range"]').invoke('val', 4).trigger('level')
    })
    it('.type("yyyy-mm-dd").blur()', () => {
        cy.get('input[type="date"]').type('2024-01-16').blur()
        cy.contains("2024-01-16").should('be.visible')
    })
    it('Cypress.env("secret")', () => {
        cy.get('#password')
          .type(Cypress.env('senha'))
        cy.get('#show-password-checkbox').check()
    })
    it('.should("have.length", n)', () => {
        cy.get('ul li').should('have.length', 5)
    })
    it('cy.clock()', () => {
        cy.contains('p', '2024-10-31').should('be.visible')
    })
    it('.then()', () => {
        cy.get('#timestamp')
          .then(element => {
          const value = element[0].innerText
          cy.get('#code').type(value)})
    })
    it('cy.readFile()', () => {
        cy.contains('a', 'Download a text file').click()
        cy.readFile('cypress/downloads/example.txt')
          .should('be.equal', 'Hello, World!')
    })
})
