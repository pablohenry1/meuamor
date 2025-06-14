// Navigation
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current nav item
            const currentNavLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (currentNavLink && currentNavLink.classList.contains('nav-link')) {
                currentNavLink.classList.add('active');
            }
        }

        // Quiz functionality
        let currentQuestionIndex = 0;
        let selectedAnswer = null;
        let score = 0;

        const questions = [
            {
                question: "onde foi o nosso primeiro encontro?",
                options: [
                    "cinema ilha",
                    "açai do grego",
                    "pastel praia da bica",
                    "tulipa"
                ],
                correct: 1,
                explanation: "Foi no grego em que saimos sozinhos pela primeira vez ❤️"
            },
            {
                question: "Qual foi o dia em que a gente se viu pela primeira vez ?",
                options: [
                    "05 de outubro de 2024",
                    "06 de outubro de 2024",
                    "30 de setembro de 2024",
                    "29 de setembro de 2024"
                ],
                correct: 1,
                explanation: " dia 6 de outubro, nunca vou esquecer o dia em que eu te vi pela primeira vez.."
            },
            {
                question: "O que eu fiz pra você comer a primeira vez que você foi lá em casa?",
                options: [
                    "macarrão",
                    "Hamburguer",
                    "batata frita",
                    "frango de feira"
                ],
                correct: 1,
                explanation: "fiz um hambuguer com bacon pra gente hehe"
            },
            {
                question: "Qual foi o primeiro filme que a gente assistiu no cinema?",
                options: [
                    "Operação Vingança",
                    "Branca de Neve",
                    "lilo & stitch",
                    "Coringa Delírio à Dois"
                ],
                correct: 1,
                explanation: "branca de neve, que de branca não tinha nada e era feia que dói, maas foi o nosso primeiro cinema juntos te amo vida 💕"
            }
        ];

        function selectOption(button, index) {
            // Remove selection from all options
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(option => option.classList.remove('selected'));
            
            // Select current option
            button.classList.add('selected');
            selectedAnswer = index;
            
            // Enable next button
            document.querySelector('.quiz-button').disabled = false;
        }

        function nextQuestion() {
            if (selectedAnswer === null) return;
            
            // Check if answer is correct
            if (selectedAnswer === questions[currentQuestionIndex].correct) {
                score++;
            }
            
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showQuizResult();
            }
            
            selectedAnswer = null;
        }

        function loadQuestion() {
            const question = questions[currentQuestionIndex];
            const quizContent = document.getElementById('quiz-content');
            
            quizContent.innerHTML = `
                <div class="quiz-question">${question.question}</div>
                <div class="quiz-options">
                    ${question.options.map((option, index) => 
                        `<button class="quiz-option" onclick="selectOption(this, ${index})">${option}</button>`
                    ).join('')}
                </div>
                <button class="quiz-button" onclick="nextQuestion()" disabled>
                    ${currentQuestionIndex === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima Pergunta'}
                </button>
            `;
        }

        function showQuizResult() {
            const percentage = Math.round((score / questions.length) * 100);
            let message, emoji;
            
            if (percentage === 100) {
                message = "PERFEITO! Você conhece nossa história melhor do que eu imaginava! 🏆";
                emoji = "🥰";
            } else if (percentage >= 75) {
                message = "EXCELENTE! Você conhece muito bem nossa história! ⭐";
                emoji = "😍";
            } else if (percentage >= 50) {
                message = "MUITO BOM! Você lembra dos momentos mais importantes! 💕";
                emoji = "😊";
            } else {
                message = "AINDA APRENDENDO! O importante é que estamos criando novas memórias! 💖";
                emoji = "🥰";
            }
            
            const quizContent = document.getElementById('quiz-content');
            quizContent.innerHTML = `
                <div class="quiz-result">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
                    <h3>${message}</h3>
                    <div class="score">${score} de ${questions.length}</div>
                    <p style="font-size: 1.2rem; color: #666; margin-bottom: 2rem;">
                        ${percentage}% de acertos
                    </p>
                    <button class="quiz-button" onclick="restartQuiz()">Tentar Novamente</button>
                </div>
            `;
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            selectedAnswer = null;
            score = 0;
            loadQuestion();
        }

        // Add smooth scrolling and animations
        document.addEventListener('DOMContentLoaded', function() {
            // Add animation classes to elements when they come into view
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                    }
                });
            }, observerOptions);

            // Observe all timeline items and cards
            document.querySelectorAll('.timeline-item, .card, .gallery-item').forEach(el => {
                observer.observe(el);
            });
        });
        