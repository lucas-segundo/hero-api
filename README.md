# Welcome to Hero API

This project uses [NestJS](https://nestjs.com/) as the framework, [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as the architecture pattern and [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) as the methodology. This project is current in development.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```
https://github.com/lucas-segundo/funny-bank-api.git
```

2. Install the dependencies
```
cd <repository>
yarn or npm i
```

### Running the tests

To run the tests, use the following command:
```
npm run test or yarn test
```

### Starting the server

To start the server with development enviroment, use the following command:
```
npm run start:dev or yarn start:dev
```

### Folder structure 

#### ```src/```: Source code of the project.
#### ```domain/```: This is the core layer that contains the business logic and the use cases of the application.
#### ```presentation/```: This is the outermost layer and deals with user interface and user experience. It communicates with the domain layer.
#### ```app/```: This is the layer that communicates with the user and acts as an interface between the user and the system. It delegates tasks to the appropriate use cases in the domain layer.
#### ```infra/```: It deals with the low-level details of the technology and platform that the application runs on. It includes the implementation of data access, communication, and other technical concerns.
#### ```main/```:  It is where the entry point of the application is and it coordinates the work between the different layers of the application.

## Built With

- [NestJS](https://nestjs.com/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Language used
- [Jest](https://jestjs.io/) - Testing Framework
