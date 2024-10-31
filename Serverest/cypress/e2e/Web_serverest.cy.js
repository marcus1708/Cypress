import { faker } from '@faker-js/faker';
describe('Web - Serverest - Cadastro de usuário', () => {
    it('Visita a Home', () => {
        cy.visit('https://front.serverest.dev/login')
        cy.contains('Login').should('be.visible')
    })
    it('Cadastra um novo usuário', () => {
        cy.Cadastra_Usuario()
    })
    it('Teste de Falha - Cadastro de um usuário já cadastrado antes', () => {
        cy.Cadastra_Usuario_inv()
    })
})
describe('Web Serverest - Usuário e Produtos', () => {
    beforeEach(() =>{
        cy.session('usuario',() => {
            cy.Login()
        })
    })
    it('Listar Usuário', () => {
        cy.Lista_Usuario()
    })    
    it.only('Cadastrar Produtos', () => {
        cy.Cadastrar_Produtos()
    })
    it('Listar Produtos', () => {
        cy.Listar_Produtos()
    })
    it('Relatórios', () => {
        cy.Relatórios()
    })
    it('Excluir Produto', () => {
        cy.Excluir_Produto()
    })
    it('Excluir Usuário', () => {
        cy.Excluir_Usuário()
    })
})
