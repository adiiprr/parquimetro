/* Classe Parquimetro */
class Parquimetro {
    constructor() {
        // Podemos deixar valorPorMinuto se quiser, mas agora usamos faixas fixas
    }

    /* Método para calcular tempo e troco baseado em faixas de valor */
    calcular(valor) {
        let tempo = 0;
        let troco = 0;

        if (valor >= 3) {
            tempo = 120; // 120 minutos = 2 horas
            troco = (valor - 3).toFixed(2);
        } else if (valor >= 1.75) {
            tempo = 60; // 60 minutos = 1 hora
            troco = (valor - 1.75).toFixed(2);
        } else if (valor >= 1) {
            tempo = 30; // 30 minutos
            troco = (valor - 1).toFixed(2);
        } else {
            return { tempo: 0, troco: 0, erro: "Valor insuficiente. O valor mínimo é R$ 1,00." };
        }

        return { tempo, troco: parseFloat(troco), erro: null };
    }
}

/* Interação com o HTML */
const form = document.getElementById('parquimetroForm');
const resultadoDiv = document.getElementById('resultado');
const parquimetro = new Parquimetro();

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const valorInserido = parseFloat(document.getElementById('valorInserido').value);
    const resultado = parquimetro.calcular(valorInserido);

    if (resultado.erro) {
        resultadoDiv.textContent = resultado.erro;
        resultadoDiv.style.color = "red";
    } else {
        const horas = Math.floor(resultado.tempo / 60);
        const minutos = resultado.tempo % 60;

        let tempoFormatado = "";
        if (horas > 0) tempoFormatado += `${horas} hora(s) `;
        if (minutos > 0) tempoFormatado += `${minutos} minuto(s)`;

        resultadoDiv.innerHTML = `Tempo de permanência: <strong>${tempoFormatado}</strong><br>
                                  Troco: <strong>R$ ${resultado.troco.toFixed(2)}</strong>`;
    }
});
