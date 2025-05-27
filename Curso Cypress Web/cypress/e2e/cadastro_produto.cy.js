describe('Login do usuario',()=>{
    beforeEach(()=>{
       cy.session('usuario',()=>{ 
        cy.fixture("usuario").then(function(usuario){
            const user = usuario.criar
           cy.Login(user)
        })  
       }) 
    })
    it.skip('Cadastro de Produto',()=>{
       cy.fixture("produto").then(function(produto){
        const prod = produto.criar
        cy.visit('/admin/home')
        cy.contains('Cadastrar Produtos').click()
        cy.get('#nome').type(prod.nome)
        cy.get('#price').type(prod.preco)
        cy.get('#description').type(prod.descricao)
        cy.get('#quantity').type(prod.quantidade)
        cy.get('#imagem').as('fileInput').attachFile('star.jpeg')
        cy.contains("button",'Cadastrar').click()
      })
    })
    it('Listar Produto',()=>{
        cy.visit('/admin/home')
        cy.contains('Listar Produtos').click()
        cy.contains('Lista dos Produtos').should('be.visible')
        cy.contains('Cafe').should('be.visible')
        cy.contains('Cafe frapucchino').should('exist')
    })
    it.skip('Listar Produto',()=>{
        cy.visit('/admin/home')
        cy.intercept('GET','https://serverest.dev/produtos',{statusCode: 200}).as('ListaProd')
        cy.contains('Listar Produtos').click()
        cy.wait('@ListaProd')
    })
})