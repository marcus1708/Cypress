Cypress.Commands.add('cad_user', (user)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body:user,
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('login', (login_user)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode: false,
        body:login_user
    }).then(response => {return response})
})
Cypress.Commands.add('cad_prod', (cria_prod)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        body:cria_prod,
        headers: {
            authorization: Cypress.env('token')
        },
        failOnStatusCode: false,
    }).then(response => {return response})
})
Cypress.Commands.add('busc_user', (cod_user)=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/usuarios/' + cod_user,
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('busc_prod', (cod_prod)=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/produtos/'+ cod_prod,
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('atual_user', (atu_user,cod_user)=>{
    cy.api({
        method: 'PUT',
        url: 'https://serverest.dev/usuarios/'+ cod_user,
        body: atu_user,
        headers: {
            authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('atual_prod', (atu_prod,cod_prod)=>{
    cy.api({
        method: 'PUT',
        url: 'https://serverest.dev/produtos/'+ cod_prod,
        body: atu_prod,
        failOnStatusCode: false,
        headers: {
            authorization: Cypress.env('token')
        }
    }).then(response => {return response})
})
Cypress.Commands.add('cad_carr', (token)=>{
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        body:{"produtos":[{"idProduto": Cypress.env('id_p'),"quantidade": 1}]},
        headers: {authorization: token},
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('busc_carr', (cod_carr)=>{
    cy.api({
        method: 'GET',
        url: 'https://serverest.dev/carrinhos/'+cod_carr,
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('del_carr', (cod_carr,token)=>{
    cy.api({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/cancelar-compra/',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('del_prod', (cod_prod,token)=>{
    cy.api({
        method: 'DELETE',
        url: 'https://serverest.dev/produtos/'+ cod_prod,
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => {return response})
})
Cypress.Commands.add('del_user', (cod_user)=>{
    cy.api({
        method: 'DELETE',
        url: 'https://serverest.dev/usuarios/' + cod_user,
        failOnStatusCode: false,
    }).then(response => {return response})    
})



