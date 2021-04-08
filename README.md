# registration

The task

1. Create home page (‘/’)
2. Create user registration page ('/ register')
3. On the registration page, create a new user registration wizard, which consists of two steps:
   1st step: Form with fields fullName _, nickname _, password _, repeatPassword _, phone _, gender, country, city (_ - required fields)
   2nd step: Code entry field (6 characters)
4. Add validation of the input data in the 1st step
   - fullName is not empty
   - nickname - at least 5 characters and Latin alphanumeric characters and signs "-", "\_", "."
   - password - at least 8 characters and uses Latin alphanumeric characters and signs "-", "\_", ".", "+", "=", "@", "\$", "!", "?"
   - repeatPassword - matches the repeat field
   - phone - consists of numbers only and starts with 998)
5. After successful validation, the continue button becomes active and you can go to the next one. step. When clicked, an http POST request is sent with a form in the body in the form of json
6. If the response is successful (Http status 200), open the 2nd step with entering the code
7. When 6 characters are filled in, the input is blocked and an http confirmation request is automatically sent
8. On successful response (Http status 200), save the response body in Vuex into a user object and redirect to the main page

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
