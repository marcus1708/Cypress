describe('API Mark85 - Tasks',()=>{

    it('Cria uma Task',()=>{
      cy.fixture('tasks.json').then(function(tasks){
      const user = tasks.create.user
      const task = tasks.create.task  
      cy.task('deleteUser', user.email)

        cy.Criar_Usuário(user)

        cy.User_Session(user)
          .then(response =>{
            expect(response.status).to.eq(201)
            Cypress.env('token',response.body.token)})
        
        cy.task('deleteTask', task.name, user.email)

        cy.Criar_Tasks(task)
          .then((response)=>{
           expect(response.status).to.eq(200)
           expect(response.body.name).to.eq(task.name)
           expect(response.body.tags[0]).to.eq(task.tags[0])
           expect(response.body.tags[1]).to.eq(task.tags[1])
           expect(response.body.tags[2]).to.eq(task.tags[2])
           expect(response.body._id.length).to.eq(24)})
      })
    })
    it('Teste de Falha - Cria uma Task já existente',()=>{
      cy.fixture('tasks').then(function(tasks){
      const user = tasks.create.user
      const task = tasks.create.task  
      cy.task('deleteUser', user.email)

        cy.Criar_Usuário(user)

        cy.User_Session(user)
          .then(response =>{
            expect(response.status).to.eq(200)
            Cypress.env('token',response.body.token)})
        
        cy.task('deleteTask', task.name, user.email)
      
        cy.Criar_Tasks(task)
          .then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq(task.name)
            expect(response.body.tags[0]).to.eq(task.tags[0])
            expect(response.body.tags[1]).to.eq(task.tags[1])
            expect(response.body.tags[2]).to.eq(task.tags[2])
            expect(response.body._id.length).to.eq(24)})
        })    
        cy.fixture('tasks').then(function(tasks){
              //const user = tasks.dup.user
          const task = tasks.dup.task  
        cy.Criar_Tasks(task)
          .then((response)=>{
            expect(response.status).to.eq(409)
            expect(response.body.message).to.eq('Duplicated task!')})

      })
    })
    it('Busca uma Task ',()=>{
      cy.fixture('get_tasks').then(function(list){
        cy.Buscar_Tasks()
        .then((response)=>{
          expect(response.status).to.eq(200)
        }).its('body')
            .should('be.an','array')
            .and('have.length', 1)
        })
      })
})    
