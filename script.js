// Função que realiza a conversão das moedas
async function converter() {
  // Pegando os valores selecionados e digitados pelo usuário
  const moedaDe = document.getElementById("moedaDe").value;
  const moedaPara = document.getElementById("moedaPara").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const resultadoDiv = document.getElementById("resultado");

  // Verifica se o valor é válido
  if (!valor || valor <= 0) {
    resultadoDiv.textContent = "Digite um valor válido!";
    return;
  }
   // Verifica se o usuário selecionou moedas diferentes
  if (moedaDe === moedaPara) {
    resultadoDiv.textContent = "Selecione moedas diferentes para converter.";
    return;
  }
  // Monta o par de moedas no formato esperado pela API (ex: USD-BRL)
  const par = `${moedaDe}-${moedaPara}`;

  try {
    // Faz requisição à API da AwesomeAPI
    const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${par}`);
    const dados = await resposta.json();
    // A chave que contém os dados da conversão vem sem hífen (ex: USDBRL)
    const chave = moedaDe + moedaPara;
    // Pega a cotação atual (bid = valor de venda)
    const cotacao = parseFloat(dados[chave].bid);
    // Calcula o valor convertido
    const valorConvertido = (valor * cotacao).toFixed(2);
    // Exibe o resultado formatado
    resultadoDiv.textContent = `${valor} ${moedaDe} = ${valorConvertido} ${moedaPara}`;
  } catch (erro) {
    // Em caso de erro na requisição ou formato inválido
    resultadoDiv.textContent = "Erro ao buscar a cotação. Tente novamente.";
  }
}
