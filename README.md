# Sickly Application 



1. Ensure API URL is correct in `src/components/Home/service.js`
```js
  var restClient = feathers.rest('http://localhost:8080')
```

2. Add your schema and field names in `src/components/Home/index.js`
```js
schema: 'Test',

...

{ key: 'text', type: 'text', field: 'text', },
{ key: 'number', type: 'text', field: 'number', },
```

3. Start 
```
npm start
```

4. Visit http://localhost:8081/ 
