# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

##  Estructura del Proyecto

├── backend/ → API REST con Spring Boot (Java)
└── frontend/ → Interfaz de usuario con Angular

---

##  Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Angular CLI](https://angular.dev/tools/cli) (versión 20.3.1 o superior)
- [Java JDK 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) *(no necesario si usas `mvnw` incluido en el repo)*

---

###  Frontend

- [Angular 20](https://angular.dev/) – Framework principal
- [TypeScript](https://www.typescriptlang.org/) – Lenguaje tipado para JavaScript
- [Auth0](https://auth0.com/) – Autenticación y manejo de usuarios
- [Leaflet](https://leafletjs.com/) – Librería para mapas interactivos
- [RxJS](https://rxjs.dev/) – Programación reactiva
- [HTML5](https://developer.mozilla.org/docs/Web/HTML) y [CSS3](https://developer.mozilla.org/docs/Web/CSS) – Interfaz de usuario
- [Angular CLI](https://angular.dev/tools/cli) – Herramientas de desarrollo Angular


###  Backend
- [Spring Boot](https://spring.io/projects/spring-boot) – Framework para el desarrollo del backend en Java
- [Maven](https://maven.apache.org/) – Gestión de dependencias
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) – Persistencia de datos
- [PostgreSQL (Neon)](https://neon.tech/) – Base de datos relacional desplegada en la nube
- [Spring Security](https://spring.io/projects/spring-security) – Seguridad y autenticación
- [REST API](https://restfulapi.net/) – Interfaz de comunicación entre backend y frontend

## Ejecución del Proyecto

### 🔹 1. Levantar el Backend (Spring Boot)

Desde la carpeta raíz del repositorio:

```bash 
cd backend
.\mvnw spring-boot:run
```

### ♦ 2. Levantar el Frontend (Angular)

Desde la carpeta raíz del repositorio:

```bash
cd frontend
npm install
ng serve
```
Una vez iniciado el servidor, abre tu navegador y accede a:
`http://localhost:4200/`


##  Ejecución del Proyecto con Docker

Este proyecto puede ejecutarse de forma local o completamente dentro de contenedores **Docker**, lo que facilita la configuración del entorno y la portabilidad.

---

### Requisitos previos

Asegúrate de tener instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### 🔹 1. Construcción de las imágenes

Desde la carpeta raíz del repositorio, ejecuta:

```bash
docker compose build
```

### 🔹 2. Levantar los contenedores

Inicia todos los servicios definidos en el archivo `docker-compose.yml` con el siguiente comando:

# para reconstruir y levantar
```bash
docker compose up -d --build
```

`http://localhost:4200/`