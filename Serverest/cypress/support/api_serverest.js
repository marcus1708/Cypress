Cypress.Commands.add('cad_user', (cria_usuario)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body:cria_usuario
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('id', response.body._id);});
})
Cypress.Commands.add('cad_user_existente', (cria_usuario)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
        body:cria_usuario
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Este email já está sendo usado')});
})
Cypress.Commands.add('login', (login)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body:login
      }).then(function(response){
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq('Login realizado com sucesso')
          Cypress.env('token', response.body.authorization);});
})
Cypress.Commands.add('login_erro', (login_erro)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode: false,
        body:login_erro
      }).then(function(response){
          expect(response.status).to.eq(401);
          expect(response.body.message).to.eq('Email e/ou senha inválidos')
          });
})
Cypress.Commands.add('cad_prod', (cria_produto)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        body:cria_produto,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('id_p', response.body._id);});
})
Cypress.Commands.add('cad_prod_existente', (cria_produto)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        body:cria_produto,
        failOnStatusCode: false,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Já existe produto com esse nome')});
})
Cypress.Commands.add('busc_user', ()=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/usuarios'
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('busc_user_id', ()=>{
    cy.api({
        method: 'GET',
        url: `https://serverest.dev/usuarios/${Cypress.env('id')}`
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('busc_user_id_inv', ()=>{
    cy.api({
        method: 'GET',
        url: `https://serverest.dev/usuarios/12345`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);});
})
Cypress.Commands.add('busc_prod', ()=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/produtos'
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('busc_prod_id', ()=>{
    cy.api({
        method: 'GET',
        url: `https://serverest.dev/produtos/${Cypress.env('id_p')}`
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('busc_prod_id_inv', ()=>{
    cy.api({
        method: 'GET',
        failOnStatusCode: false,
        url: `https://serverest.dev/produtos/123456`
    }).then((response) => {
        expect(response.status).to.eq(400);});
})
Cypress.Commands.add('atual_user', (atual_usuario)=>{
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/usuarios/${Cypress.env('id')}`,
        body: atual_usuario,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso');});
})
Cypress.Commands.add('atual_user_inv', (atual_usuario)=>{
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/usuarios/12345`,
        body: atual_usuario,
        failOnStatusCode: false,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Este email já está sendo usado');});
})
Cypress.Commands.add('atual_user_inv_2', (atual_usuario_inv)=>{
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/usuarios/11`,
        body: atual_usuario_inv,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('idinv', response.body._id);});
})
Cypress.Commands.add('del_user_inv_3', ()=>{
    cy.api({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${Cypress.env('idinv')}`
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso');});
})
Cypress.Commands.add('atual_prod', (atual_produto)=>{
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${Cypress.env('id_p')}`,
        body: atual_produto,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(200);});
})
Cypress.Commands.add('atual_prod_inv', (atual_produto)=>{
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/produtos/12345`,
        body: atual_produto,
        failOnStatusCode: false,
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(400);});
})
Cypress.Commands.add('cad_carr', ()=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        body:{
            "produtos":[{   
                "idProduto": Cypress.env('id_p'),
                "quantidade": 1
            }]
        },
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('id_c', response.body._id);});
})
Cypress.Commands.add('cad_carr_inv', ()=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        failOnStatusCode: false,
        body:{
            "produtos":[{   
                "idProduto": Cypress.env('id_p'),
                "quantidade": 1
            }]
        },
        headers: {
            authorization: Cypress.env('token')
        }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Não é permitido ter mais de 1 carrinho')});
})
Cypress.Commands.add('cad_carr_inv_2', ()=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        failOnStatusCode: false,
        body:{
            "produtos":[{   
                "idProduto": Cypress.env('id_p'),
                "quantidade": 1
            }]
        }
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')});
})
Cypress.Commands.add('list_carr', ()=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/carrinhos'
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('carr_id', ()=>{
    cy.api({
        method: 'GET',
        url: `https://serverest.dev/carrinhos/${Cypress.env('id_c')}`
    }).then((response) => {
        expect(response.status).to.eq(200);});
})
Cypress.Commands.add('carr_id_inv', ()=>{
    cy.api({
        method: 'GET',
        failOnStatusCode: false,
        url: `https://serverest.dev/carrinhos/123456`
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Carrinho não encontrado')
        });
})
Cypress.Commands.add('del_carr', ()=>{
    cy.api({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/cancelar-compra/',
        headers: {
            authorization: Cypress.env('token')
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')});
})
Cypress.Commands.add('del_prod', ()=>{
    cy.api({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${Cypress.env('id_p')}`,
        headers: {
            authorization: Cypress.env('token')
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso')});
})
Cypress.Commands.add('del_user', ()=>{
    cy.api({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${Cypress.env('id')}`
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso');});
})
Cypress.Commands.add('del_carr_inv', ()=>{
    cy.api({
        method: 'DELETE',
        failOnStatusCode: false,
        url: 'https://serverest.dev/carrinhos/cancelar-compra/',
        headers: {
            authorization: Cypress.env('token')
        }
    }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')});
})
Cypress.Commands.add('del_prod_inv', ()=>{
    cy.api({
        method: 'DELETE',
        failOnStatusCode: false,
        url: `https://serverest.dev/produtos/123456`,
        headers: {
            authorization: Cypress.env('token')
        }
    }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')});
})
Cypress.Commands.add('del_user_inv', ()=>{
    cy.api({
        method: 'DELETE',
        failOnStatusCode: false,
        url: `https://serverest.dev/usuarios/123456`
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Nenhum registro excluído')});
})
Cypress.Commands.add('del_user_inv_2', ()=>{
    cy.api({
        method: 'DELETE',
        failOnStatusCode: false,
        url: `https://serverest.dev/usuarios/0uxuPY0cbmQhpEz1`
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado')});
})
