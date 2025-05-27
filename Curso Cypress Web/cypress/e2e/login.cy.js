describe('Login do usuario',()=>{
    beforeEach(()=>{
       cy.session('usuario',()=>{ 
        cy.fixture("usuario").then(function(usuario){
            const user = usuario.criar
           cy.Login(user)
        })  
       }) 
    })
    it('Listar usuarios',()=>{
        cy.visit('/admin/home')
        cy.contains('Listar Usuários').click()
    })
})