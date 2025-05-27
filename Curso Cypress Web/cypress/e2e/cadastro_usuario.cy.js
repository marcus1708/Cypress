describe('Cadastro de Usuario - Web',()=>{
    it('Realiza o cadastro de Usuario',()=>{
      cy.fixture("usuario").then(function(usuario){
        const user = usuario.criar
        cy.visit('/login')
        cy.contains('Cadastre-se').click()
        cy.get('#nome').type(user.nome)
        cy.get('#email').type(user.email)
        cy.get('#password').type(user.password)
        cy.get('#administrador').check()
        cy.get('[data-testid="cadastrar"]').click()
      })
    })
    it('Listar usuarios',()=>{
        cy.visit('/admin/home')
        cy.contains('Listar Usuários').click()
    })
})