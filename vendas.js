// Lógica específica para a página vendas.html

document.addEventListener('DOMContentLoaded', function() {
    console.log('vendas.js carregado.');

    // Função para buscar parâmetros da URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Personalização da Seção 1
    function personalizarSecaoAlerta() {
        const nivelToxina = getQueryParam('nivel');
        const subtituloEl = document.getElementById('subtitulo-personalizado');
        const alertaVisualEl = document.getElementById('alerta-visual'); // Elemento para o ícone/gráfico

        if (!subtituloEl || !alertaVisualEl) {
            console.warn('Elementos da seção de alerta não encontrados.');
            return;
        }

        let subtituloTexto = '';
        let visualConteudo = '⚠️'; // Padrão

        if (nivelToxina === 'alto' || nivelToxina === 'critico') { // Agrupando alto e crítico para o exemplo
            subtituloTexto = "Seu resultado no quiz indica um Nível Elevado de Acúmulo de Toxinas. Sintomas como inchaço constante, falta de energia e dificuldade para emagrecer são sinais claros que seu corpo está pedindo ajuda. Ignorar isso pode sobrecarregar seu organismo.";
            visualConteudo = '🚨'; // Ou um gráfico específico
        } else if (nivelToxina === 'moderado') {
            subtituloTexto = "Seu resultado no quiz mostra um Nível Moderado de Acúmulo de Toxinas. Isso explica por que você pode se sentir cansado com frequência e lutar contra o inchaço. É o momento perfeito para agir antes que os sintomas se agravem.";
            visualConteudo = '⚠️';
        } else if (nivelToxina === 'baixo' || nivelToxina === 'leve') { // Agrupando baixo e leve
            subtituloTexto = "Parabéns por estar atento(a) à sua saúde! Seu resultado indica um Nível Leve de Acúmulo de Toxinas. Mesmo assim, a prevenção é o melhor caminho para manter sua energia em alta e evitar o inchaço ocasional. Você está a um passo de otimizar seu bem-estar.";
            visualConteudo = '🌟'; // Ou um gráfico de barra de progresso baixa
        } else {
            subtituloTexto = "Bem-vindo(a) à nossa solução detox! Descubra como nosso ebook pode te ajudar a alcançar seus objetivos de saúde e bem-estar.";
            // Manter o visual padrão ou um genérico
        }

        subtituloEl.textContent = subtituloTexto;
        alertaVisualEl.textContent = visualConteudo; // Simplesmente mudando o texto do emoji/ícone
        // Para um gráfico, você precisaria de uma lógica mais complexa aqui (ex: manipular um SVG ou Canvas)
    }

    // Contador Regressivo (Seção 7)
    function iniciarContadorRegressivo() {
        const contadorEl = document.getElementById('contador-regressivo-tempo');
        if (!contadorEl) {
            console.warn('Elemento do contador regressivo não encontrado.');
            return;
        }

        // Definir a data final da oferta (ex: 24 horas a partir de agora)
        // Para persistência entre visitas, você precisaria armazenar isso (localStorage)
        // ou ter uma data final fixa no servidor.
        let endTime;
        const storedEndTime = localStorage.getItem('ofertaEndTime');

        if (storedEndTime && parseInt(storedEndTime) > new Date().getTime()) {
            endTime = parseInt(storedEndTime);
        } else {
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas
            localStorage.setItem('ofertaEndTime', endTime);
        }


        function atualizarContador() {
            const agora = new Date().getTime();
            const diferenca = endTime - agora;

            if (diferenca <= 0) {
                contadorEl.textContent = "Oferta Encerrada!";
                localStorage.removeItem('ofertaEndTime');
                clearInterval(intervalo); // Parar o contador
                return;
            }

            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            contadorEl.textContent =
                `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        }

        const intervalo = setInterval(atualizarContador, 1000);
        atualizarContador(); // Chamar uma vez para exibir imediatamente
    }

    // Inicializar funcionalidades
    personalizarSecaoAlerta();
    iniciarContadorRegressivo();

    // Adicionar quaisquer outros event listeners ou lógicas específicas da página de vendas aqui
    // Ex: para FAQs interativas, smooth scroll para CTAs, etc.

    // Exemplo de smooth scroll para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
