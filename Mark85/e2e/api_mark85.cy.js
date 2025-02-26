const user = {"name": "marcus souza","email": "marcus@qa.com","password": "000000"}
const no_name = {"email": "marcus@qa.com","password": "000000"}
const no_email = {"name": "marcus souza","password": "000000"}
const no_passw = {"name": "marcus souza","email": "marcus@qa.com"}

describe('API Mark85 - Usuário e Session',()=>{
    it('Cria usuário',()=>{ 
      cy.task('deleteUser', user.email)
      cy.fixture('users').then(function(users){
        const user = users.login
        cy.Criar_Usuário(user)
        }).then((response)=>{
            expect(response.status).to.eq(200)
            Cypress.env('id_user',response.body._id)})      
    })
    it('Teste de Falha - Usuário ja cadastrado',()=>{
      cy.fixture('users.json').then(function(users){
        const user = users.login  
        cy.Criar_Usuário(user)    
        }).then((response)=>{
            expect(response.status).to.eq(409)
            expect(response.body.message).to.eq('Duplicated email!')})        
    })        
    it('Teste de Falha - Sem nome',()=>{
        cy.fixture('users.json').then(function(users){
            const user = users.no_name
            cy.Criar_Usuário(user)
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('ValidationError: \"name\" is required')})
    })
    it('Teste de Falha - Sem email',()=>{
        cy.fixture('users.json').then(function(users){
            const user = users.no_email
            cy.Criar_Usuário(user)
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('ValidationError: \"email\" is required')})
    })
    it('Teste de Falha - Sem senha',()=>{
        cy.fixture('users.json').then(function(users){
            const user = users.no_passw
            cy.Criar_Usuário(user)
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('ValidationError: \"password\" is required')})
    })
    it('User Session',()=>{
       cy.fixture('users.json').then(function(users){
        const userData = users.login
        cy.User_Session(userData)
        .then(response =>{
            const {user,token} = response.body
            expect(response.status).to.eq(200)
            expect(user.name).to.eq(userData.name)
            expect(user.email).to.eq(userData.email)
            expect(token).not.to.be.empty
            Cypress.env('token',response.body.token)})
       })     
    })
    it('Teste de Falha - User Session - Senha inválida',()=>{
      cy.fixture('users.json').then(function(users){
        const user = users.inv_passw
        cy.User_Session(user)
        .then(response =>{
            expect(response.status).to.eq(401)})
      })      
    })
    it('Teste de Falha - User Session - Email não encontrado',()=>{
      cy.fixture('users.json').then(function(users){
        const user = users.inv_email
        cy.User_Session(user)
        .then(response =>{
            expect(response.status).to.eq(401)})
      })  
    })
})
