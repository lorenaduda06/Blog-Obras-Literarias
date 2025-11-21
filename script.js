// Aluna: Lorena Eduarda

function showMessage(text) {
    document.getElementById("recado-texto").innerText = text;
    document.getElementById("recado").style.display = 'block';
};

function closeMessage() {
    document.getElementById("recado").style.display = 'none';
};

// =========================== CAMPO DE BUSCA  ===========================
// Array para guardar todas as obras (livros, séries e filmes)
const catalogo = [
    { titulo: "Outlander: A Viajante do Tempo - livro 1", categoria: "Livros", url: "obras.html", id_obra: 1 },
    { titulo: "Bridgerton: O Duque e Eu - livro 1", categoria: "Livros", url: "obras.html", id_obra: 2 },
    { titulo: "O Verão que Mudou a Minha Vida", categoria: "Livros", url: "obras.html", id_obra: 3 },
    { titulo: "Anne With An E", categoria: "Livros", url: "obras.html", id_obra: 4 },
    { titulo: "It - a Coisa", categoria: "Livros", url: "obras.html", id_obra: 5 },
    { titulo: "Crepúsculo", categoria: "Livros", url: "obras.html", id_obra: 6 },
    { titulo: "A Cabana", categoria: "Livros", url: "obras.html", id_obra: 7 },
    { titulo: "Orgulho e Preconceito", categoria: "Livros", url: "obras.html", id_obra: 8 },
    { titulo: "Outlander", categoria: "Series", url: "series.html", id_obra: 9 },
    { titulo: "Bridgerton", categoria: "Series", url: "series.html", id_obra: 10 },
    { titulo: "O Verão que Mudou a Minha Vida", categoria: "Series", url: "series.html", id_obra: 11 },
    { titulo: "Anne With An E", categoria: "Series", url: "series.html", id_obra: 12 },
    { titulo: "Orgulho e Preconceito", categoria: "Filmes", url: "filmes.html", id_obra: 13 },
    { titulo: "It - a Coisa", categoria: "Filmes", url: "filmes.html", id_obra: 14 },
    { titulo: "Crepúsculo", categoria: "Filmes", url: "filmes.html", id_obra: 15 },
    { titulo: "A Cabana", categoria: "Filmes", url: "filmes.html", id_obra: 16 },
]

document.addEventListener('DOMContentLoaded', () => {
    const input_busca = document.getElementById("input-busca");
    const btn_busca = document.getElementById("btn-busca");

    if (btn_busca) {
        btn_busca.addEventListener("click", buscarObra);
    }
});

function buscarObra() {
    const input_busca = document.getElementById("input-busca");
    const termo_busca = input_busca.value.toLowerCase().trim();
    const conteudo_padrao = document.getElementById("container-principal");
    const resultados_container = document.getElementById("resultados-busca");

    if (termo_busca === "") {
        if (resultados_container) {
            resultados_container.style.display = "none";
        }

        if (conteudo_padrao) {
            conteudo_padrao.style.display = "block";
        }

        if (resultados_container) {
            resultados_container.innerHTML = "";
        }
        return;
    }

    const resultado_busca = catalogo.filter(item => {
        // Será retornado TRUE se o termo buscado estiver no título do item
        return item.titulo.toLowerCase().includes(termo_busca);
    });

    if (conteudo_padrao) {
        conteudo_padrao.style.display = "none";
    }

    if (resultados_container) {
        resultados_container.style.display = "block";
        resultados_container.innerHTML = "";
    }

    if (resultado_busca.length === 0) {
        if (resultados_container) {
            showMessage('Nenhum título foi encontrado');
        }
        return;
    }

    // Caso a obra exista na página
    let obrasEncontradas_html = "";

    resultado_busca.forEach(item => {
        obrasEncontradas_html += `
            <a href="${item.url}#${item.id_obra}" class="resultado-item">
                <h3>${item.titulo}</h3>
                <p>Categoria: ${item.categoria}</p>
            </a>
        `;
    });

    resultados_container.innerHTML = obrasEncontradas_html;
    input_busca.value = "";
}

// =========================== CADASTRO ===========================
function cadastrarUser() {
    let nomeCad = document.getElementById("nome-cad").value;
    let emailCad = document.getElementById("email-cad").value;
    let senhaCad = document.getElementById("senha-cad").value;
    let dataNascCad = document.getElementById("nasc-cad").value;
    let sexoCad = document.getElementById("sexo-cad").value;

    const data_atual = new Date();
    const ano = data_atual.getFullYear();
    const mes = data_atual.getMonth();
    const dia = data_atual.getDate();

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    let existeCadastro = usuarios.find(user => user.email === emailCad);

    if (existeCadastro) {
        showMessage('Erro: já tem um usuário cadastrado com esse email');
        return;
    }
    else {
        let novoCad = {
            nome: nomeCad,
            senha: senhaCad,
            email: emailCad,
            dataNasc: dataNascCad,
            sexo: sexoCad
        };

        usuarios.push(novoCad);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        showMessage(dia + '/' + mes + '/' + ano + '\nCadastro realizado com sucesso!');

        document.getElementById("nome-cad").value = "";
        document.getElementById("email-cad").value = "";
        document.getElementById("senha-cad").value = "";
        document.getElementById("nasc-cad").value = "";
        document.getElementById("sexo-cad").value = "";
    }
};

// =========================== LIMPAR FORMULÁRIO CADASTRO ===========================
function limparFormulario() {
    let btnLimpar = document.getElementById("btn-limpar");

    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            document.getElementById("nome-cad").value = "";
            document.getElementById("email-cad").value = "";
            document.getElementById("senha-cad").value = "";
            document.getElementById("nasc-cad").value = "";
            document.getElementById("sexo-cad").value = "";
        });
    }
}

limparFormulario();

// =========================== LOGIN ===========================
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            let emailLogin = document.getElementById("email-login").value;
            let senhaLogin = document.getElementById("senha-login").value;

            let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

            let usuario = usuarios.find(user => user.email === emailLogin && user.senha === senhaLogin);

            if (usuario) {
                showMessage("Login realizado com sucesso!");

                localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
                localStorage.setItem("emailLogado", emailLogin);

                // Habilita campo com comentário
                document.getElementById("campo-comentario").style.display = 'block';
                document.getElementById("para-comentar").style.display = 'none';

                // Habilita botão de sair da conta
                let btnSair = document.getElementById("sair");

                btnSair.style.display = 'inline-block';
            } 
            else {
                showMessage("Email ou senha incorretos");
            }
        }); 
    }
});

// =========================== CONSULTA DOS DADOS CADASTRADOS ===========================
function exibirDados() {
    let dadosUser = JSON.parse(localStorage.getItem("usuarios") || "[]");

    let email_logado = localStorage.getItem("emailLogado");

    if (!email_logado) {
        console.error("Erro: não foi encontrado nenhum usuário logado");
        return;
    }

    let usuario_logado = dadosUser.find(user => user.email === email_logado);

    if (usuario_logado) {
        let nome_salvo = document.getElementById("nomeSalvo");
        let email_salvo = document.getElementById("emailSalvo");
        let nasc_salvo = document.getElementById("nascSalvo");
        let sexo_salvo = document.getElementById("sexoSalvo");

        nome_salvo.textContent = usuario_logado.nome;
        email_salvo.textContent = usuario_logado.email;
        nasc_salvo.textContent = usuario_logado.dataNasc;
        sexo_salvo.textContent = usuario_logado.sexo;
    }
    else {
        console.error("Usuário não foi encontrado na lista de cadastros");
    }
}

// Chamada da função quando a página recarregar
document.addEventListener('DOMContentLoaded', exibirDados);

// =========================== DELETAR CADASTRO ===========================
function excluirCad() {
    // Email do usuário que deseja deletar sua conta
    let email_logado = localStorage.getItem("emailLogado");
    
    if (!email_logado) {
        alert('Erro: não há usuário logado');
        return;
    }

    // Confirmação se usuário deseja excluir sua conta
    const resp = confirm("Deseja realmente exluir sua conta?");

    if (!resp) {
        return;
    }

    // Lista completa de usuários
    let dadosUser = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Criação de uma nova lista sem o usuário logado
    let listaUsers = dadosUser.filter(user => user.email !== email_logado);

    // A nova lista é salva no local storage
    localStorage.setItem("usuarios", JSON.stringify(listaUsers));

    // Remover login
    localStorage.removeItem("emailLogado");
    localStorage.removeItem("usuarioLogado");

    alert("Cadastro de usuário deletado com sucesso!");
    window.location.href = "index.html";
};

document.addEventListener('DOMContentLoaded', () => {
    exibirDados();

    let btExcluirCad = document.getElementById("bt-deletar");

    if (btExcluirCad) {
        btExcluirCad.addEventListener("click", excluirCad);
    }
});

// =========================== COMENTARIOS ===========================
const btnEnviar = document.getElementById("enviar-comentario");
const btnSair = document.getElementById("sair");

function carregarComentarios() {
    let lista = document.getElementById("lista-comentarios");

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        if (btnSair) {
            btnSair.style.display = "none";
        }
        document.getElementById("campo-comentario").style.display = 'none';
        document.getElementById("para-comentar").style.display = 'block';
    }
    else {
        if (btnSair) {
            btnSair.style.display = "inline-block";
        }
        document.getElementById("campo-comentario").style.display = 'block';
        document.getElementById("para-comentar").style.display = 'none';
    }

    let comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");

    if (comentarios.length > 0) {
        lista.style.display = 'block';
        lista.innerHTML = "";

        comentarios.forEach(item => {
            let novoComentario = document.createElement("div");
            novoComentario.classList.add("comentario");

            let cabecalho = document.createElement("strong");
            cabecalho.textContent = `${item.nome} - ${item.dataHora}`;


            let corpo = document.createElement("p");
            corpo.textContent = item.texto;

            novoComentario.appendChild(cabecalho);
            novoComentario.appendChild(corpo);

            lista.appendChild(novoComentario);
        });
    }
    else {
        lista.style.display = "none";
    }
}

if (btnEnviar) {
    btnEnviar.addEventListener("click", function() {  

        let comentario = document.getElementById("comentario").value.trim();

        if (comentario === "") {
            showMessage('Preencha este campo para enviar');
            return;
        }

        let comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
    
        let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

        let agora = new Date();

        let dataHora = agora.toLocaleString("pt-BR");

        comentarios.push ({
            nome: usuarioLogado.nome,
            texto: comentario,
            dataHora: dataHora
        });

        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        carregarComentarios();

        document.getElementById("comentario").value = "";
    });
}

if (btnSair) {
    btnSair.addEventListener("click", function() {
        localStorage.removeItem("usuarioLogado");
        showMessage('Logout');

        document.getElementById("campo-comentario").style.display = "none";
        document.getElementById("para-comentar").style.display = "block";

        document.getElementById("comentario").value = "";

    })
}

carregarComentarios();