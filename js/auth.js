/**
 * WarniVida - Sistema de Autenticación
 * Manejo de login, registro y validaciones de seguridad
 * 
 * Autora: Eliana Narvaez Diaz
 * Desarrollador: Antony Salcedo
 * Año: 2025
 * 
 * Funcionalidades incluidas:
 * - Validación de formularios en tiempo real
 * - Autenticación segura con localStorage
 * - Manejo de errores y feedback visual
 * - Integración con sistema de salud
 * - Validaciones específicas para datos médicos
 */

// ===== CONFIGURACIÓN Y CONSTANTES =====
const AUTH_CONFIG = {
    // Configuración de validación de contraseñas
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIREMENTS: {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        numbers: /\d/,
        special: /[!@#$%^&*(),.?":{}|<>]/
    },
    
    // Configuración de sesión
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    
    // Configuración de intentos de login
    MAX_LOGIN_ATTEMPTS: 3,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
    
    // Configuración de EPS disponibles en Colombia
    EPS_LIST: [
        'Compensar EPS',
        'Nueva EPS',
        'Famisanar EPS',
        'Sanitas EPS',
        'Sura EPS',
        'Salud Total EPS',
        'Coomeva EPS',
        'Aliansalud EPS',
        'Medimás EPS',
        'Capital Salud EPS',
        'Otra'
    ]
};

// ===== VARIABLES GLOBALES =====
let currentUser = null;
let loginAttempts = 0;
let isFormSubmitting = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Sistema de autenticación iniciado');
    
    // Configurar eventos de formularios
    setupFormEvents();
    
    // Configurar validaciones en tiempo real
    setupRealTimeValidation();
    
    // Verificar sesión existente
    checkExistingSession();
    
    // Configurar autocompletado seguro
    setupSecureAutocomplete();
});

// ===== CONFIGURACIÓN DE EVENTOS =====

/**
 * Configura todos los eventos de los formularios de autenticación
 */
function setupFormEvents() {
    // Evento de envío del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Evento de envío del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Eventos para mostrar/ocultar contraseñas
    setupPasswordToggle();
    
    // Eventos para validación de campos específicos
    setupFieldValidation();
}

/**
 * Configura la validación en tiempo real de los campos
 */
function setupRealTimeValidation() {
    // Validación de email en tiempo real
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            validateEmailField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Validación de contraseña en tiempo real
    document.querySelectorAll('input[type="password"]').forEach(input => {
        if (input.name === 'password') {
            input.addEventListener('input', function() {
                validatePasswordField(this);
            });
        }
        
        if (input.name === 'confirmPassword') {
            input.addEventListener('input', function() {
                validatePasswordConfirmation(this);
            });
        }
    });
    
    // Validación de nombre completo
    document.querySelectorAll('input[name="name"]').forEach(input => {
        input.addEventListener('blur', function() {
            validateNameField(this);
        });
    });
}

/**
 * Configura los botones para mostrar/ocultar contraseñas
 */
function setupPasswordToggle() {
    document.querySelectorAll('input[type="password"]').forEach(input => {
        // Crear botón de toggle
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
        toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
        
        // Estilos para el botón
        toggleButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--primary-pink);
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: var(--transition-fast);
        `;
        
        // Hacer el contenedor del input relativo
        input.parentElement.style.position = 'relative';
        input.style.paddingRight = '40px';
        
        // Agregar evento de toggle
        toggleButton.addEventListener('click', function() {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
            this.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
        });
        
        input.parentElement.appendChild(toggleButton);
    });
}

/**
 * Configura validaciones específicas para campos médicos
 */
function setupFieldValidation() {
    // Validación de documento de identidad
    document.querySelectorAll('input[name="document"]').forEach(input => {
        input.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Validar longitud según tipo de documento
            if (this.value.length >= 6) {
                validateDocumentField(this);
            }
        });
    });
    
    // Validación de teléfono
    document.querySelectorAll('input[name="phone"]').forEach(input => {
        input.addEventListener('input', function() {
            // Formato de teléfono colombiano
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length >= 10) {
                validatePhoneField(this);
            }
        });
    });
}

// ===== MANEJO DE AUTENTICACIÓN =====

/**
 * Maneja el proceso de inicio de sesión
 * @param {Event} event - Evento del formulario
 */
async function handleLogin(event) {
    event.preventDefault();
    
    if (isFormSubmitting) return;
    
    // Verificar intentos de login
    if (isAccountLocked()) {
        showAuthError('Cuenta bloqueada temporalmente. Intenta nuevamente en 15 minutos.');
        return;
    }
    
    isFormSubmitting = true;
    const submitButton = event.target.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    try {
        // Mostrar estado de carga
        submitButton.textContent = 'Iniciando sesión...';
        submitButton.classList.add('loading');
        
        // Obtener datos del formulario
        const formData = new FormData(event.target);
        const loginData = {
            email: formData.get('email').trim().toLowerCase(),
            password: formData.get('password')
        };
        
        // Validar datos antes de enviar
        const validation = validateLoginData(loginData);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        // Simular autenticación (en producción sería una llamada a API)
        const authResult = await authenticateUser(loginData);
        
        if (authResult.success) {
            // Login exitoso
            loginAttempts = 0;
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lockoutTime');
            
            // Guardar sesión
            saveUserSession(authResult.user);
            
            // Mostrar mensaje de éxito
            showAuthSuccess('¡Bienvenida de nuevo! Redirigiendo...');
            
            // Redirigir después de un breve retraso
            setTimeout(() => {
                window.location.href = 'vistas/main-app.html';
            }, 1500);
            
        } else {
            // Login fallido
            loginAttempts++;
            localStorage.setItem('loginAttempts', loginAttempts.toString());
            
            if (loginAttempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
                // Bloquear cuenta temporalmente
                const lockoutTime = Date.now() + AUTH_CONFIG.LOCKOUT_DURATION;
                localStorage.setItem('lockoutTime', lockoutTime.toString());
                throw new Error('Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.');
            } else {
                const remainingAttempts = AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - loginAttempts;
                throw new Error(`Credenciales incorrectas. Te quedan ${remainingAttempts} intentos.`);
            }
        }
        
    } catch (error) {
        console.error('Error en login:', error);
        showAuthError(error.message);
        
    } finally {
        // Restaurar estado del botón
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
        isFormSubmitting = false;
    }
}

/**
 * Maneja el proceso de registro de nueva usuaria
 * @param {Event} event - Evento del formulario
 */
async function handleRegister(event) {
    event.preventDefault();
    
    if (isFormSubmitting) return;
    
    isFormSubmitting = true;
    const submitButton = event.target.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    try {
        // Mostrar estado de carga
        submitButton.textContent = 'Creando cuenta...';
        submitButton.classList.add('loading');
        
        // Obtener datos del formulario
        const formData = new FormData(event.target);
        const registerData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim().toLowerCase(),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };
        
        // Validar datos del registro
        const validation = validateRegisterData(registerData);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        // Verificar si el email ya existe
        const emailExists = await checkEmailExists(registerData.email);
        if (emailExists) {
            throw new Error('Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?');
        }
        
        // Crear nueva cuenta
        const registrationResult = await createUserAccount(registerData);
        
        if (registrationResult.success) {
            // Registro exitoso
            showAuthSuccess('¡Cuenta creada exitosamente! Ahora puedes completar tu perfil médico.');
            
            // Guardar sesión del nuevo usuario
            saveUserSession(registrationResult.user);
            
            // Redirigir al formulario de perfil médico
            setTimeout(() => {
                window.location.href = 'vistas/profile-setup.html';
            }, 2000);
            
        } else {
            throw new Error('Error al crear la cuenta. Por favor, intenta nuevamente.');
        }
        
    } catch (error) {
        console.error('Error en registro:', error);
        showAuthError(error.message);
        
    } finally {
        // Restaurar estado del botón
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
        isFormSubmitting = false;
    }
}

// ===== FUNCIONES DE VALIDACIÓN =====

/**
 * Valida los datos de login
 * @param {Object} data - Datos del login
 * @returns {Object} - Resultado de la validación
 */
function validateLoginData(data) {
    if (!data.email) {
        return { isValid: false, message: 'El correo electrónico es requerido' };
    }
    
    if (!validateEmail(data.email)) {
        return { isValid: false, message: 'Formato de correo electrónico inválido' };
    }
    
    if (!data.password) {
        return { isValid: false, message: 'La contraseña es requerida' };
    }
    
    return { isValid: true };
}

/**
 * Valida los datos de registro
 * @param {Object} data - Datos del registro
 * @returns {Object} - Resultado de la validación
 */
function validateRegisterData(data) {
    // Validar nombre
    if (!data.name || data.name.length < 2) {
        return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name)) {
        return { isValid: false, message: 'El nombre solo puede contener letras y espacios' };
    }
    
    // Validar email
    if (!validateEmail(data.email)) {
        return { isValid: false, message: 'Formato de correo electrónico inválido' };
    }
    
    // Validar contraseña
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
        return { isValid: false, message: passwordValidation.message };
    }
    
    // Validar confirmación de contraseña
    if (data.password !== data.confirmPassword) {
        return { isValid: false, message: 'Las contraseñas no coinciden' };
    }
    
    return { isValid: true };
}

/**
 * Valida un campo de email específico
 * @param {HTMLInputElement} input - Campo de input
 */
function validateEmailField(input) {
    const email = input.value.trim();
    
    if (!email) {
        showFieldError(input, 'El correo electrónico es requerido');
        return false;
    }
    
    if (!validateEmail(email)) {
        showFieldError(input, 'Formato de correo electrónico inválido');
        return false;
    }
    
    clearFieldError(input);
    return true;
}

/**
 * Valida un campo de contraseña específico
 * @param {HTMLInputElement} input - Campo de input
 */
function validatePasswordField(input) {
    const password = input.value;
    const validation = validatePassword(password);
    
    if (!validation.isValid) {
        showFieldError(input, validation.message);
        return false;
    }
    
    clearFieldError(input);
    
    // Mostrar indicador de fortaleza
    showPasswordStrength(input, password);
    return true;
}

/**
 * Valida la confirmación de contraseña
 * @param {HTMLInputElement} input - Campo de confirmación
 */
function validatePasswordConfirmation(input) {
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = input.value;
    
    if (confirmPassword && password !== confirmPassword) {
        showFieldError(input, 'Las contraseñas no coinciden');
        return false;
    }
    
    clearFieldError(input);
    return true;
}

/**
 * Valida un campo de nombre
 * @param {HTMLInputElement} input - Campo de input
 */
function validateNameField(input) {
    const name = input.value.trim();
    
    if (!name) {
        showFieldError(input, 'El nombre es requerido');
        return false;
    }
    
    if (name.length < 2) {
        showFieldError(input, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        showFieldError(input, 'El nombre solo puede contener letras y espacios');
        return false;
    }
    
    clearFieldError(input);
    return true;
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Verifica si la cuenta está bloqueada
 * @returns {boolean} - True si está bloqueada
 */
function isAccountLocked() {
    const lockoutTime = localStorage.getItem('lockoutTime');
    if (!lockoutTime) return false;
    
    const now = Date.now();
    const lockout = parseInt(lockoutTime);
    
    if (now < lockout) {
        return true;
    } else {
        // Limpiar bloqueo expirado
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('loginAttempts');
        loginAttempts = 0;
        return false;
    }
}

/**
 * Simula la autenticación de usuario
 * @param {Object} loginData - Datos de login
 * @returns {Promise<Object>} - Resultado de la autenticación
 */
async function authenticateUser(loginData) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // En producción, esto sería una llamada a la API del servidor
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = storedUsers.find(u => u.email === loginData.email);
    
    if (user && user.password === btoa(loginData.password)) {
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profileComplete: user.profileComplete || false,
                lastLogin: new Date().toISOString()
            }
        };
    }
    
    return { success: false };
}

/**
 * Verifica si un email ya existe
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} - True si existe
 */
async function checkEmailExists(email) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return storedUsers.some(user => user.email === email);
}

/**
 * Crea una nueva cuenta de usuario
 * @param {Object} registerData - Datos del registro
 * @returns {Promise<Object>} - Resultado de la creación
 */
async function createUserAccount(registerData) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        const newUser = {
            id: generateUserId(),
            name: registerData.name,
            email: registerData.email,
            password: btoa(registerData.password), // En producción usar hash seguro
            createdAt: new Date().toISOString(),
            profileComplete: false,
            isActive: true
        };
        
        storedUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
        
        return {
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                profileComplete: false
            }
        };
        
    } catch (error) {
        console.error('Error creando cuenta:', error);
        return { success: false };
    }
}

/**
 * Guarda la sesión del usuario
 * @param {Object} user - Datos del usuario
 */
function saveUserSession(user) {
    const sessionData = {
        user: user,
        loginTime: Date.now(),
        expiresAt: Date.now() + AUTH_CONFIG.SESSION_DURATION
    };
    
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    currentUser = user;
    
    console.log('✅ Sesión guardada para:', user.name);
}

/**
 * Verifica si existe una sesión válida
 */
function checkExistingSession() {
    const sessionData = localStorage.getItem('userSession');
    
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            
            if (Date.now() < session.expiresAt) {
                currentUser = session.user;
                console.log('🔄 Sesión existente encontrada para:', currentUser.name);
                
                // Si ya está autenticado, redirigir
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    window.location.href = 'vistas/main-app.html';
                }
            } else {
                // Sesión expirada
                localStorage.removeItem('userSession');
                console.log('⏰ Sesión expirada');
            }
        } catch (error) {
            console.error('Error verificando sesión:', error);
            localStorage.removeItem('userSession');
        }
    }
}

/**
 * Genera un ID único para el usuario
 * @returns {string} - ID único
 */
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Muestra un error en un campo específico
 * @param {HTMLInputElement} input - Campo de input
 * @param {string} message - Mensaje de error
 */
function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--primary-pink);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    `;
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    input.parentElement.appendChild(errorElement);
}

/**
 * Limpia el error de un campo específico
 * @param {HTMLInputElement} input - Campo de input
 */
function clearFieldError(input) {
    input.classList.remove('error');
    
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Muestra un mensaje de error de autenticación
 * @param {string} message - Mensaje de error
 */
function showAuthError(message) {
    if (typeof showToast === 'function') {
        showToast(message, 'error');
    } else {
        alert(message);
    }
}

/**
 * Muestra un mensaje de éxito de autenticación
 * @param {string} message - Mensaje de éxito
 */
function showAuthSuccess(message) {
    if (typeof showToast === 'function') {
        showToast(message, 'success');
    } else {
        alert(message);
    }
}

/**
 * Muestra el indicador de fortaleza de contraseña
 * @param {HTMLInputElement} input - Campo de contraseña
 * @param {string} password - Contraseña a evaluar
 */
function showPasswordStrength(input, password) {
    let strengthIndicator = input.parentElement.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        input.parentElement.appendChild(strengthIndicator);
    }
    
    const strength = calculatePasswordStrength(password);
    
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill strength-${strength.level}" style="width: ${strength.percentage}%"></div>
        </div>
        <span class="strength-text">${strength.text}</span>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('passwordStrengthStyles')) {
        const styles = document.createElement('style');
        styles.id = 'passwordStrengthStyles';
        styles.textContent = `
            .password-strength {
                margin-top: 0.5rem;
                font-size: 0.8rem;
            }
            
            .strength-bar {
                height: 4px;
                background: var(--light-pink);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 0.25rem;
            }
            
            .strength-fill {
                height: 100%;
                transition: width 0.3s ease;
            }
            
            .strength-weak { background: #ff6b6b; }
            .strength-fair { background: #ffa726; }
            .strength-good { background: #66bb6a; }
            .strength-strong { background: #4caf50; }
            
            .strength-text {
                color: var(--text-medium);
            }
        `;
        document.head.appendChild(styles);
    }
}

/**
 * Calcula la fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {Object} - Información de fortaleza
 */
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    
    let level, text;
    
    if (score < 30) {
        level = 'weak';
        text = 'Débil';
    } else if (score < 60) {
        level = 'fair';
        text = 'Regular';
    } else if (score < 90) {
        level = 'good';
        text = 'Buena';
    } else {
        level = 'strong';
        text = 'Fuerte';
    }
    
    return { level, text, percentage: Math.min(score, 100) };
}

/**
 * Configura autocompletado seguro para formularios
 */
function setupSecureAutocomplete() {
    // Configurar atributos de autocompletado apropiados
    document.querySelectorAll('input[name="email"]').forEach(input => {
        input.setAttribute('autocomplete', 'email');
    });
    
    document.querySelectorAll('input[name="password"]').forEach(input => {
        input.setAttribute('autocomplete', 'current-password');
    });
    
    document.querySelectorAll('input[name="confirmPassword"]').forEach(input => {
        input.setAttribute('autocomplete', 'new-password');
    });
    
    document.querySelectorAll('input[name="name"]').forEach(input => {
        input.setAttribute('autocomplete', 'name');
    });
}

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.WarniVidaAuth = {
    handleLogin,
    handleRegister,
    validateEmail,
    validatePassword,
    checkExistingSession,
    currentUser: () => currentUser
};

console.log('✅ Sistema de autenticación cargado correctamente');