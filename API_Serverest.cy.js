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
        cy.cad_user(cria_usuario,Cypress.env('id'))
    })
    it('Realiza Login', () => {
        cy.login(login,Cypress.env('token'))
    })        
    it('Cadastra Produtos', () => {
        cy.cad_prod(cria_produto,Cypress.env('id_p'))
    })
    it('Busca Usuário Lista', () => {
        cy.busc_user()
    })
    it('Busca Usuário ID', () => {
        cy.busc_user_id(Cypress.env('id'))
    })
    it('Busca Produto Lista', () => {
        cy.busc_prod()
    })
    it('Busca Produtos ID', () => {
        cy.busc_prod_id(Cypress.env('id_p'))
    })
    it('Atualiza Usuário', () => {
        cy.atual_user(atual_usuario,Cypress.env('token'),Cypress.env('id'))
    })
    it('Atualiza Produtos', () => {
        cy.atual_prod(atual_produto,Cypress.env('token'),Cypress.env('id_p'))
    })
    it('Cadastra Carrinho', () => {
        cy.cad_carr(Cypress.env('id_p'),Cypress.env('token'),Cypress.env('id_c'))
    })
    it('Busca Carrinho Lista', () => {
        cy.list_carr()
    })
    it('Busca Carrinho ID', () => {
        cy.carr_id(Cypress.env('id_c'))
    })
    it('Exclui Carrinho', () => {
        cy.del_carr(Cypress.env('token'))
    })
    it('Exclui Produtos', () => {
        cy.del_prod(Cypress.env('id_p'))
    })
    it('Exclui Usuário', () => {
        cy.del_user(Cypress.env('id'))
    })
})
