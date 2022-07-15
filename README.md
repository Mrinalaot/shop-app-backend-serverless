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

