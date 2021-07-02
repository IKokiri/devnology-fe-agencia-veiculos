# Agência de Veículos Front-end



## Escolhas
- REACTJS: frameworks com funções complexas, mas tambem pode ser usado de forma básica abstraindo implementações de uma aplicação SPA, por exemplo.

- SPA: Entrega uma experiencia melhor para o usuário.

- VSCode: editor leve versátil e versátil, funciona muito bem com a linguagem de desenvolvimento escolhida para o projeto.

- Heroku: Trabalhaei academicamente com a Plataforma fazendo deploy de aplicações. A escolha dessa plataforma é que identifiquei uma facilidade no deploy junto ao Github, facilidade comparada ao Azure, onde efetuei poucos testes acadêmicos. Mais uma vez, a escolha foi baseada em preferencia e experiência.

- Material UI: Ajuda com o uso de uma linguagem de design bem desenvilvido. Entrega facilidade ao desenvolver um layout responsivel junto com uma ajuda para entregar uma interface visual com qualidade para o usuário. Tem uma documentação ótima em vários idiomas.

## Problemas / Soluções durante o desenvolvimento


## Funcionalidades
- Cadastro de marcas    
- Cadastro de modelos. CTRL+C de Marcas com poucas modificações.    
- Cadastro de veículos    
- Produto
- Compra
- Venda
- Funcionario
- Cliente
- Estoque
- Comissão
## Operação Básica

### cadastro de marca:
    - Entrar com Texto e salvar

### cadastro de modelo:
    - Entrar com Texto e salvar

### cadastro de funcionario:
    - Entrar com nome : Texto
    - Entrar com sobrenome : Texto
    - Entrar com registro : Alfanumérico

### cadastro de Veiculo:
    - Depende do cadastro de Marca e Modelo

### cadastro de Produto:
    - Depende do cadastro de Veiculo

### cadastro de Compra:
    - Depende do cadastro de um produto

### cadastro de Venda:
    - Depende da compra de um produto

### Disponibilidade
    - São os veículos comprados e não vendidos

### Historico venda
    - Todos os veiculos vendidos
    
### Historico venda
    - Todos os veiculos comprados

### Historico fluxo
    - Diferença entre os veículos vendidos / comprados
    
### Comissoes
    - Valores pagos à funcionários de acordo com as vendas efetuadas
## Buscas

- https://pt-br.reactjs.org/
- https://material-ui.com/

## Como rodar essa aplicação

```powershell
npm start
```
## Como fazer o deploy da aplicação
- Ao fazer o commit do codigo, a aplicação vai para o gitub e o Heroku faz o depoloy automático da aplicação.

## Requisitos do cliente
- Cadastrar a compra de um veículo, modelo, marca, ano de fabricação, placa, cor, chassi, data da
compra e valor da compra.

- Registrar a venda de um veículo, com data da venda, valor da venda e comissão do vendedor (10%
sobre o lucro da venda).

- Deverá ser possível listar todos os veículos, veículos disponíveis e histórico de veículos vendidos.

- Listar o valor total em compras e vendas, lucro/prejuízo do mês e o valor pago em comissões.

- Enviar o link do repositório no linkedin

- Prazo 02/07/2021


## Pendencias front-end
    ### Desenvolver todos os testes unitário.
    ### Usar uma ferramenta para trabalhar com cache de forma correta.
    ### mensagens mais claras.
    ### Formatar os valores
    ### Formatar as datas
    ### Melhorar os filtros 

## Considerações no front-end
    ### Não fiz uso de relacionamentos usando o sequelize. A ideia inicial era desacoplar ao maximo a estrutura para dessa forma, ao final do desenvolvimento separar alguns módulos e colocar em servidores direferentes (eu tenho a possibilidade de adicionar até 5 endpoints no meu Heroku).



