describe('API do Serverest',()=>{
    it('Criar Usuario',()=>{
        cy.request({
            method:'POST',
            url:'https://serverest.dev/usuarios',
            body:{
                "nome": "Automação Cypress",
                "email": "teste@qa.com",
                "password": "teste",
                "administrador": "true"
              }
        }).then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('id',response.body._id)
        })
    })
})