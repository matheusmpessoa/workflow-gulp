# workflow-gulp
Workflow de front-end configurada com Gulp e Sass

## Instalação
Vá até a raiz do projeto e digite os seguintes comandos:
```js
npm install
```

```js
npm install gulp
```

Caso apareça algum erro de JS após os comandos do npm digite o seguinte:
```js
npm install --save-dev jshint gulp-jshint
```

## Execução
```js
gulp
```

## Configurações
Caso queira usar o browser sync que está configurado no *gulpfile* basta inserir seu endereço de localhost


## Exemplos

### Uso de variáveis na imagem
```css
background: url($img_path+'/logo/logo.png') center no-repeat;
```

### Uso de variáveis em fontes no scss
```css
font-family: $gotham;
```

### Uso de variáveis em cores no scss
```css
color: $preto;
```