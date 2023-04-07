$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function resetar(){
  document.getElementById('letras-mai').checked = true;
  document.getElementById('numbers').checked = true;
  document.getElementById('carac-especiais').checked = true;
  document.getElementById('tamanho-password').value = 12;

  btn({show_swal: false});
}

//Função acionada quando um dos input:radios são clicados
function selectCheckbox(){
  var facilPronuncia = document.getElementById('facil-pronuncia');
  var facilLer = document.getElementById('facil-ler');
  var todosCarac = document.getElementById('todos-caracteres');
  var checkbox = document.querySelectorAll('.checkbox-formulario');
  var letrasMai = document.querySelector('#letras-mai');
  var numbers = document.querySelector('#numbers');
  var caracEspeciais = document.querySelector('#carac-especiais');
  //Se o radio "fácil de falar" for clicado, executa esta condição:
  if(facilPronuncia.checked){
    //alert("facil pronuncia selecionado");
    //letra maiuscula e letra minuscula, o resto desabilitado
    if(numbers.checked){
      numbers.checked = false;
    }
    numbers.disabled = true;
    document.getElementById('label-numbers').style.color="lightgrey";
    if(caracEspeciais.checked){
      caracEspeciais.checked = false;
    }
    caracEspeciais.disabled = true;
    document.getElementById('label-carac-especiais').style.color="lightgrey";
  }
  //Se o radio "fácil de ler" for clicado, executa esta condição:
  if(facilLer.checked){
    //alert("facil ler selecionado");
    //letra maiúscula e letra minúscula
    letrasMai.checked = true;
    if(numbers.checked){
      numbers.checked = false;
    }
    if(numbers.disabled){
      numbers.disabled = false;
      document.getElementById('label-numbers').style.color="black";
    }
    if(caracEspeciais.checked){
      caracEspeciais.checked = false;
    }
    if(caracEspeciais.disabled){
      caracEspeciais.disabled = false;
      document.getElementById('label-carac-especiais').style.color="black";
    }
  }
  //Se o radio "tudo" for clicado, executa esta condição
  if(todosCarac.checked){
    // alert("todos os caracteres selecionado");
    if(numbers.disabled){
      numbers.disabled = false;
      document.getElementById('label-numbers').style.color="black";
    }
    if(caracEspeciais.disabled){
      caracEspeciais.disabled = false;
      document.getElementById('label-carac-especiais').style.color="black";
    }
    for(var current of checkbox){
      current.checked = true
    }
  }
}

//Função que é acionada quando se clica no botão
function btn({show_swal}){
  var letrasMai = document.getElementById('letras-mai');
  var numbers = document.getElementById('numbers');
  var caracEspeciais = document.getElementById('carac-especiais');
  
  if(letrasMai.checked){
    letrasMai = true;
  }else{
    letrasMai = false;
  }
  
  if(numbers.checked){
    numbers = true;
  }else{
    numbers = false;
  }
  
  if(caracEspeciais.checked){
    caracEspeciais = true;
  }else{
    caracEspeciais = false;
  }
  //Pegando o tamanho que a senha deve ter
  var tamanho = document.getElementById('tamanho-password').value;
  
  //Como a senha padrão será minúscula para não dar zebra na hora de gerar, foi criada uma variável que a função recebe
  var letrasMin = true;
  senha(letrasMin, letrasMai, numbers, caracEspeciais, tamanho, show_swal)
}

function copiar(){
  var senhaGerada = document.getElementById('print-password');
  var senhaVazia = document.getElementById('print-password').value;

  if(senhaVazia == "" || senhaVazia == null){
    Swal.fire({
      icon: 'error',
      title: 'Primeiro, gere uma senha',
      text: 'Antes de copiar é preciso gerar uma senha',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#7066E0',
      confirmButtonText: 'Gerar senha',
      cancelButtonText: 'OK'
    }).then(
      (result)=>{
        if(result.isConfirmed){
          btn({show_swal: true});
        }
      }
    )
  }else{
    senhaGerada.select();
    document.execCommand('copy');
    Swal.fire({
      icon: 'info',
      title: 'Senha copiada',
      text: 'A senha já tá na área de transferência',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Nova Senha',
      cancelButtonText: 'Voltar'
    }).then(
      (confirm)=>{
        if(confirm.isConfirmed){
          btn({show_swal: true});
        }
      }
    )
  }
}

function senha(letrasMin, letrasMai, numbers, caracEspeciais, tamanho, show_swal){
  document.querySelector('#print-password').removeAttribute('readonly');
  var minusculas = 'abcdefghijklmnopqrstuvwxyz';
  var maiusculas =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numeros = 13243546576879809102;
  var caracteres = '@(#$./:);-"*{}!';
  var tamanhoPass = tamanho;
  var str = "";
  var password = "";
  
  if(letrasMin == true){
    str = minusculas;
  }
  
  if(letrasMin == true && letrasMai == true){
    str = minusculas + maiusculas;
  }
  
  if(letrasMin == true && numbers == true){
    str = minusculas + numeros;
  }
  
  if(letrasMin == true && caracEspeciais == true){
    str = minusculas + caracteres;
  }
  
  if(letrasMin == true && letrasMai == true && numbers == true){
    str = minusculas + maiusculas + numeros;
  }
  
  if(letrasMin == true && letrasMai == true && numbers == true && caracEspeciais == true){
    str = minusculas + maiusculas + numeros + caracteres;
  }
  
  if(letrasMin == true && letrasMai == false && numbers == true && caracEspeciais == true){
    str = minusculas + numeros + caracteres;
  }
  
  for(i = 1; i <= tamanhoPass; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    password += str.charAt(char);
  }
  
  document.getElementById('print-password').value = password;
  document.querySelector('#print-password').setAttribute('readonly',true);
  
  if(show_swal){
    Swal.fire({
      icon: 'success',
      title: 'Senha gerada com sucesso',
      text: 'Copie e salve-a em um Gerenciador de Senhas',
      showDenyButton: true,
      // showCancelButton: false,
      confirmButtonColor: '#009999',
      // cancelButtonColor: '#3085d6',
      denyButtonColor: 'grey',
      confirmButtonText: 'Copiar',
      // cancelButtonText: 'Nova senha',
      denyButtonText: 'Voltar',
      footer: '<a style="text-decoration:none" href="https://www.kaspersky.com.br/resource-center/preemptive-safety/internet-privacy--security-5-safety-tips" target="_blank">Dicas de Segurança</a>'
    }).then(
      (result)=>{
        if(result.isConfirmed){
          var senhaGerada = document.getElementById('print-password');
          var senhaVazia = document.getElementById('print-password').value;
          //var senhaVazia="ok";
          if(senhaVazia == "" || senhaVazia == null){
            Swal.fire({
              icon: 'error',
              title: 'Primeiro, gere uma senha',
              text: 'Antes de copiar é preciso gerar uma senha'
            })
          }else{
            senhaGerada.select();
            document.execCommand('copy');
            Swal.fire({
              icon: 'info',
              title: 'Senha copiada',
              text: 'A senha já tá na área de transferência',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: 'grey',
              confirmButtonText: 'Nova Senha',
              cancelButtonText: 'Voltar'
            }).then(
              (confirm)=>{
                if(confirm.isConfirmed){
                  btn({show_swal: true});
                }
              }
              )
            }
          }
      })
  }
  
  document.querySelector('#button-send').setAttribute('onclick','btn({show_swal: true})');
} 

document.querySelector('#testar-senha').addEventListener('click', (evento) => {
  const card_body = evento.target.parentElement.parentElement;
  
  const div = card_body.querySelector('div.form-group');
  div.classList.contains('none') ? div.classList.remove('none') : '';
  div.classList.add('fade-in');
  
  const input = div.querySelector('input');
  input.focus();
  input.addEventListener('input', () => {
    verificarSenha(div);
  });
})

function verificarSenha(div){
  // Parâmetros para verificação da qualidade da senha 
  let parametros = {
    count : false,
    letters : false,
    numbers : false,
    special : false
  }

  let texto = null;
  let senha = document.querySelector("[data-input='senha-para-teste']").value.trim();
  
  const div_feedback = div.querySelector('.alert');
  div_feedback.classList.contains('none') ? div_feedback.classList.remove('none') : '';

  parametros.letters = (/[A-Za-z]+/.test(senha))? true : false;
  parametros.numbers = (/[0-9]+/.test(senha))? true : false;
  parametros.special = (/[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(senha))? true : false;
  parametros.count = (senha.length > 7)? true : false;

  let filtro = Object.values(parametros).filter(value => value);

  switch(filtro.length){
    case 4:
    if(senha.length > 12){
      div_feedback.classList.value = 'alert alert-success mt-2';
      texto = 'Senha forte';
      break;
    }
    
    case 3:
    if(senha.length > 10){
      div_feedback.classList.value = 'alert alert-primary mt-2';
      texto = 'Boa senha';
      break;
    }
      
    case 2:
    texto = 'Senha média';
    div_feedback.classList.value = 'alert alert-warning mt-2';
    break;
    
    case 1:    
    case 0:
    default:
    div_feedback.classList.value = 'alert alert-danger mt-2';
    texto = 'Senha fraca';
    break; 
  }

  div.querySelector("#mensagem").textContent = texto;
}