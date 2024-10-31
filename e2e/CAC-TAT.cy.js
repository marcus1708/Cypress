describe('Central de atendimento ao Cliente TAT', function(){
 beforeEach(function() {
    cy.visit('./src/index.html')
 }) 
    it('verifica o titulo da aplicaçao', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Exe 01 - Teste mensagem de sucesso', function() {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('marcus.souza@teste.com')
        cy.get('#open-text-area').type('Bom')
        cy.get('button[type="submit"]').click()
    })
    it('Exe 02 - Teste mensagem de campo obrigatório', function() {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Souza')
        cy.get('#open-text-area').type('Bom')
        cy.get('    button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('Exe 03 - Validar telefone', function() {
        cy.get('#phone').type('abcd').should('have.value', '')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('Exe 04 - Campo telefone vazio', function() {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('marcus.souza@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Bom')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })  
    it('Exe 05 - Limpa campos', function() {
        cy.get('#firstName').type('Marcus')
        .clear()
    })  
    it('Exe 06 - Campos obrigatorios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })    
    it('Exe 07 - Envia formulario - Comandos customizados', function() { 
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
        //cy.get('#open-text-area').type('Bom')
        //cy.get('.success').should('be.visible')
    })
    it('Exe 08 - Usar Contains - Comandos customizados', function() { 
        cy.get('#phone-checkbox')
        cy.contains('button', 'Enviar').click()
    })
    it('Exe 09 - Seleciona um produto (Youtube) por seu texto', function() { 
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('Exe 10 - Seleciona um produto (Mentoria) por seu texto', function() { 
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })
    it('Exe 11 - Seleciona um produto (Blog) por seu texto', function() { 
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
    it('Exe 12 - Seleciona um radio button - Feedback', function() { 
        cy.get('input[type="radio"][value="feedback"]')
          .each(function($radio){
           cy.wrap($radio).check()
           cy.wrap($radio).should('be.checked')
          })   
    })
    it('Exe 13 - Marca ambos os checkboxes, depois desmarca o ultimo', function() { 
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })
    it('Exe 14 - Exibe msg de erro quando telefone é obrigatorio porem nao esta preenchido', function() {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('marcus.souza@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Bom')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')   
    })
    it('Exe 15 - Seleciona um arquivo da pasta Fixtures', function() { 
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('Exe 16 - Seleciona um arquivo simulando um drag and drop', function() { 
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('Exe 33 - Verifica que a politica de privac. abre em outra pagina sem clicar', function() { 
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
    })
})
