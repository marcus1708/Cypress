describe('API do Serverest', () =>{
    it('Cadastra Usuário', () => {
      cy.fixture('usuario').then(function(usuario){
        const user = usuario.cria_usuario
        cy.cad_user(user)
      }).then((response)=>{
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          Cypress.env('id', response.body._id)})
      
    })
    it('Teste de Falha - Cadastra Usuário já existente', () => {
      cy.fixture('usuario').then(function(usuario){ 
        const user = usuario.cria_usuario
        cy.cad_user(user)
      }).then((response)=>{
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Este email já está sendo usado')})    
    })
    it('Realiza Login', () => {
      cy.fixture('login').then(function(login){ 
        const login_user = login.login_ok
        cy.login(login_user)
      }).then((response)=>{
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Login realizado com sucesso')
          Cypress.env('token', response.body.authorization)})    
    }) 
    it('Realiza Login -Email ou senha inválido', () => {
      cy.fixture('login').then(function(login){ 
        const login_user = login.login_erro
        cy.login(login_user)
        }).then((response)=>{
          expect(response.status).to.eq(401)
          expect(response.body.message).to.eq('Email e/ou senha inválidos')  
      })
    })         
    it('Busca Usuário Lista', () => {
        const cod_user = ''
        cy.busc_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(200)})    
    })
    it('Busca Usuário ID', () => {
        const cod_user = Cypress.env('id') 
        cy.busc_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(200)}) 
    })
    it('Teste de Falha - Busca Usuário ID inválido', () => {
        const cod_user = '1234' 
        cy.busc_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(400)})
    })
    it('Atualiza Usuário', () => {
      cy.fixture('usuario').then(function(usuario){  
        const atu_user = usuario.atual_usuario   
        const cod_user = Cypress.env('id')  
        cy.atual_user(atu_user,cod_user)
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro alterado com sucesso')})  
    })
    it('Teste de Falha - Atualiza Usuário com ID inexistente', () => {
      cy.fixture('usuario').then(function(usuario){  
        const atu_user = usuario.atual_usuario   
        const cod_user = '123'  
        cy.atual_user(atu_user,cod_user)
      }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Este email já está sendo usado')})
    })
    it('Teste de Falha - Atualiza Usuário inválido', () => {
      cy.fixture('usuario').then(function(usuario){  
        const atu_user = usuario.atual_usuario   
        const cod_user = '123'  
        cy.atual_user(atu_user,cod_user)
          .then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Este email já está sendo usado')})
      })  
    })
    it('Cadastra Produtos', () => {
      cy.fixture('produto').then(function(produto){  
        const cria_prod = produto.cria_produto
        cy.cad_prod(cria_prod)
      }).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          Cypress.env('id_p', response.body._id)})      
    })
    it('Teste de Falha - Cadastra Produto já existente', () => {
      cy.fixture('produto').then(function(produto){  
          const cria_prod = produto.cria_produto
          cy.cad_prod(cria_prod)
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Já existe produto com esse nome')})       
    })
    it('Busca Produtos Lista', () => {
        const cod_prod = '' 
        cy.busc_prod(cod_prod)
          .then((response) => {
          expect(response.status).to.eq(200)})
    })
    it('Busca Produto ID', () => {
        const cod_prod = Cypress.env('id_p')  
        cy.busc_prod(cod_prod)
          .then((response) => {
          expect(response.status).to.eq(200)})
    })
    it('Teste de Falha - Busca Produto ID inválido', () => {
        const cod_prod = '1234'  
        cy.busc_prod(cod_prod)
          .then((response) => {
          expect(response.status).to.eq(400)})
    })
    it('Atualiza Produto', () => {
      cy.fixture('produto').then(function(produto){  
        const atu_prod = produto.atual_produto
        const cod_prod = Cypress.env('id_p')       
        cy.atual_prod(atu_prod,cod_prod)
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro alterado com sucesso')})
    })
    it('Teste de Falha - Atualiza Produto inválido', () => {
      cy.fixture('produto').then(function(produto){  
        const atu_prod = produto.atual_produto
        const cod_prod = '1234'       
        cy.atual_prod(atu_prod,cod_prod)
      }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Já existe produto com esse nome')})
    })
    it('Cadastra Carrinho', () => {    
        const token = Cypress.env('token')    
        cy.cad_carr(token)
          .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          Cypress.env('id_c', response.body._id)})
    })
    it('Teste de Falha - Cadastra Carrinho já existente', () => {
        const token = Cypress.env('token')  
        cy.cad_carr(token)
          .then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Não é permitido ter mais de 1 carrinho')})
    })
    it('Teste de Falha - Cadastro de Carrinho - Token Ausente', () => {
        const token = '' 
        cy.cad_carr(token)
          .then((response) => {
          expect(response.status).to.eq(401)
          expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')})
    })
    it('Busca Carrinho Lista', () => {
        const cod_carr = ''
        cy.busc_carr(cod_carr)
          .then((response) => {
          expect(response.status).to.eq(200)})
    })
    it('Busca Carrinho ID', () => {
        const cod_carr = Cypress.env('id_c')
        cy.busc_carr(cod_carr)
          .then((response) => {
          expect(response.status).to.eq(200)})
    })
    it('Teste de Falha - Busca Carrinho com ID inválido', () => {
        const cod_carr = '1234'
        cy.busc_carr(cod_carr)
          .then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Carrinho não encontrado')})
    })
    it('Teste de Falha - Exclui Produto com Carrinho cadastrado', () => {
        const cod_prod = Cypress.env('id_p')
        const token = Cypress.env('token')
        cy.del_prod(cod_prod,token)
          .then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Não é permitido excluir produto que faz parte de carrinho')
          cy.log(response.body.message)})
    })
    it('Teste de Falha - Excluir Usuário com carrinho cadastrado', () => {
        const cod_user = Cypress.env('id')
        cy.del_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado')
          expect(response.body.idCarrinho).to.eq(Cypress.env('id_c'))})
    })
    it('Exclui Carrinho', () => {
      const cod_carr = Cypress.env('id_c')
      const token = Cypress.env('token')
      cy.del_carr(cod_carr,token)
        .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')})
    })
    it('Teste de Falha - Exclui Carrinho já deletado anteriormente', () => {
      const cod_carr = Cypress.env('id_c')
      const token = Cypress.env('token')
      cy.del_carr(cod_carr,token)
        .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Não foi encontrado carrinho para esse usuário')})
    })
    it('Teste de Falha - Exclui Carrinho - Sem Token', () => {
      const cod_carr = Cypress.env('id_c')
      const token = ''
      cy.del_carr(cod_carr,token)
        .then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')})
    }) 
    it('Exclui Produto', () => {
      const cod_prod = Cypress.env('id_p')
      const token = Cypress.env('token')
      cy.del_prod(cod_prod,token)
        .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')})
    })
    it('Teste de Falha - Exclui Produto já deletado anteriormente', () => {
      const cod_prod = Cypress.env('id_p')
      const token = Cypress.env('token')
      cy.del_prod(cod_prod,token)
        .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Nenhum registro excluído')})
    })
    it('Teste de Falha - Exclui Produto sem Token', () => {
      const cod_prod = Cypress.env('id_p')
      const token = ''
      cy.del_prod(cod_prod,token)
        .then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')})
    })
    it('Exclui Usuário', () => {
      const cod_user = Cypress.env('id')
        cy.del_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Registro excluído com sucesso')})
    })
    it('Teste de Falha - Exclui Usuário já deletado anteriormente', () => {
      const cod_user = Cypress.env('id')
      cy.del_user(cod_user)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Nenhum registro excluído')})
    })
    it('Teste de Falha - Exclui Usuário com ID inexistente', () => {
      const cod_user = '1234'
        cy.del_user(cod_user)
          .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('Nenhum registro excluído')})
    })
})
