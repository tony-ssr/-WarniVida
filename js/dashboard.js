/**
 * WarniVida - Dashboard Principal JavaScript
 * Funcionalidades principales para la página de inicio
 * 
 * Autora: Eliana Narvaez Diaz
 * Desarrollador: Antony Salcedo
 * Año: 2025
 * 
 * Funcionalidades incluidas:
 * - Gestión de modales
 * - Animaciones de entrada
 * - Navegación entre vistas
 * - Efectos visuales interactivos
 * - Validaciones básicas
 */

// ===== VARIABLES GLOBALES =====
let currentModal = null;
let isAnimating = false;

// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 WarniVida Dashboard iniciado correctamente');
    
    // Inicializar animaciones de entrada
    initializeEntryAnimations();
    
    // Configurar eventos de los botones
    setupButtonEvents();
    
    // Configurar eventos de teclado
    setupKeyboardEvents();
    
    // Mostrar mensaje de bienvenida en consola
    showWelcomeMessage();
});

// ===== FUNCIONES DE INICIALIZACIÓN =====

/**
 * Inicializa las animaciones de entrada para los elementos
 * Aplica efectos visuales suaves al cargar la página
 */
function initializeEntryAnimations() {
    // Animar elementos con retraso progresivo
    const animatedElements = document.querySelectorAll('.option-card, .feature-item');
    
    animatedElements.forEach((element, index) => {
        // Aplicar retraso basado en el índice del elemento
        element.style.animationDelay = `${(index + 1) * 0.1}s`;
        
        // Agregar clase para activar animación
        element.classList.add('animate-in');
    });
    
    // Efecto de escritura para el título principal
    typeWriterEffect('.welcome-title', 'Bienvenida a tu espacio de bienestar', 50);
}

/**
 * Configura todos los eventos de los botones principales
 * Incluye validaciones y feedback visual
 */
function setupButtonEvents() {
    // Eventos para cerrar modales al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Prevenir cierre al hacer clic dentro del modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
    
    // Efectos hover mejorados para botones
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Configura eventos de teclado para mejorar la accesibilidad
 * Incluye navegación con teclas y atajos
 */
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        // Cerrar modal con tecla Escape
        if (event.key === 'Escape' && currentModal) {
            closeModal(currentModal);
        }
        
        // Atajos de teclado para acciones principales
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'l': // Ctrl+L para login
                    event.preventDefault();
                    showLoginForm();
                    break;
                case 'r': // Ctrl+R para registro
                    event.preventDefault();
                    showRegisterForm();
                    break;
                case 'e': // Ctrl+E para explorar
                    event.preventDefault();
                    startGuestExperience();
                    break;
            }
        }
    });
}

/**
 * Muestra mensaje de bienvenida personalizado en consola
 * Incluye información del proyecto y créditos
 */
function showWelcomeMessage() {
    const welcomeStyle = 'color: #ff6b9d; font-size: 16px; font-weight: bold;';
    const infoStyle = 'color: #8b7d95; font-size: 12px;';
    
    console.log('%c🌸 WarniVida - Plataforma de Salud Reproductiva', welcomeStyle);
    console.log('%cAutora: Eliana Narvaez Diaz', infoStyle);
    console.log('%cDesarrollador: Antony Salcedo', infoStyle);
    console.log('%c© 2025 - Todos los derechos reservados', infoStyle);
    console.log('%c💖 Diseñado con amor para el cuidado femenino', welcomeStyle);
}

// ===== FUNCIONES DE GESTIÓN DE MODALES =====

/**
 * Muestra el formulario de inicio de sesión
 * Incluye validaciones y efectos visuales
 */
function showLoginForm() {
    if (isAnimating) return;
    
    console.log('🔐 Abriendo formulario de inicio de sesión');
    
    const modal = document.getElementById('loginModal');
    if (modal) {
        // Limpiar formulario antes de mostrar
        clearForm('loginForm');
        
        // Mostrar modal con animación
        showModal('loginModal');
        
        // Enfocar primer campo del formulario
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
        
        // Agregar efecto de partículas de fondo
        addParticleEffect(modal);
    }
}

/**
 * Muestra el formulario de registro
 * Incluye validaciones avanzadas y feedback visual
 */
function showRegisterForm() {
    if (isAnimating) return;
    
    console.log('📝 Abriendo formulario de registro');
    
    const modal = document.getElementById('registerModal');
    if (modal) {
        // Limpiar formulario antes de mostrar
        clearForm('registerForm');
        
        // Mostrar modal con animación
        showModal('registerModal');
        
        // Enfocar primer campo del formulario
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
        
        // Agregar efecto de partículas de fondo
        addParticleEffect(modal);
    }
}

/**
 * Inicia la experiencia como invitada
 * Redirige a la vista de exploración sin registro
 */
function startGuestExperience() {
    if (isAnimating) return;
    
    console.log('👁️ Iniciando experiencia como invitada');
    
    // Mostrar indicador de carga
    showLoadingIndicator('Preparando tu experiencia...');
    
    // Simular carga y redireccionar
    setTimeout(() => {
        // Guardar estado de invitada en localStorage
        localStorage.setItem('userType', 'guest');
        localStorage.setItem('guestStartTime', new Date().toISOString());
        
        // Redirigir a la vista principal
        window.location.href = 'vistas/main-app.html';
    }, 2000);
}

/**
 * Muestra un modal específico con animaciones
 * @param {string} modalId - ID del modal a mostrar
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    isAnimating = true;
    currentModal = modalId;
    
    // Mostrar modal
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
    
    // Animar entrada del contenido
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.transform = 'translateY(-50px) scale(0.9)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'all 0.3s ease';
            content.style.transform = 'translateY(0) scale(1)';
            content.style.opacity = '1';
            isAnimating = false;
        }, 50);
    }
}

/**
 * Cierra un modal específico con animaciones
 * @param {string} modalId - ID del modal a cerrar
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal || isAnimating) return;
    
    isAnimating = true;
    
    // Animar salida del contenido
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.transition = 'all 0.3s ease';
        content.style.transform = 'translateY(-50px) scale(0.9)';
        content.style.opacity = '0';
    }
    
    // Ocultar modal después de la animación
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        currentModal = null;
        isAnimating = false;
        
        // Limpiar efectos de partículas
        removeParticleEffect(modal);
    }, 300);
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Limpia todos los campos de un formulario
 * @param {string} formId - ID del formulario a limpiar
 */
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        
        // Remover clases de error si existen
        form.querySelectorAll('.error').forEach(element => {
            element.classList.remove('error');
        });
        
        // Remover mensajes de error
        form.querySelectorAll('.error-message').forEach(element => {
            element.remove();
        });
    }
}

/**
 * Muestra un indicador de carga con mensaje personalizado
 * @param {string} message - Mensaje a mostrar durante la carga
 */
function showLoadingIndicator(message = 'Cargando...') {
    // Crear overlay de carga si no existe
    let loadingOverlay = document.getElementById('loadingOverlay');
    
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-message">${message}</p>
            </div>
        `;
        
        // Estilos para el overlay
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 240, 236, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(loadingOverlay);
    }
    
    // Actualizar mensaje
    const messageElement = loadingOverlay.querySelector('.loading-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    // Mostrar con animación
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
    }, 50);
    
    // Agregar estilos CSS para el spinner si no existen
    if (!document.getElementById('loadingStyles')) {
        const styles = document.createElement('style');
        styles.id = 'loadingStyles';
        styles.textContent = `
            .loading-content {
                text-align: center;
                color: var(--text-dark);
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--light-pink);
                border-top: 4px solid var(--primary-pink);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            .loading-message {
                font-size: 1.1rem;
                font-weight: 500;
                margin: 0;
            }
        `;
        document.head.appendChild(styles);
    }
}

/**
 * Oculta el indicador de carga
 */
function hideLoadingIndicator() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

/**
 * Efecto de escritura para texto
 * @param {string} selector - Selector del elemento
 * @param {string} text - Texto a escribir
 * @param {number} speed - Velocidad de escritura en ms
 */
function typeWriterEffect(selector, text, speed = 100) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    // Iniciar después de un pequeño retraso
    setTimeout(typeChar, 500);
}

/**
 * Agrega efecto de partículas flotantes al modal
 * @param {Element} modal - Elemento modal
 */
function addParticleEffect(modal) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición y animación aleatoria
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: var(--primary-pink);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Agregar estilos de animación si no existen
    if (!document.getElementById('particleStyles')) {
        const styles = document.createElement('style');
        styles.id = 'particleStyles';
        styles.textContent = `
            .particle-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    modal.appendChild(particleContainer);
}

/**
 * Remueve el efecto de partículas del modal
 * @param {Element} modal - Elemento modal
 */
function removeParticleEffect(modal) {
    const particleContainer = modal.querySelector('.particle-container');
    if (particleContainer) {
        particleContainer.remove();
    }
}

/**
 * Valida un campo de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida la fortaleza de una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {object} - Objeto con validación y mensaje
 */
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const isValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    
    let message = '';
    if (password.length < minLength) {
        message = `La contraseña debe tener al menos ${minLength} caracteres`;
    } else if (!hasUpperCase) {
        message = 'La contraseña debe incluir al menos una letra mayúscula';
    } else if (!hasLowerCase) {
        message = 'La contraseña debe incluir al menos una letra minúscula';
    } else if (!hasNumbers) {
        message = 'La contraseña debe incluir al menos un número';
    }
    
    return { isValid, message };
}

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos para el toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-pink);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-medium);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Colores según el tipo
    if (type === 'success') {
        toast.style.background = 'var(--pastel-green)';
    } else if (type === 'error') {
        toast.style.background = 'var(--primary-pink)';
    }
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ===== FUNCIONES DE ACCESIBILIDAD =====

/**
 * Mejora la navegación por teclado en modales
 */
function setupModalAccessibility() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                // Mantener el foco dentro del modal
                const focusableElements = modal.querySelectorAll(
                    'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    });
}

// Inicializar accesibilidad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupModalAccessibility);

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.WarniVidaDashboard = {
    showLoginForm,
    showRegisterForm,
    startGuestExperience,
    closeModal,
    showToast,
    validateEmail,
    validatePassword
};

console.log('✅ Dashboard JavaScript cargado correctamente');