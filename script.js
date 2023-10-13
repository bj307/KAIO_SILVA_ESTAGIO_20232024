let listaVoos = [];
let listaAvioes = [];
let combinacoes = [];

function lerTxtVoos() {
  listaVoos = [];
  const arquivo = document.querySelector("#arquivoVoo").files[0];
  const reader = new FileReader();

  const lista = document.querySelector(".listaVoos");
  lista.innerHTML = "";
  reader.onload = () => {
    const conteudo = reader.result.replace(/\r/g, "");
    const voos = conteudo.split("\n").map((linha) => linha.split(";"));

    for (const [nome, tempo] of voos) {
      const voo = {
        nome,
        duracao: tempo,
      };
      listaVoos.push(voo);

      const li = document.createElement("li");
      li.textContent = voo.nome + " - " + voo.duracao + " minutos";
      lista.append(li);
    }
  };

  reader.readAsText(arquivo);
}

function lerTxtAvioes() {
  listaAvioes = [];
  const arquivo = document.querySelector("#arquivoAviao").files[0];
  const reader = new FileReader();

  const lista = document.querySelector(".listaAvioes");
  lista.innerHTML = "";
  reader.onloadend = () => {
    const conteudo = reader.result.replace(/\r/g, "");
    const avioes = conteudo.split("\n");

    for (const linha of avioes) {
      const aviao = {
        nome: linha,
        voos: 0,
        tempoTotal: 0,
      };
      listaAvioes.push(aviao);

      const li = document.createElement("li");
      li.textContent = aviao.nome;
      lista.append(li);
    }
  };
  reader.readAsText(arquivo);
}

function gerarCombinacoes() {
  if (listaAvioes.length > 0 && listaVoos.length > 0) {
    combinacoes = [];
    const lista = document.querySelector(".listaComb");
    lista.innerHTML = "";
    combinacoes = listaVoos.map((voo) => {
      const aviao = Math.floor(Math.random() * listaAvioes.length);
      listaAvioes[aviao].voos = 0;
      listaAvioes[aviao].tempoTotal = 0;
      const li = document.createElement("li");
      li.textContent =
        voo.nome +
        " - " +
        voo.duracao +
        " minutos de duração - " +
        listaAvioes[aviao].nome;
      lista.append(li);

      return {
        nome: voo.nome,
        duracao: voo.duracao,
        aviao: listaAvioes[aviao].nome,
      };
    });
    listarRelatorio();
  } else {
    return;
  }
}

function listarRelatorio() {
  const lista = document.querySelector(".listaRel");
  lista.innerHTML = "";
  if (combinacoes.length !== 0) {
    combinacoes.map((combinacao) => {
      for (let i = 0; i < listaAvioes.length; i++) {
        if (combinacao.aviao === listaAvioes[i].nome) {
          listaAvioes[i].voos++;
          listaAvioes[i].tempoTotal += Number(combinacao.duracao);
        }
      }
    });

    listaAvioes.map((aviao) => {
      const li = document.createElement("li");
      li.textContent =
        aviao.nome +
        " - " +
        aviao.voos +
        " voos - tempo total: " +
        aviao.tempoTotal +
        " minutos";
      lista.append(li);
    });
  } else {
    return;
  }
}
