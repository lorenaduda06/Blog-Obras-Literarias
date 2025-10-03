// Aluna: Lorena Eduarda

function showMessage(text) {
    document.getElementById("recado-texto").innerText = text;
    document.getElementById("recado").style.display = 'block';
};

function closeMessage() {
    document.getElementById("recado").style.display = 'none';
};

// =========================== CADASTRO ===========================
function cadastrarUser() {
    let nomeCad = document.getElementById("nome-cad").value;
    let emailCad = document.getElementById("email-cad").value;
    let senhaCad = document.getElementById("senha-cad").value;
    let dataNascCad = document.getElementById("nasc-cad").value;
    let sexoCad = document.getElementById("sexo-cad").value;

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
        showMessage('Cadastro realizado com sucesso!');

        document.getElementById("nome-cad").value = "";
        document.getElementById("email-cad").value = "";
        document.getElementById("senha-cad").value = "";
        document.getElementById("nasc-cad").value = "";
        document.getElementById("sexo-cad").value = "";
    }
};

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

                // Habilita campo com comentário
                document.getElementById("campo-comentario").style.display = 'block';
                document.getElementById("para-comentar").style.display = 'none';
            } 
            else {
                showMessage("Email ou senha incorretos");
            }
        }); 
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
    })
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