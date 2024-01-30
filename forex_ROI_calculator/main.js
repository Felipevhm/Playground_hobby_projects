

function compute(event) {
  event.preventDefault();
  //Numberizing
  
  let entrada =document.getElementById('entrada');
  let alvo = document.getElementById('alvo');
  let alavancagem = document.getElementById('alavancagem');
  let nContratos = document.getElementById('nContratos');

  entrada = Number((entrada.value).replace(/,/g, '.'))
  alvo = Number((alvo.value).replace(/,/g, '.'))
  alavancagem = Number((alavancagem.value).replace(/,/g, '.'))
  nContratos = Number((nContratos.value).replace(/,/g, '.'))

  let percentual = calculaPercentual(entrada,alvo,nContratos);

  let margemAtual = calculaMargem(nContratos,entrada,alavancagem);

  document.getElementById('margemOperacao').innerText = margemAtual;
  document.getElementById('gain-max').innerText = '$' + `output é: ${percentual}`;
}

function calculaPercentual(entrada,alvo,nContratos){
let output = ((((Math.abs(entrada-alvo))/entrada)*(nContratos)).toFixed(5));
  return String(output.replace(/,/g, '.'))
}

function calculaMargem(nContratos,entrada,alavancagem){
  let output = (nContratos*entrada*100000/alavancagem).toFixed(5);
  return String(output.replace(/,/g, '.'));
}

// EuroQuery:

$(document).ready(function() {
  $.ajax({
      url: 'https://api.frankfurter.app/latest?from=EUR&to=USD',
      dataType: 'json',
      success: function(data) {
          var rate = data.rates.USD;
          $('#exchangeRate').html(rate);
      },
      error: function() {
          $('#exchangeRate').html('Failed to get the exchange rate.');
      }
  });
});