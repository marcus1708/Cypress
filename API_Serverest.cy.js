const login = require('../fixtures/login.json')
const cria_usuario = require('../fixtures/cria_usuario.json')
const atual_usuario = require('../fixtures/atual_usuario.json')
const cria_produto = require('../fixtures/cria_produto.json')
const atual_produto = require('../fixtures/atual_produto.json')

describe('API do Serverest', () =>{
    let id;
    let id_p;
    let id_c;
    
    it('Cadastra Usuário', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body:cria_usuario
            }).then((response) => {
                expect(response.status).to.eq(201);
                Cypress.env('id', response.body._id);
                console.log(Cypress.env('id'))});
    })
    it('Realiza Login', () => {
        cy.api({
          method: 'POST',
          url: 'http://localhost:3000/login',
          body:login
        }).then(function(response){
            expect(response.status).to.eq(200);
            Cypress.env('token', response.body.authorization);
            console.log(Cypress.env('token'));
        });
    })        
    it('Cadastra Produtos', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            body:cria_produto,
            headers: {
                authorization: Cypress.env('token')
            }
            }).then((response) => {
                expect(response.status).to.eq(201);
                Cypress.env('id_p', response.body._id);});
    })
    it('Busca Usuário Lista', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/usuarios'
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Busca Usuário ID', () => {
        cy.api({
            method: 'GET',
            url: `http://localhost:3000/usuarios/${Cypress.env('id')}`
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Busca Produto Lista', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/produtos'
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Busca Produtos ID', () => {
        cy.api({
            method: 'GET',
            url: `http://localhost:3000/produtos/${Cypress.env('id_p')}`
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Atualiza Usuário', () => {
        cy.api({
            method: 'PUT',
            url: `http://localhost:3000/usuarios/${Cypress.env('id')}`,
            body: atual_usuario,
            headers: {
                authorization: Cypress.env('token')
            }
            }).then((response) => {
                expect(response.status).to.eq(200);});
    })
    it('Atualiza Produtos', () => {
        cy.api({
            method: 'PUT',
            url: `http://localhost:3000/produtos/${Cypress.env('id_p')}`,
            body: atual_produto,
            headers: {
                authorization: Cypress.env('token')
            }
            }).then((response) => {
                expect(response.status).to.eq(200);});
    })
    it('Cadastra Carrinho', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:3000/carrinhos',
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
                Cypress.env('id_c', response.body._id);});
    })
    it('Busca Carrinho Lista', () => {
        cy.api({
            method: 'GET',
            url: 'http://localhost:3000/carrinhos'
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Busca Carrinho ID', () => {
        cy.api({
            method: 'GET',
            url: `http://localhost:3000/carrinhos/${Cypress.env('id_c')}`
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Exclui Carrinho', () => {
        cy.api({
            method: 'DELETE',
            url: 'http://localhost:3000/carrinhos/cancelar-compra/',
            headers: {
                authorization: Cypress.env('token')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Exclui Produtos', () => {
        cy.api({
            method: 'DELETE',
            url: `http://localhost:3000/produtos/${Cypress.env('id_p')}`,
            headers: {
                authorization: Cypress.env('token')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
    it('Exclui Usuário', () => {
        cy.api({
            method: 'DELETE',
            url: `http://localhost:3000/usuarios/${Cypress.env('id')}`
        }).then((response) => {
            expect(response.status).to.eq(200);});
    })
})
