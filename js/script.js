/*
 * PROJETO GROWMIND - JAVASCRIPT PRINCIPAL
 * * Funcionalidades:
 * 1. Menu Responsivo (Hambúrguer)
 * 2. Validação de Formulário (Contato)
 * 3. Quiz Interativo e Lógica de Progresso (Cursos)
 * 4. Gestão de Estado (localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ============================================================
       1. MENU RESPONSIVO 
       ============================================================ */
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const menuLinks = document.querySelector('.menu-links');

    if (menuHamburguer && menuLinks) {
        menuHamburguer.addEventListener('click', () => {
            // Alterna a classe 'ativo' no menu e no botão
            menuLinks.classList.toggle('ativo');
            menuHamburguer.classList.toggle('ativo');
        });
    }


    /* ============================================================
       2. VALIDAÇÃO DE FORMULÁRIO 
       ============================================================ */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Impede o envio padrão do formulário 
            e.preventDefault();
            
            let isValid = true;

            // Seleção dos campos
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            // Função auxiliar para mostrar erro
            const setError = (element, message) => {
                const inputControl = element.parentElement;
                const errorDisplay = inputControl.querySelector('.error-message');

                errorDisplay.innerText = message;
                errorDisplay.style.display = 'block';
                element.classList.add('error');
                isValid = false;
            };

            // Função auxiliar para limpar erro
            const clearError = (element) => {
                const inputControl = element.parentElement;
                const errorDisplay = inputControl.querySelector('.error-message');

                errorDisplay.innerText = '';
                errorDisplay.style.display = 'none';
                element.classList.remove('error');
            };

            // Validação do Nome
            if (nome.value.trim() === '') {
                setError(nome, 'O nome é obrigatório.');
            } else {
                clearError(nome);
            }

            // Validação do e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                setError(email, 'Digite um e-mail válido.');
            } else {
                clearError(email);
            }

            // Validação da mensagem
            if (mensagem.value.trim().length < 10) {
                setError(mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
            } else {
                clearError(mensagem);
            }

            // Se tudo estiver válido
            if (isValid) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset(); // Limpa os campos
            }
        });
    }

    /* ============================================================
       3. QUIZ INTERATIVO E PROGRESSO
       ============================================================ */
    const quizForm = document.getElementById('quiz-form');

    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Respostas corretas 
            const correctAnswers = {
                q1: 'b',
                q2: 'b'
            };

            let score = 0;
            let totalQuestions = 2;
            const formData = new FormData(quizForm);
            
            // Verifica as respostas
            for (let [key, value] of formData.entries()) {
                if (value === correctAnswers[key]) {
                    score++;
                }
            }

            // Exibe o resultado
            const resultDiv = document.getElementById('quiz-result');
            const submitBtn = document.getElementById('quiz-submit'); // Pegamos o botão
            
            resultDiv.style.display = 'block';

            if (score === totalQuestions) {
                // SUCESSO!
                resultDiv.className = 'success';
                resultDiv.innerHTML = `Parabéns! Você acertou ${score}/${totalQuestions}. <br> Módulo concluído!`;
                
                // 1. Salva no LocalStorage
                localStorage.setItem('curso_psicologia_completo', 'true');
                
                // 2. Muda o texto do botão
                submitBtn.innerText = "Voltar para Cursos";
                
                // 3. Muda o tipo do botão para não submeter o formulário de novo
                submitBtn.type = "button"; 

                // 4. Cria o evento de clique para redirecionar
                submitBtn.onclick = function() {
                    // Redireciona para a página de cursos
                    // Como ambos estão na pasta HTML, basta o nome do arquivo
                    window.location.href = 'cursos.html';
                };
                
            } else {
                // ERRO
                resultDiv.className = 'fail';
                resultDiv.innerHTML = `Você acertou ${score}/${totalQuestions}. <br> Revise o conteúdo e tente novamente.`;
            }
        });
    }


    /* ============================================================
       4. ATUALIZAÇÃO DE STATUS NA DASHBOARD
       ============================================================ */
    // Verifica se estamos na página de cursos procurando pelos cards
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseCards.length > 0) {
        // Verifica se o usuário já completou o curso de psicologia
        const isPsicoComplete = localStorage.getItem('curso_psicologia_completo');

        if (isPsicoComplete === 'true') {
            // Encontra o primeiro card e atualiza
            // Nota: Em um sistema real, usaríamos IDs específicos para cada curso
            const firstCardStatus = courseCards[0].querySelector('.course-status');
            const firstCardBtn = courseCards[0].querySelector('.btn');

            if (firstCardStatus) {
                firstCardStatus.innerText = "Concluído ✔";
                firstCardStatus.style.backgroundColor = "#d4edda"; // Verde claro
                firstCardStatus.style.color = "#155724";
                firstCardStatus.style.borderColor = "#c3e6cb";
            }
            
            if (firstCardBtn) {
                firstCardBtn.innerText = "Revisar Curso";
                firstCardBtn.classList.remove('btn-secondary');
                firstCardBtn.classList.add('btn-primary'); // Muda para verde
            }
        }
    }

});