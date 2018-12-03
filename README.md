# fooDrop
Webapp for buying fresh home-cooked food

## To start client (in client dir)
------------------
* `npm run serve`

<br>

## To do client testing (in client dir)
-----------------
* `npm run test:unit`

<br>
<br>
## To start server (in server dir)
-----------------
1. `npm start`
2. `npm run devstart`

<br>
## To do server testing (cd /server/test)
* `mocha authTestSuite.js`
* `mocha post_test.js`
* `mocha user_test.js`

<br>

## To install dependencies in client and server
* `npm install`

## Documentation
* http://preethamrn.github.io/fooDrop/client/docs
* http://preethamrn.github.io/fooDrop/server/docs

<br>
<br>
```
Directory structure 

fooDrop
|
+- client 
|        |
|        +- src
|        |    | 
|        |    +- assets
|        |    |
|        |    +- components
|        |    |
|        |    +- plugins
|        |    |
|        |    +- router
|        |    |
|        |    +- services
|        |    |
|        |    +- store
|        |    |
|        |    +- App.vue
|        |    |
|        |    +- main.js
|        +- tests
|            |
|            +- integration (integration tests)
|            |
|            +- unit (unit tests)
+-paypal
|    |
|    +- request.js
|
+-server
   |
   +-controller
   |
   +-models
   |
   +-routes
   |
   +-src
   |   |
   |   +- app.js
   | 
   +-test (integration and unit tests)
```