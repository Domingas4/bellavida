document.addEventListener("DOMContentLoaded", function () {
    iniciarMenuResponsivo();
    iniciarModoEscuro();
    iniciarVoltarAoTopo();
    iniciarLightbox();
    iniciarCarrossel();
    iniciarAcordeaoFaq();
    iniciarPesquisaFaq();
    iniciarValidacaoFormularios();
    iniciarAgendamentoPorEtapas();
    iniciarVerMais();
    iniciarModalServicos();
    iniciarMiniCarrosseis();     
    iniciarFiltroServicos();     
    iniciarModalBlog();
    iniciarPesquisaBlog();
    iniciarTermos();
    iniciarHeroSlider();
});
/* ---------------------------------------------------
   1. MENU DE NAVEGAÇÃO RESPONSIVO
--------------------------------------------------- */
function iniciarMenuResponsivo() {
    const botao = document.querySelector(".menu-toggle");
    const menu = document.querySelector("header nav");
    if (!botao || !menu) return;

    botao.addEventListener("click", function () {
        const aberto = menu.classList.toggle("aberto");
        botao.classList.toggle("aberto", aberto);
        botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("aberto");
            botao.classList.remove("aberto");
        });
    });
}

/* ---------------------------------------------------
   2. MODO ESCURO / CLARO
--------------------------------------------------- */
function iniciarModoEscuro() {
    const botao = document.querySelector(".tema-toggle");
    if (!botao) return;

    const temaGuardado = localStorage.getItem("bellavida-tema");
    if (temaGuardado === "claro") {
        document.documentElement.setAttribute("data-tema", "claro");
        botao.textContent = "☀";
    } else {
        botao.textContent = "☾";
    }

    botao.addEventListener("click", function () {
        const atual = document.documentElement.getAttribute("data-tema");
        if (atual === "claro") {
            document.documentElement.removeAttribute("data-tema");
            localStorage.setItem("bellavida-tema", "escuro");
            botao.textContent = "☾";
        } else {
            document.documentElement.setAttribute("data-tema", "claro");
            localStorage.setItem("bellavida-tema", "claro");
            botao.textContent = "☀";
        }
    });
}
/* ---------------------------------------------------
   3. BOTÃO VOLTAR AO TOPO
--------------------------------------------------- */
function iniciarVoltarAoTopo() {
    const botao = document.querySelector(".voltar-topo");
    if (!botao) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            botao.classList.add("visivel");
        } else {
            botao.classList.remove("visivel");
        }
    });

    botao.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ---------------------------------------------------
   4. LIGHTBOX DA GALERIA
   (substitui a antiga função abrirImagem() que estava
   a ser chamada no HTML mas não existia em lado nenhum)
--------------------------------------------------- */
function iniciarLightbox() {
    let fundo = document.querySelector(".lightbox-fundo");

    // Cria o lightbox automaticamente se a página tiver fotos
    if (!fundo && document.querySelector(".foto img, .galeria-grid img")) {
        fundo = document.createElement("div");
        fundo.className = "lightbox-fundo";
        fundo.innerHTML =
            '<button class="lightbox-fechar" aria-label="Fechar">&times;</button><img src="" alt="Imagem ampliada">';
        document.body.appendChild(fundo);
    }
    if (!fundo) return;

    const imagemGrande = fundo.querySelector("img");
    const botaoFechar = fundo.querySelector(".lightbox-fechar");

    // Função global usada pelo atributo onclick="abrirImagem(this.src)"
    window.abrirImagem = function (src) {
        imagemGrande.src = src;
        fundo.classList.add("ativo");
    };

    function fecharLightbox() {
        fundo.classList.remove("ativo");
    }

    botaoFechar.addEventListener("click", fecharLightbox);
    fundo.addEventListener("click", function (e) {
        if (e.target === fundo) fecharLightbox();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fecharLightbox();
    });
}

/* ---------------------------------------------------
   5. CARROSSEL DE TESTEMUNHOS
--------------------------------------------------- */
function iniciarCarrossel() {
    const carrossel = document.querySelector(".carrossel");
    if (!carrossel) return;

    const pista = carrossel.querySelector(".carrossel-pista");
    const slides = carrossel.querySelectorAll(".carrossel-slide");
    const botaoAnterior = carrossel.querySelector(".carrossel-anterior");
    const botaoSeguinte = carrossel.querySelector(".carrossel-seguinte");
    const pontosContentor = carrossel.querySelector(".carrossel-pontos");
    let indiceAtual = 0;
    let temporizador;

    if (pontosContentor) {
        slides.forEach(function (_, i) {
            const ponto = document.createElement("button");
            ponto.className = "carrossel-ponto" + (i === 0 ? " activo" : "");
            ponto.setAttribute("aria-label", "Ir para testemunho " + (i + 1));
            ponto.addEventListener("click", function () {
                irParaSlide(i);
            });
            pontosContentor.appendChild(ponto);
        });
    }

    function irParaSlide(indice) {
        indiceAtual = (indice + slides.length) % slides.length;
        pista.style.transform = "translateX(-" + indiceAtual * 100 + "%)";
        if (pontosContentor) {
            pontosContentor.querySelectorAll(".carrossel-ponto").forEach(function (p, i) {
                p.classList.toggle("activo", i === indiceAtual);
            });
        }
    }

    function autoAvancar() {
        temporizador = setInterval(function () {
            irParaSlide(indiceAtual + 1);
        }, 6000);
    }

    if (botaoSeguinte) botaoSeguinte.addEventListener("click", function () {
        irParaSlide(indiceAtual + 1);
        clearInterval(temporizador);
        autoAvancar();
    });
    if (botaoAnterior) botaoAnterior.addEventListener("click", function () {
        irParaSlide(indiceAtual - 1);
        clearInterval(temporizador);
        autoAvancar();
    });

    autoAvancar();
}

/* ---------------------------------------------------
   6. ACORDEÃO DO FAQ
--------------------------------------------------- */
function iniciarAcordeaoFaq() {
    const itens = document.querySelectorAll(".faq-item");
    if (!itens.length) return;

    itens.forEach(function (item) {
        const pergunta = item.querySelector(".faq-pergunta");
        if (!pergunta) return;
        pergunta.addEventListener("click", function () {
            const jaAberto = item.classList.contains("aberto");
            itens.forEach(function (i) { i.classList.remove("aberto"); });
            if (!jaAberto) item.classList.add("aberto");
        });
    });
}

/* ---------------------------------------------------
   7. PESQUISA NO FAQ
--------------------------------------------------- */
function iniciarPesquisaFaq() {
    const campo = document.querySelector("#pesquisaFaq");
    if (!campo) return;

    campo.addEventListener("input", function () {
        const termo = campo.value.toLowerCase().trim();
        document.querySelectorAll(".faq-item").forEach(function (item) {
            const texto = item.textContent.toLowerCase();
            item.style.display = texto.includes(termo) ? "" : "none";
        });
    });
}

/* ---------------------------------------------------
   8. VALIDAÇÃO DE FORMULÁRIOS (funções próprias)
--------------------------------------------------- */
function iniciarValidacaoFormularios() {
    document.querySelectorAll("form[data-validar]").forEach(function (form) {
        form.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const valido = validarFormulario(form);
            const sucesso = form.querySelector(".form-sucesso");
            if (valido) {
                if (sucesso) sucesso.classList.add("visivel");
                form.reset();
                limparErros(form);
            } else if (sucesso) {
                sucesso.classList.remove("visivel");
            }
        });
    });
}

function validarFormulario(form) {
    let valido = true;
    limparErros(form);

    form.querySelectorAll("[required]").forEach(function (campo) {
        if (campo.type === "checkbox") {
            if (!campo.checked) {
                marcarErro(campo, "Tens de aceitar para continuar.");
                valido = false;
            }
            return;
        }

        const valor = campo.value.trim();

        if (valor === "") {
            marcarErro(campo, "Este campo é obrigatório.");
            valido = false;
            return;
        }

        if (campo.type === "email" && !validarEmail(valor)) {
            marcarErro(campo, "Introduza um email válido.");
            valido = false;
        }

        if (campo.type === "tel" && !validarTelefoneAngola(valor)) {
            marcarErro(campo, "Introduza um número angolano válido (ex: +244 9xx xxx xxx).");
            valido = false;
        }

        if (campo.type === "date" && !validarDataFutura(valor)) {
            marcarErro(campo, "Escolha uma data a partir de hoje.");
            valido = false;
        }
    });

    return valido;
}

function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function validarTelefoneAngola(valor) {
    const limpo = valor.replace(/\s|-/g, "");
    return /^(\+244)?9\d{8}$/.test(limpo);
}

function validarDataFutura(valor) {
    const dataEscolhida = new Date(valor + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return dataEscolhida >= hoje;
}

function marcarErro(campo, mensagem) {
    campo.classList.add("campo-erro");
    let aviso = campo.parentElement.querySelector(".mensagem-erro");
    if (!aviso) {
        aviso = document.createElement("span");
        aviso.className = "mensagem-erro";
        campo.insertAdjacentElement("afterend", aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.add("visivel");
}

function limparErros(form) {
    form.querySelectorAll(".campo-erro").forEach(function (c) {
        c.classList.remove("campo-erro");
    });
    form.querySelectorAll(".mensagem-erro").forEach(function (m) {
        m.classList.remove("visivel");
    });
}

/* ---------------------------------------------------
   9. AGENDAMENTO POR ETAPAS (usa as classes .etapa
   e .passo que já existiam no CSS, mas sem JS ligado)
--------------------------------------------------- */
function iniciarAgendamentoPorEtapas() {
    const etapas = document.querySelectorAll(".etapa");
    if (!etapas.length) return;

    const passos = document.querySelectorAll(".passo");
    const botoesSeguinte = document.querySelectorAll("[data-seguinte]");
    const botoesAnterior = document.querySelectorAll("[data-anterior]");
    let etapaAtual = 1;
    let etapaMaxima = 1; // maior etapa já alcançada

    function mostrarEtapa(numero) {
    etapas.forEach(function (etapa) {
        etapa.style.display = etapa.id === "etapa" + numero ? "block" : "none";
    });
    passos.forEach(function (passo, indice) {
        passo.classList.toggle("ativo", indice < numero);
    });

    const linhaProgresso = document.querySelector("#passosProgresso");
    if (linhaProgresso && passos.length > 1) {
        const percentagem = ((numero - 1) / (passos.length - 1)) * 100;
        linhaProgresso.style.width = percentagem + "%";
    }

    etapaAtual = numero;
}

    botoesSeguinte.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const etapaActual = botao.closest(".etapa");
            const valido = etapaActual ? validarFormulario({ querySelectorAll: etapaActual.querySelectorAll.bind(etapaActual) }) : true;
            if (valido) {
                etapaMaxima = Math.max(etapaMaxima, etapaAtual + 1);
                mostrarEtapa(etapaAtual + 1);
            }
        });
    });

    botoesAnterior.forEach(function (botao) {
        botao.addEventListener("click", function () {
            mostrarEtapa(etapaAtual - 1);
        });
    });

    // Os círculos numerados ficam clicáveis, só para etapas já percorridas
    passos.forEach(function (passo, indice) {
        passo.addEventListener("click", function () {
            const numero = indice + 1;
            if (numero <= etapaMaxima) mostrarEtapa(numero);
        });
    });

    mostrarEtapa(1);
}
function iniciarMiniCarrosseis(){
    document.querySelectorAll(".mini-carrossel").forEach(function(carrossel){
        const pista = carrossel.querySelector(".mini-carrossel-pista");
        const imagens = carrossel.querySelectorAll("img");
        const anterior = carrossel.querySelector(".mini-anterior");
        const seguinte = carrossel.querySelector(".mini-seguinte");
        const pontosContentor = carrossel.querySelector(".mini-pontos");
        let indice = 0;

        imagens.forEach(function(_, i){
            const ponto = document.createElement("button");
            ponto.className = i === 0 ? "activo" : "";
            ponto.setAttribute("aria-label", "Ir para foto " + (i + 1));
            ponto.addEventListener("click", function(){ irPara(i); });
            pontosContentor.appendChild(ponto);
        });

        function irPara(i){
            indice = (i + imagens.length) % imagens.length;
            pista.style.transform = "translateX(-" + (indice * 100) + "%)";
            pontosContentor.querySelectorAll("button").forEach(function(p, idx){
                p.classList.toggle("activo", idx === indice);
            });
        }

        if (seguinte) seguinte.addEventListener("click", function(){ irPara(indice + 1); });
        if (anterior) anterior.addEventListener("click", function(){ irPara(indice - 1); });
    });
}

function iniciarFiltroServicos(){
    const botoes = document.querySelectorAll(".Filtros-galeria .filtro-btn");
    const cartoes = document.querySelectorAll(".servicos-card");
    if (!botoes.length) return;

    botoes.forEach(function(botao){
        botao.addEventListener("click", function(){
            botoes.forEach(function(b){ b.classList.remove("activo"); });
            botao.classList.add("activo");

            const categoria = botao.dataset.filtro;
            cartoes.forEach(function(cartao){
                const mostrar = categoria === "Todos" || cartao.dataset.categoria === categoria;
                cartao.style.display = mostrar ? "" : "none";
            });
        });
    });
}
function filtrar(tipo){
    let fotos = document.querySelectorAll(".foto");
    fotos.forEach(function(foto){
        if(tipo=="Todos"){
            foto.style.display="block";
        }else{
            if(foto.classList.contains(tipo)){
                foto.style.display="block";
            }else{
                foto.style.display="none";
            }
        }
    });
}
function iniciarVerMais(){
    const botao = document.querySelector("#botaoVerMais");
    if(!botao) return;

    let aberto = false;

    botao.addEventListener("click", function(){
        aberto = !aberto;
        document.querySelectorAll(".foto-extra").forEach(function(foto){
            foto.style.display = aberto ? "block" : "none";
        });
        botao.textContent = aberto ? "Ver menos" : "Ver mais";
    });
}

     const dadosServicos = {
    "corte-feminino": {
        titulo: "Corte Feminino",
        descricao: "Corte + Lavagem + Escova",
        preco: "12.500,00 Kz",
        fotos: [
            "../Midia/corte-femenino.jpg",
            "../Midia/corte...jpg",
            "../Midia/corte longo.jpg",
            "../Midia/corte channel.jpg",
            "../Midia/corte ondulado.jpg",
            "../Midia/corte para crespa.jpg"
        ]
    },
    "trancas": {
        titulo: "Tranças",
        descricao: "Lavagem + Breche",
        preco: "14.000,00 Kz",
        fotos: [
            "../Midia/tracas.jpg",
            "../Midia/trancas diferentes.jpg",
            "../Midia/tranas1.jpg",
            "../Midia/tranas2.jpg",
            "../Midia/tranas4.jpg",
            "../Midia/trancass.jpg"
        ]
    },
    "coloracao": {
        titulo: "Coloração Completa",
        descricao: "Produtos Profissionais",
        preco: "8.000,00 Kz",
        fotos: [
            "../Midia/coloracao1.jpg",
            "../Midia/coloracao2.jpg",
            "../Midia/coloracao3.jpg",
            "../Midia/coloracao4.jpg",
            "../Midia/coloracao5.jpg",
            "../Midia/coloracao6.jpg"
        ]
    },
    "manicure-pedicure": {
        titulo: "Manicure e Pedicure",
        descricao: "Limpeza + Massagem + Verniz",
        preco: "7.000,00 Kz",
        fotos: [
            "../Midia/Pedicure 1.jpg",
            "../Midia/pedicure 2.jpg",
            "../Midia/pedicure 3.jpg",
            "../Midia/pedicure 4.jpg",
            "../Midia/pedicure5.jpg",
            "../Midia/unhas elegantes.jpg",
            "../Midia/unhas compridas.jpg",
            "../Midia/unhas brancas.jpg"
        ]
    },
    "perucas": {
        titulo: "Colagem de Perucas",
        descricao: "Lavagem + Viradas + Tratamento da Peruca",
        preco: "11.000,00 Kz",
        fotos: [
            "../Midia/piruca1.jpg",
            "../Midia/piruca2.jpg",
            "../Midia/piruca3.jpg",
            "../Midia/piruca4.jpg",
            "../Midia/piruca5.jpg",
            "../Midia/piruca6.jpg",
            "../Midia/piruca7.jpg"
        ]
    },
    "estetica": {
        titulo: "Estética",
        descricao: "Limpeza facial + Massagens",
        preco: "18.000,00 Kz",
        fotos: [
            "../Midia/estetica 1.jpg",
            "../Midia/mascara 1.jpg",
            "../Midia/mascara 2.jpg",
            "../Midia/estetica 2.jpg",
            "../Midia/estetica.jpg"
        ]
    }
};

function iniciarModalServicos(){
    const modal = document.querySelector("#modalServico");
    if (!modal) return;

    const pista = modal.querySelector(".modal-servico-pista");
    const pontosContentor = modal.querySelector(".mini-pontos");
    const botaoAnterior = modal.querySelector(".mini-anterior");
    const botaoSeguinte = modal.querySelector(".mini-seguinte");
    const botaoFechar = modal.querySelector(".modal-servico-fechar");
    const tituloEl = modal.querySelector("#modalServicoTitulo");
    const descricaoEl = modal.querySelector("#modalServicoDescricao");
    const precoEl = modal.querySelector("#modalServicoPreco");
    let indice = 0;
    let totalFotos = 0;

    function irParaFoto(i){
        indice = (i + totalFotos) % totalFotos;
        pista.style.transform = "translateX(-" + (indice * 100) + "%)";
        pontosContentor.querySelectorAll("button").forEach(function(p, idx){
            p.classList.toggle("activo", idx === indice);
        });
    }

    function abrirServico(id){
        const dados = dadosServicos[id];
        if (!dados) return;

        tituloEl.textContent = dados.titulo;
        descricaoEl.textContent = dados.descricao;
        precoEl.textContent = dados.preco;

        pista.innerHTML = "";
        pontosContentor.innerHTML = "";
        totalFotos = dados.fotos.length;

        dados.fotos.forEach(function(src, i){
            const img = document.createElement("img");
            img.src = src;
            img.alt = dados.titulo;
            pista.appendChild(img);

            const ponto = document.createElement("button");
            ponto.className = i === 0 ? "activo" : "";
            ponto.addEventListener("click", function(){ irParaFoto(i); });
            pontosContentor.appendChild(ponto);
        });

        indice = 0;
        pista.style.transform = "translateX(0%)";
        modal.classList.add("ativo");
    }

    function fecharModal(){
        modal.classList.remove("ativo");
    }

    document.querySelectorAll("[data-servico]").forEach(function(botao){
        botao.addEventListener("click", function(){
            abrirServico(botao.dataset.servico);
        });
    });

    botaoSeguinte.addEventListener("click", function(){ irParaFoto(indice + 1); });
    botaoAnterior.addEventListener("click", function(){ irParaFoto(indice - 1); });
    botaoFechar.addEventListener("click", fecharModal);
    modal.addEventListener("click", function(e){
        if (e.target === modal) fecharModal();
    });
    document.addEventListener("keydown", function(e){
        if (e.key === "Escape") fecharModal();
    });
}        
       const dadosBlog = {
    "cuidados-cabelo": {
        titulo: "5 cuidados essenciais para o cabelo",
        fotos: ["../Midia/cuidados-para-o-cabelo.jpg"],
        corpo: [
            "Um cabelo saudável começa em casa, muito antes de chegares ao salão. Lava o cabelo com água morna (nunca quente), que resseca o couro cabeludo e desbota a cor mais depressa.",
            "Usa condicionador só das pontas para o meio do comprimento, evitando a raiz — isso mantém o volume sem pesar o cabelo.",
            "Reduz o uso de secador e chapinha, ou aplica sempre um protetor térmico antes de usar calor.",
            "Corta as pontas a cada 8-10 semanas, mesmo que estejas a tentar crescer o cabelo — pontas espigadas sobem pelo fio e obrigam a cortes maiores depois.",
            "Por fim, escova o cabelo antes do banho, nunca depois — molhado, o fio está mais frágil e quebra com mais facilidade."
        ]
    },
    "tendencias-unhas": {
        titulo: "Tendências de unhas para 2025",
        fotos: [
            "../Midia/unhas brancas.jpg",
            "../Midia/unhas compridas.jpg",
            "../Midia/unhas elegantes.jpg",
            "../Midia/unhas simples.jpg"
        ],
        corpo: [
            "As unhas em 2025 vivem de contrastes: de um lado, o minimalismo com tons nude e brancos suaves; do outro, designs statement com pedrarias e efeitos 3D.",
            "As unhas compridas em formato amêndoa continuam fortes, mas ganharam companhia — o quadrado suave (\"squoval\") está a conquistar quem prefere praticidade sem abdicar da elegância.",
            "Nas cores, o branco leitoso e os tons pastel lideram para o dia a dia, enquanto vermelhos profundos e dourados aparecem em ocasiões especiais.",
            "Uma dica do salão: independentemente da tendência que escolheres, a base bem feita é o que faz a diferença entre uma manicure que dura 3 dias e uma que dura 3 semanas."
        ]
    },
    "coloracao-certa": {
        titulo: "Como escolher a coloração certa",
        fotos: [
            "../Midia/dica de coloracao.jpg",
            "../Midia/coloraca..ideal.jpg",
            "../Midia/coloracao ideia..jpg",
            "../Midia/coloraca.ideal.jpg"
        ],
        corpo: [
            "Escolher a cor de cabelo certa começa por perceber o teu subtom de pele: quente, frio ou neutro. Uma forma simples de descobrir é olhar para as veias do pulso — azuladas indicam subtom frio, esverdeadas indicam subtom quente.",
            "Peles de subtom frio tendem a valorizar tons acinzentados, cinza-platinado ou castanhos frios. Peles de subtom quente ficam bem com dourados, cobres e caramelos.",
            "Se é a tua primeira vez a mudar de cor, opta por uma coloração a 1-2 tons de distância da tua cor natural — a transição fica mais natural e o crescimento da raiz é menos notório.",
            "E o mais importante: traz sempre referências de fotos à consulta. Ajuda imenso o profissional a perceber exatamente o resultado que tens em mente."
        ]
    }
};

function iniciarModalBlog(){
    const modal = document.querySelector("#modalBlog");
    if (!modal) return;

    const pista = modal.querySelector(".modal-blog-pista");
    const pontosContentor = modal.querySelector(".blog-pontos");
    const botaoAnterior = modal.querySelector(".blog-anterior");
    const botaoSeguinte = modal.querySelector(".blog-seguinte");
    const botaoFechar = modal.querySelector(".modal-blog-fechar");
    const tituloEl = modal.querySelector("#modalBlogTitulo");
    const corpoEl = modal.querySelector("#modalBlogCorpo");
    let indice = 0;
    let totalFotos = 0;

    function irParaFoto(i){
        indice = (i + totalFotos) % totalFotos;
        pista.style.transform = "translateX(-" + (indice * 100) + "%)";
        pontosContentor.querySelectorAll("button").forEach(function(p, idx){
            p.classList.toggle("activo", idx === indice);
        });
    }

    function abrirPost(id){
        const dados = dadosBlog[id];
        if (!dados) return;

        tituloEl.textContent = dados.titulo;

        corpoEl.innerHTML = "";
        dados.corpo.forEach(function(paragrafo){
            const p = document.createElement("p");
            p.textContent = paragrafo;
            corpoEl.appendChild(p);
        });

        pista.innerHTML = "";
        pontosContentor.innerHTML = "";
        totalFotos = dados.fotos.length;

        dados.fotos.forEach(function(src, i){
            const img = document.createElement("img");
            img.src = src;
            img.alt = dados.titulo;
            pista.appendChild(img);

            const ponto = document.createElement("button");
            ponto.className = i === 0 ? "activo" : "";
            ponto.addEventListener("click", function(){ irParaFoto(i); });
            pontosContentor.appendChild(ponto);
        });

        indice = 0;
        pista.style.transform = "translateX(0%)";
        modal.classList.add("ativo");
    }

    function fecharModal(){
        modal.classList.remove("ativo");
    }

    document.querySelectorAll("[data-post]").forEach(function(botao){
        botao.addEventListener("click", function(){
            abrirPost(botao.dataset.post);
        });
    });

    if (botaoSeguinte) botaoSeguinte.addEventListener("click", function(){ irParaFoto(indice + 1); });
    if (botaoAnterior) botaoAnterior.addEventListener("click", function(){ irParaFoto(indice - 1); });
    botaoFechar.addEventListener("click", fecharModal);
    modal.addEventListener("click", function(e){
        if (e.target === modal) fecharModal();
    });
    document.addEventListener("keydown", function(e){
        if (e.key === "Escape") fecharModal();
    });
}

function iniciarPesquisaBlog(){
    const campo = document.querySelector("#pesquisaBlog");
    if (!campo) return;

    const posts = document.querySelectorAll(".post-card");
    const mensagemVazia = document.querySelector(".blog-vazio");

    campo.addEventListener("input", function(){
        const termo = campo.value.toLowerCase().trim();
        let algumVisivel = false;

        posts.forEach(function(post){
            const texto = post.textContent.toLowerCase();
            const mostrar = texto.includes(termo);
            post.style.display = mostrar ? "" : "none";
            if (mostrar) algumVisivel = true;
        });

        if (mensagemVazia) mensagemVazia.hidden = algumVisivel;
    });
} 
function iniciarTermos(){
    const checkbox = document.querySelector("#aceitar-termos");
    const botao = document.querySelector("#botaoConfirmarTermos");
    const mensagem = document.querySelector("#mensagemTermosOk");
    if (!checkbox || !botao) return;

    checkbox.addEventListener("change", function(){
        botao.disabled = !checkbox.checked;
    });

    botao.addEventListener("click", function(){
        if (mensagem) mensagem.classList.add("visivel");
    });
}
function iniciarHeroSlider(){
    const slides = document.querySelectorAll("#heroSlider .hero-slide");
    if (slides.length < 2) return;

    let indice = 0;
    setInterval(function(){
        slides[indice].classList.remove("activo");
        indice = (indice + 1) % slides.length;
        slides[indice].classList.add("activo");
    }, 5000);
}