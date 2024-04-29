describe('Automaçao API do ServeRest', () => {
    const token = `Bearer ${Cypress.env('ServeRest_access_token')}`
    let id;  
    it('POST - Cadastra usuário', () => {     
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body:{
            "nome": "MARCUS",
            "email": "qa@teste.com",
            "password": "teste",
            "administrador": "true"
        }
      }).then((createUserResponse) => {
        id = createUserResponse.body._id;
        Cypress.env('Id', id); 
        expect(createUserResponse.status).to.eq(201)
        })
    })
    it('GET - Busca usuário já cadastrado', () => {
        cy.request({
            method: 'GET',
            url: `https://serverest.dev/usuarios/${id}`
        }).then((response) => {
           expect(response.status).to.eq(200)})   
    })
    it('POST - Realiza Login', () => {
        cy.request({
          method: 'POST',
          url: 'https://serverest.dev/login',
          body:{
              "email": "qa@teste.com",
              "password": "teste"
          },headers: { token }
        }).then((response) => {
            expect(response.status).to.eq(200)})  
    })  
    it('DELETE - Exclui usuário', () => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${id}`,
        }).then((response) => {
            expect(response.status).to.eq(200)})   
    })
})
