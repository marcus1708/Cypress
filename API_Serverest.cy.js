describe('Automaçao API do ServeRest', () => {
    const token = `Bearer ${Cypress.env('ServeRest_access_token')}`
    let auth, id;
    it('POST - Cadastra usuário', () => {     
        cy.api({
          method: 'POST',
          url: 'https://serverest.dev/usuarios',
          body:{
              "nome": "QA",
              "email": "qa@qa.com",
              "password": "teste",
              "administrador": "true"
          }
        }).then((createUserResponse) => {
          id = createUserResponse.body._id;
          Cypress.env('Id', id); 
          expect(createUserResponse.status).to.eq(201)
          })
    }) 
    it('POST - Realiza Login', () => {
        cy.api({
          method: 'POST',
          url: 'https://serverest.dev/login',
          body:{
              "email": "qa@qa.com",
              "password": "teste"
          }
        }).then((response) => {
            expect(response.status).to.eq(200)})  
    })  
    it('GET - Busca usuário já cadastrado', () => {
        cy.api({
            method: 'GET',
            url: `https://serverest.dev/usuarios/${id}`,
        }).then((response) => {
           expect(response.status).to.eq(200)})   
    })
    it('DELETE - Exclui usuário', () => {
        cy.api({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${id}`,
        }).then((response) => {
            expect(response.status).to.eq(200)})   
    })
})
