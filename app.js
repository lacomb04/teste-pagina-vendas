// Quiz Data from JSON
const quizData = {
  "quiz_questions": [
    {
      "id": 1,
      "question": "Com que frequência você consome alimentos processados?",
      "options": [
        {"text": "Nunca", "points": 4},
        {"text": "Raramente", "points": 3},
        {"text": "Às vezes", "points": 2},
        {"text": "Frequentemente", "points": 1}
      ]
    },
    {
      "id": 2,
      "question": "Quantos copos de água você bebe por dia?",
      "options": [
        {"text": "8 ou mais", "points": 4},
        {"text": "6-7 copos", "points": 3},
        {"text": "4-5 copos", "points": 2},
        {"text": "Menos de 4", "points": 1}
      ]
    },
    {
      "id": 3,
      "question": "Com que frequência você pratica exercícios?",
      "options": [
        {"text": "Diariamente", "points": 4},
        {"text": "4-5x por semana", "points": 3},
        {"text": "2-3x por semana", "points": 2},
        {"text": "Raramente", "points": 1}
      ]
    },
    {
      "id": 4,
      "question": "Como está a qualidade do seu sono?",
      "options": [
        {"text": "Excelente", "points": 4},
        {"text": "Boa", "points": 3},
        {"text": "Regular", "points": 2},
        {"text": "Ruim", "points": 1}
      ]
    },
    {
      "id": 5,
      "question": "Você tem problemas digestivos?",
      "options": [
        {"text": "Nunca", "points": 4},
        {"text": "Raramente", "points": 3},
        {"text": "Às vezes", "points": 2},
        {"text": "Frequentemente", "points": 1}
      ]
    },
    {
      "id": 6,
      "question": "Com que frequência consome álcool?",
      "options": [
        {"text": "Nunca", "points": 4},
        {"text": "Ocasionalmente", "points": 3},
        {"text": "Fins de semana", "points": 2},
        {"text": "Regularmente", "points": 1}
      ]
    },
    {
      "id": 7,
      "question": "Como estão seus níveis de energia?",
      "options": [
        {"text": "Sempre alto", "points": 4},
        {"text": "Geralmente bom", "points": 3},
        {"text": "Às vezes baixo", "points": 2},
        {"text": "Sempre cansado", "points": 1}
      ]
    }
  ],
  "result_categories": [
    {
      "min_score": 25,
      "max_score": 28,
      "level": "Nível Baixo de Toxinas",
      "color": "#10B981",
      "emoji": "🌟",
      "description": "Parabéns! Seus hábitos estão no caminho certo. Nosso ebook ajudará você a otimizar ainda mais sua saúde.",
      "recommendation": "Continue mantendo seus bons hábitos e aprenda técnicas avançadas de detox para maximizar seu bem-estar."
    },
    {
      "min_score": 19,
      "max_score": 24,
      "level": "Nível Moderado de Toxinas",
      "color": "#F59E0B",
      "emoji": "⚡",
      "description": "Você está no caminho certo, mas há espaço para melhorias. Nosso ebook oferece estratégias práticas para elevar sua saúde.",
      "recommendation": "Implemente mudanças graduais com nosso guia estruturado para alcançar o próximo nível de vitalidade."
    },
    {
      "min_score": 13,
      "max_score": 18,
      "level": "Nível Alto de Toxinas",
      "color": "#F97316",
      "emoji": "⚠️",
      "description": "Sua saúde precisa de atenção urgente. É hora de fazer mudanças significativas com nosso guia completo.",
      "recommendation": "Nosso ebook fornece um plano detalhado para reverter os danos e restaurar sua energia natural."
    },
    {
      "min_score": 7,
      "max_score": 12,
      "level": "Nível Crítico de Toxinas",
      "color": "#DC2626",
      "emoji": "🚨",
      "description": "ALERTA: Seu corpo está sobrecarregado de toxinas. Ação imediata é necessária para prevenir problemas maiores.",
      "recommendation": "Comece hoje mesmo nossa transformação de 21 dias. Sua saúde não pode esperar!"
    }
  ],
  "ebook_details": {
    "title": "Ebook Detox Fit: Transformação em 21 Dias",
    "original_price": "R$ 97",
    "discount_price": "R$ 47",
    "benefits": [
      "Plano completo de detox de 21 dias",
      "50+ receitas de sucos e smoothies detox",
      "Guia de exercícios para acelerar a eliminação de toxinas",
      "Lista de alimentos que devem ser evitados",
      "Técnicas de respiração e meditação",
      "Cronograma dia a dia do programa",
      "Bônus: Guia de suplementos naturais"
    ],
    "guarantee": "Garantia incondicional de 30 dias",
    "testimonials": [
      {"name": "Maria Silva", "text": "Perdi 8kg em 21 dias e me sinto renascida!", "rating": 5},
      {"name": "João Santos", "text": "Minha energia aumentou incrivelmente!", "rating": 5},
      {"name": "Ana Costa", "text": "Nunca me senti tão bem na minha vida!", "rating": 5}
    ]
  }
};

// Quiz State
let currentQuestionIndex = 0;
let answers = [];
let totalScore = 0;
let isTransitioning = false;

// DOM Elements
const heroSection = document.getElementById('hero-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const startQuizBtn = document.getElementById('start-quiz-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercentage = document.querySelector('.progress-percentage');
const questionTitle = document.getElementById('question-title');
const questionOptions = document.getElementById('question-options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const questionCard = document.getElementById('question-card');
const ctaButton = document.getElementById('cta-button');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addInteractionEffects();
    setupAccessibility();
    
    // Preload background images
    preloadImages();
});

function initializeEventListeners() {
    startQuizBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add CTA tracking
    if (ctaButton) {
        ctaButton.addEventListener('click', trackCTAClick);
    }
}

function preloadImages() {
    const images = [
        'https://pplx-res.cloudinary.com/image/upload/v1748873516/gpt4o_images/cg98h15sx5wxbhg2bwgr.png',
        'https://pplx-res.cloudinary.com/image/upload/v1748873605/gpt4o_images/ot75hdiaosxkraqb8xxq.png',
        'https://pplx-res.cloudinary.com/image/upload/v1748873457/pplx_project_search_images/92e08f9c486841a6a76b0a67c38fc87054f2e260.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function startQuiz() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Add loading state
    startQuizBtn.innerHTML = '<span>Carregando...</span>';
    startQuizBtn.disabled = true;
    
    // Animate hero section out
    heroSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        heroSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        
        // Reset and show quiz section
        quizSection.style.opacity = '0';
        quizSection.style.transform = 'translateY(50px)';
        
        // Force reflow
        quizSection.offsetHeight;
        
        setTimeout(() => {
            quizSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            quizSection.style.opacity = '1';
            quizSection.style.transform = 'translateY(0)';
            
            // Initialize first question
            displayQuestion();
            isTransitioning = false;
        }, 50);
    }, 300);
}

function displayQuestion() {
    if (currentQuestionIndex >= quizData.quiz_questions.length) {
        finishQuiz();
        return;
    }
    
    const question = quizData.quiz_questions[currentQuestionIndex];
    
    // Update progress with animation
    updateProgress();
    
    // Animate question card
    animateQuestionCard(() => {
        // Update question content
        questionTitle.textContent = question.question;
        questionTitle.setAttribute('tabindex', '-1');
        
        // Clear and populate options
        questionOptions.innerHTML = '';
        questionOptions.setAttribute('aria-label', question.question);
        
        question.options.forEach((option, index) => {
            const button = createOptionButton(option, index);
            questionOptions.appendChild(button);
        });
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Focus management for accessibility
        setTimeout(() => {
            questionTitle.focus();
        }, 100);
    });
}

function createOptionButton(option, index) {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option.text;
    button.dataset.points = option.points;
    button.dataset.optionIndex = index;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('tabindex', '0');
    
    // Check if this option was previously selected
    const previousAnswer = answers[currentQuestionIndex];
    if (previousAnswer && previousAnswer.optionIndex === index) {
        button.classList.add('selected');
        button.setAttribute('aria-checked', 'true');
    }
    
    // Add event listeners
    button.addEventListener('click', () => selectOption(button, option, index));
    button.addEventListener('keydown', handleOptionKeydown);
    
    // Add hover effect
    button.addEventListener('mouseenter', () => addHoverEffect(button));
    button.addEventListener('mouseleave', () => removeHoverEffect(button));
    
    return button;
}

function selectOption(button, option, optionIndex) {
    if (isTransitioning) return;
    
    // Remove selection from other options
    const allOptions = questionOptions.querySelectorAll('.option-button');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.setAttribute('aria-checked', 'false');
    });
    
    // Add selection to clicked option
    button.classList.add('selected');
    button.setAttribute('aria-checked', 'true');
    
    // Add ripple effect
    createRipple(button);
    
    // Haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Store answer
    answers[currentQuestionIndex] = {
        questionId: quizData.quiz_questions[currentQuestionIndex].id,
        points: option.points,
        optionIndex: optionIndex,
        text: option.text
    };
    
    // Show next button
    nextBtn.classList.remove('hidden');
    
    // Auto-advance after selection (with delay for UX)
    setTimeout(() => {
        if (currentQuestionIndex < quizData.quiz_questions.length - 1) {
            nextQuestion();
        } else {
            finishQuiz();
        }
    }, 800);
}

function nextQuestion() {
    if (isTransitioning) return;
    
    if (currentQuestionIndex < quizData.quiz_questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (isTransitioning || currentQuestionIndex <= 0) return;
    
    currentQuestionIndex--;
    displayQuestion();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.quiz_questions.length) * 100;
    const progressElement = progressFill;
    
    // Animate progress bar
    progressElement.style.width = `${progress}%`;
    
    // Update text
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.quiz_questions.length}`;
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }
    
    // Add progress milestone celebrations
    if (progress === 50) {
        celebrateProgress('Você está na metade! 🎉');
    } else if (progress === 100) {
        celebrateProgress('Parabéns! Quiz concluído! 🎊');
    }
}

function celebrateProgress(message) {
    // Create temporary celebration message
    const celebration = document.createElement('div');
    celebration.textContent = message;
    celebration.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        animation: celebrationSlide 3s ease-out forwards;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.parentNode.removeChild(celebration);
        }
    }, 3000);
}

function animateQuestionCard(callback) {
    isTransitioning = true;
    
    // Animate out
    questionCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    questionCard.style.opacity = '0';
    questionCard.style.transform = 'translateX(-30px) scale(0.95)';
    
    setTimeout(() => {
        // Execute callback to update content
        callback();
        
        // Animate in
        questionCard.style.transform = 'translateX(30px) scale(0.95)';
        
        setTimeout(() => {
            questionCard.style.opacity = '1';
            questionCard.style.transform = 'translateX(0) scale(1)';
            isTransitioning = false;
        }, 50);
    }, 200);
}

function updateNavigationButtons() {
    // Show/hide previous button
    if (currentQuestionIndex > 0) {
        prevBtn.classList.remove('hidden');
    } else {
        prevBtn.classList.add('hidden');
    }
    
    // Update next button
    const hasAnswer = answers[currentQuestionIndex];
    if (hasAnswer) {
        nextBtn.classList.remove('hidden');
        nextBtn.innerHTML = currentQuestionIndex === quizData.quiz_questions.length - 1 
            ? 'Ver Resultado <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>' 
            : 'Próxima <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
    } else {
        nextBtn.classList.add('hidden');
    }
}

function finishQuiz() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Calculate total score
    totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    
    // Animate quiz section out
    quizSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    quizSection.style.opacity = '0';
    quizSection.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        quizSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // Reset result section
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            resultSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
            
            displayResult();
            isTransitioning = false;
        }, 50);
    }, 300);
}

function displayResult() {
    const resultData = getResultData(totalScore);
    
    // Update result elements
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultRecommendation = document.getElementById('result-recommendation');
    const resultEmoji = document.getElementById('result-emoji');
    
    if (resultTitle) {
        resultTitle.textContent = resultData.level;
        resultTitle.style.color = resultData.color;
    }
    
    if (resultDescription) {
        resultDescription.textContent = resultData.description;
    }
    
    if (resultRecommendation) {
        resultRecommendation.textContent = resultData.recommendation;
    }
    
    if (resultEmoji) {
        resultEmoji.textContent = resultData.emoji;
    }
    
    // Trigger animations
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.result-card, .offer-card, .testimonials');
        animatedElements.forEach((element, index) => {
            if (element) {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('animate-in');
            }
        });
    }, 100);
    
    // Track result for analytics
    trackQuizCompletion(resultData);
}

function getResultData(score) {
    const categories = quizData.result_categories;
    
    for (let category of categories) {
        if (score >= category.min_score && score <= category.max_score) {
            return category;
        }
    }
    
    // Fallback to critical level
    return categories[categories.length - 1];
}

// Interactive Effects
function addInteractionEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });
    
    // Add floating animation to logo
    const logo = document.querySelector('.main-logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05) rotate(2deg)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

function createRipple(button, event = null) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    let x, y;
    if (event && event.clientX) {
        const rect = button.getBoundingClientRect();
        x = event.clientX - rect.left - radius;
        y = event.clientY - rect.top - radius;
    } else {
        x = button.clientWidth / 2 - radius;
        y = button.clientHeight / 2 - radius;
    }
    
    circle.style.cssText = `
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    circle.classList.add('ripple-effect');
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(circle);
    
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 600);
}

function addHoverEffect(element) {
    element.style.transform = 'translateY(-2px) scale(1.01)';
}

function removeHoverEffect(element) {
    if (!element.classList.contains('selected')) {
        element.style.transform = 'translateY(0) scale(1)';
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    if (quizSection.classList.contains('hidden')) return;
    
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (currentQuestionIndex > 0) {
                previousQuestion();
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (answers[currentQuestionIndex]) {
                nextQuestion();
            }
            break;
        case '1':
        case '2':
        case '3':
        case '4':
            e.preventDefault();
            const optionIndex = parseInt(e.key) - 1;
            const options = questionOptions.querySelectorAll('.option-button');
            if (options[optionIndex]) {
                options[optionIndex].click();
            }
            break;
        case 'Enter':
        case ' ':
            if (document.activeElement.classList.contains('option-button')) {
                e.preventDefault();
                document.activeElement.click();
            }
            break;
    }
}

function handleOptionKeydown(e) {
    const options = Array.from(questionOptions.querySelectorAll('.option-button'));
    const currentIndex = options.indexOf(e.target);
    
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
            options[prevIndex].focus();
            break;
        case 'ArrowDown':
            e.preventDefault();
            const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
            options[nextIndex].focus();
            break;
        case 'Enter':
        case ' ':
            e.preventDefault();
            e.target.click();
            break;
    }
}

// Accessibility Setup
function setupAccessibility() {
    // Add ARIA labels and roles
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
    }
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
    };
}

// Analytics and Tracking
function trackQuizCompletion(resultData) {
    // Track quiz completion event
    const eventData = {
        event: 'quiz_completed',
        score: totalScore,
        result_level: resultData.level,
        questions_answered: answers.length,
        timestamp: new Date().toISOString()
    };
    
    // Send to analytics (placeholder)
    console.log('Quiz Completion:', eventData);
    
    // You can integrate with Google Analytics, Mixpanel, etc. here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_completed', {
            'custom_parameter_score': totalScore,
            'custom_parameter_level': resultData.level
        });
    }
}

function trackCTAClick() {
    // Track CTA click event
    const eventData = {
        event: 'cta_clicked',
        source: 'quiz_result',
        user_score: totalScore,
        timestamp: new Date().toISOString()
    };
    
    console.log('CTA Clicked:', eventData);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'engagement',
            'event_label': 'ebook_cta',
            'custom_parameter_score': totalScore
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes celebrationSlide {
        0% {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        10%, 90% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    /* Focus indicators for better accessibility */
    .option-button:focus-visible {
        outline: 3px solid #10B981;
        outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .btn--pulse {
            animation: none !important;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .option-button {
            border: 2px solid currentColor !important;
        }
        
        .option-button.selected {
            background: CanvasText !important;
            color: Canvas !important;
        }
    }
`;

document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application Error:', e.error);
    
    // Fallback UI in case of errors
    if (e.error && e.error.message) {
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #DC2626;
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
        `;
        errorMessage.textContent = 'Ops! Algo deu errado. Tente recarregar a página.';
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 5000);
    }
});

// Performance monitoring
if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark('quiz-app-loaded');
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('App ready for PWA enhancement');
    });
}