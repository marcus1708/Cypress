import { faker } from '@faker-js/faker';
describe.skip('Web - Serverest - Cadastro de usuário', () => {
    it('Visita a Home', () => {
        cy.visit('https://front.serverest.dev/login')
        cy.contains('Login').should('be.visible')
    })
    it('Cadastra um novo usuário', () => {
        cy.Cadastra_Usuario()
    })
    it('Teste de Falha - Cadastro de um usuário (com intercept)', () => {
        cy.Cadastra_Usuario_intercept()
    })
    it('Teste de Falha - Cadastro de um usuário', () => {
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
    it('Listar Usuário (com intercept)', () => {
        cy.Lista_Usuario_intercept()
    }) 
    it('Cadastrar Produtos', () => {
        cy.Cadastrar_Produtos()
    })
    it('Listar Produtos (com intercept)', () => {
        cy.Listar_Produtos_intercept()
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
        cy.log("Não é possível excluir o proprio usuário")
    })
    it('Excluir Usuário (com intercept)', () => {
        cy.Excluir_Usuário_intercept()
        cy.log("Não é possível excluir o proprio usuário")
    })
})
