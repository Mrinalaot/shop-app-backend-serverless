# shop-app-backend-serverless
shop application backend made with serverless

## Scripts
```
npm install
npm run test
npm run coverage
npm run offline
npm run deploy

```

## Service Information
service: shop-app-backend-serverless
stage: dev
region: us-east-1
Deployed endpoints:
  GET - https://ikr75q6mjf.execute-api.us-east-1.amazonaws.com/dev/products
  GET - https://ikr75q6mjf.execute-api.us-east-1.amazonaws.com/dev/products/{productId}

Note: pass valid productId to get product details for example 7567ec4b-b10c-48c5-9345-fc73c48a80aa

## Task-3 details 
1 - Product Service Serverless config contains configuration for 2 lambda functions
2 - The getProductsList AND getProductsById lambda function returns a correct response
3 - The getProductsById AND getProductsList lambda functions returns a correct response code
4 - Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend.

+1 - Async/await is used in lambda functions
+1 - ES6 modules are used for Product Service implementation
+1 - TSConfig, TSLint is configured for Product Services
+1 - Acceptable payload structure is created for Product Service
+1 - Lambda handlers are covered by basic UNIT tests 
+1 - Lambda handlers (getProductsList, getProductsById) code is written in two modules (files) and separated in codebase for handlers.
+1 - Main error scenarios are handled by API ("Product not found" error)

## Task-4 
### 4.1 SQL Scripts
```

create extension "uuid-ossp";

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
    description text,
    price integer
);

create table store (
	product_id uuid REFERENCES products(id),
    count integer
);

select * from products p ;
select * from store s ;

insert into products (title, description, price) VALUES('PC','Personal Computer', 99000);
insert into store (product_id, count) values((select id from products where id = 'cd1b05f4-8b83-4867-8555-18b4177dcaac'), 5);


insert into products (title, description, price) VALUES('Mobile','iPhone 13', 110000);
insert into store (product_id, count) values((select id from products where title = 'Mobile'), 2);


insert into products (title, description, price) VALUES('Laptop','MacBook latest', 150000);
insert into store (product_id, count) values((select id from products where title = 'Laptop'), 3);


insert into products (title, description, price) VALUES('Airpod','iPods', 9000);
insert into store (product_id, count) values((select id from products where title = 'Airpod'), 9);

```

### 4.2 integrate rds with lambda
```
1. Updated serverless.yml file with credentials to database instance and pass it to lambda’s environment variables section.
2. Used pg module to connect the database from the code.
3. Integrate the getProductsList lambda to return via GET /products request a list of products from the database (joined stocks and products tables).
```

### 4.3 Create Product new Lambda
## POST | https://ikr75q6mjf.execute-api.us-east-1.amazonaws.com/dev/products  
```
1. Createed a lambda function called createProduct under the same Serverless config file (i.e. serverless.yaml) of Product Service which will be triggered by the HTTP POST method.
2. The requested URL should be /products.
3. Implement its logic so it will be creating a new item in a Products table.
```

### Task 4 Details
1. Task 4.1 is implemented (SQL scripts added in README file)
2. Added serverless.yml file with credentials (config.dev.json is not checked into github & you know why :)
3. Task 4.2 is implemented lambda links are provided and returns data 
(GET - https://ikr75q6mjf.execute-api.us-east-1.amazonaws.com/dev/products)
4. Task 4.3 is implemented lambda links are provided and products is stored in DB 
(POST | https://ikr75q6mjf.execute-api.us-east-1.amazonaws.com/dev/products )
5. Your own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend.
6. POST /products lambda functions returns error 400 status code if product data is invalid.
(Used Joi validation)
7. All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
8. All lambdas do console.log for each incoming requests and their arguments 
(Logged event)
9. Transaction based creation of product 
(Used PG - Transaction with begin, commit & rollback)