function compute(event) {
  event.preventDefault();
  //Numberizing
  
  let entrada =document.getElementById('entrada').value;
  let alvo = document.getElementById('alvo-input').value;
  let nContratos = document.getElementById('nContratos').value;
  let alavancagem = document.getElementById('alavancagem').value;
  let stop = document.getElementById('stop-input').value;
  let parcial = document.getElementById('partial-input').value;

  let meta = document.getElementById('meta-input').value;


  entrada = numberParse(entrada);
  alvo = numberParse(alvo);
  alavancagem = numberParse(alavancagem);
  nContratos = numberParse(nContratos);
  stop = numberParse (stop);
  parcial = Number((parcial).replace(/,/g, '.'))
  meta = Number((meta).replace(/,/g, '.'))

  let marginGain = String(calculaMargem(entrada,alvo,nContratos));
  let marginstop = String(calculaMargem(entrada,stop,nContratos));
  let marginPartial = String(calculaMargem(entrada,parcial,nContratos));

  let marginInOperation = calculaMargemEmOperacao(nContratos,entrada,alavancagem);

  document.getElementById('margemOperacao').innerText = '$'+marginInOperation;
  document.getElementById('alvo-output').innerText = `$${marginGain}`;
  document.getElementById('stop-output').innerText = `$${marginstop}`;
  document.getElementById('partial-output').innerText = `$${marginPartial}`;



  console.log( `
  entrada: ${entrada} \n
  Alvo: ${alvo}\n\n
  nContratos: ${nContratos}\n
  alavancagem: ${alavancagem}\n\n
  Entrada - Alvo:${(entrada-alvo).toFixed(5)}
  100k*Entrada - Alvo:${((entrada-alvo)*100000).toFixed(5)}
  abs de 100k*Entrada - Alvo:${Math.abs((entrada-alvo)*100000).toFixed(5)}
  `);
}
function calculaMargem(entrada,alvo,nContratos){

let output = ((((Math.abs((entrada-alvo))))*(nContratos)*100000)).toFixed(2);
console.log(`calculaMargem deu ${output}`)
  return output;
}

function calculaMargemEmOperacao(nContratos,entrada,alavancagem){
  let output = (nContratos*entrada*100000/alavancagem).toFixed(2);
  return output.replace(/,/g, '.');
}

function calculaMargemPercentual(entrada,alvo,nContratos){

  let output = ((((Math.abs((entrada-alvo))))*(nContratos)*100000)).toFixed(2);
  console.log(`calculaMargem deu ${output}`)
  return output;
  }

  function numberParse(value){
    value = Number((value).replace(/,/g, '.'))
    return value;
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

