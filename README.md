# Validator js
Validar qualquer tipo de campo de formulário apenas passando a validação seguindo as regras de
formatação

## Objeto validator3
Usando a classe validator você informa os parâmetros
1. `{attr: 'rules'}` Attr: Nome do campo Ex name="password"
2. A classe do formulário (Opicional)
3. Callback - Quando todos os campos forem preenchidos corretamente executa o callback

```javascript
new validator({
    user_email: 'email',
    user_desc: 'string:min(30)',
    user_thumb: 'required|file:min(300kb)',
    user_password: 'required|string:between(8-15)',
    user_password_comfirm: 'required|same(user_password)'
}, 'form');
```
## Através da função
1. Elemento
2. As regras
3. O callback - Por parâmetro você terá o elemento e a mensagem de erro

``` javascript
let element = document.querySelector('[name="user_desc"]');
let rules = 'required|string:between(9-10)';
check(element, rules, function (input, msg) {});
```
## Referâncias
Esses são alguns repositórios que me baseei para criar esta aplicação
1. [rickharrison](https://github.com/rickharrison/validate.js)
2. [jaywcjlove](https://github.com/jaywcjlove/validator.js)


Available Validation Rules
Below is a list of all available validation rules and their function:

## Integração com Laravel
[Documentação](https://laravel.com/docs/7.x/validation)

Accepted
Active URL
After (Date)
After Or Equal (Date)
Alpha
Alpha Dash
Alpha Numeric
Array
Bail
Before (Date)
Before Or Equal (Date)
Between
Boolean
Confirmed
Date
Date Equals
Date Format
Different
Digits
Digits Between
Dimensions (Image Files)
Distinct
E-Mail
Ends With
Exclude If
Exclude Unless
Exists (Database)
File
Filled
Greater Than
Greater Than Or Equal
Image (File)
In
In Array
Integer
IP Address
JSON
Less Than
Less Than Or Equal
Max
MIME Types
MIME Type By File Extension
Min
Not In
Not Regex
Nullable
Numeric
Password
Present
Regular Expression
Required
Required If
Required Unless
Required With
Required With All
Required Without
Required Without All
Same
Size
Sometimes
Starts With
String
Timezone
Unique (Database)
URL
UUID































# app-validator
