# Typescript RESTFul API project template
Typescript

## Installation
MS requires [Node.js](https://nodejs.org/) v6.13+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd <folder>
$ npm install 
```
For DEBUG mode - local environment...
```sh
Run VSBuildtask or $ npm run debug 
```
For local environment...
```sh
$ npm run local
```
For development environment...
```sh
$ npm run dev
```
For test environment...
```sh
$ npm run test
```
For production environment...
```sh
$ npm run prod
```
## API DOCS
We have documented the endpoints over Swagger UI. On local you can find the docs in the following link [API_DOCS]

## BLUEMIX Configuration
Please access the ```manifest.yml``` file, the file structure is:
```
---
applications:
- name: [app_name]
  memory: [memory_allocated]
  instances: [number_of_instances]
  routes:
  - route: [app-name]-[environment].mybluemix.net
  env:
    ENVIRONMENT: [environment]
```
For development environment...
```
$ git checkout develop

$ npm run build
```
For test environment...
```
$ git checkout test

$ npm run build
```
For production environment...
```
$ git checkout master

$ npm run build
```

## Debug Logging
##### Instance Winston
``` this.logger = new Logger(); ```

Winston is used for server side logging. In order of least severe to most severe, the available levels are: ` Silly ` -> ` Debug ` -> ` Verbose ` -> ` Info ` -> ` Warn ` -> ` Error `. Given a level, the logger will log that level or greater. For example, ` Warn ` will log ` Warn ` and ` Error `

##### Example of usage
` this.logger.Winston.Error('[message]'); `


### Tech

#### This boilerplate uses a number of projects to work properly:
* [node.js] - event I/O for the backend
* [Typescript] - Javascript superset (Coding guidelines Typescript - Microsoft)

#### Patterns and Principles in this project:
- Generic Repository Pattern
- Singleton Pattern
- Dependency Injection (IoC)

#### Additional feature:
- Fast compile and reload
- Debug typescript option using vscode

### TODO
 - Write Tests

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)

[node.js]: <http://nodejs.org>
[Typescript]: <https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines>
[API_DOCS]: <http://localhost:5000/api-docs/>