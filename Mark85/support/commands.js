Cypress.Commands.add('Criar_Usuário',(user)=>{
    cy.api({
        method:'POST',
        url:'http://localhost:3333/users',
        body:user,
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('User_Session',(user)=>{
    cy.api({
        method:'POST',
        url:'http://localhost:3333/sessions',
        body:{email: user.email,password: user.password},
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('Criar_Tasks',(task)=>{
    cy.api({
        method:'POST',
        url:'http://localhost:3333/tasks',
        body:task,
        failOnStatusCode: false,
        headers:{Authorization: Cypress.env('token')}
    }).then(response => {return response})
})
Cypress.Commands.add('Buscar_Tasks',()=>{
    cy.api({
        method:'GET',
        url:'http://localhost:3333/tasks',
        failOnStatusCode: false,
        headers:{Authorization: Cypress.env('token')}
    }).then(response => {return response})
})
