# Backend App Sorteos

Backend de App de sorteos de Code Quest de Devtalles que incluye API REST de sorteos, autenticación y más.

___

## Pasos y comandos para levantar backend:
Los pasos importantes para que nuestro backend funcione son agregar las variables de entorno, crear nuestra base de dato NoSQL local, poblar las colecciones de esta y correr el servidor local.

#### Configurar nuestras variables de entorno:
- Se debe crear el archivo `.env` y dentro de este pegar todas las variables de entorno del archivo `.env.template`.

#### Montar base de datos MongoDB:
```
docker-compose up -d
```

#### Poblar base de datos con datos de prueba:
```
npm run seed
```

#### Correr servidor local:
```
npm run dev
```

#### Ejecutar pruebas unitarias:
##### Sin hot reload:
```
npm run test
```
##### Con hot reload:
```
npm run test:watch
```

___

## Tecnologías:
Para el desarrollo backend se usaron principalmente las siguientes tecnologías:

- **NodeJS:** Entorno de ejecución para crear nuestro backend.
- **Express:** Framework de _NodeJS_.
- **Typescript:** Superset de _Javascript_ para tipado estático.
- **MongoDB:** Base de datos NoSQL.
- **Docker:** Gestor de contenedores para montar base de datos de _Mongo_.
- **Jest:** Biblioteca para _Unit testing_ en nuestro backend.

![Tecnologias](https://skillicons.dev/icons?i=nodejs,express,typescript,mongodb,docker,jest)

___

## Endpoints:
El endpoint base en nuestro servidor local es: 
```
http://localhost:3000/api
```

### Autenticación:

- #### **Registrar usuario:**
  POST - ```/api/auth/register``` 
  
  #### Request Body:
  ```
  {
    name: string,
    email: string,
    password: string
  }
  ```

- #### **Autenticar usuario:**
  POST - ```/api/auth/login```

  #### Request Body:
  ```
  {
    email: string,
    password: string
  }
  ```

- #### **Validar email de usuario:**
  GET - ```/api/auth/validate-email/{token}```

  #### Parametros:
  - **token** (path): Token de usuario registrado.

___

### Sorteo:

- #### **Obtener todos los sorteos:**
  GET - ```/api/raffle/```

- #### **Obtener un sorteo:**
  GET - ```/api/raffle/{id}```

  #### Parametros:
  - **id** (path): Id de sorteo a mostrar.


- #### **Crear un sorteo:**
  POST - ```/api/raffle/```

  #### Request Body:
  ```
  {
    name: string,
    description: string,
    createAt: string,
    endAt: string,
    prize: string (mongoId),
  }
  ```

- #### **Actualizar un sorteo:**
  PUT - ```/api/raffle/{id}```

  #### Request Body:
   ```
  {
    name: string,
    description: string,
    endAt: string,
    prize: string (mongoId),
  }
  ```
  #### Parametros:
  - **id** (path): Id de sorteo a actualizar.


- #### **Eliminar un sorteo:**
  DELETE - ```/api/raffle/{id}```

  #### Parametros:
  - **id** (path): Id de sorteo a eliminar.
  

- #### **Agregar usuario a un sorteo:**
  POST - ```/api/raffle/users/{id}```

  #### Parametros:
  - **id** (path): Id de sorteo en donde se agregará el partipante.


- #### **Actualizar usuario a ganador en un sorteo:**
  PUT - ```/api/raffle/winner/{id}/{userid}```

  #### Parametros:
  - **id** (path): Id de sorteo a donde elegir un ganador.
  - **userid** (path): Id de usuario a actualizar como ganador.
___

### Premio:

- #### **Obtener todos los premios:**
  GET - ```/api/prize/```


