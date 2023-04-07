# Gerador de Senha

Gerador de senha que permite a personalização da senha gerada aleatoriamente

## Funções

- Gerar senhas aleatórias
- Personalizar os tipos de caracteres para a geração de senhas
- Definir uma quantidade de caracteres para as senhas
- Copiar a senha gerada
- Resetar os parâmetros de personalização de senhas

## Como funciona?

O usuário personaliza as senhas, escolhendo se ele vai ter ou não letras maiúsculas, números ou caracteres especiais e define um tamanho para a senha (por padrão é 12 caracteres). <br>
Ao clicar no botão "Gerar senha" a função `btn()` é acionada, verifica os parâmetros definidos para a geração da senha e passam como argumento para a função `senha()`. <br>
Esta função por sua vez cria aleatoriamente uma senha e preenche o `input:text` com o que foi gerado. <br>
O usuário pode copiar a senha gerada clicando no botão "Copiar senha".

## Recursos utilizados

- Fonte: Ubuntu
- Bibliotecas: Google Fonts, jQuery
- Frameworks: Sweet Alert, Bootstrap e FontAwesome