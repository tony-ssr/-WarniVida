/*
 * WarniVida - JavaScript Principal de la Aplicación
 * Funcionalidades interactivas y navegación para la plataforma de salud reproductiva
 * 
 * Autora: Eliana Narvaez Diaz
 * Desarrollador: Antony Salcedo
 * Año: 2025
 * 
 * Características:
 * - Navegación dinámica entre módulos
 * - Gestión de estado de la aplicación
 * - Funcionalidades interactivas avanzadas
 * - Notificaciones y feedback visual
 * - Responsive design y accesibilidad
 */

// ===== CONFIGURACIÓN GLOBAL =====
const WarniVidaApp = {
    // Estado de la aplicación
    state: {
        currentModule: 'dashboard',
        sidebarCollapsed: false,
        user: {
            name: 'María González',
            avatar: 'MG',
            status: 'online',
            lastLogin: new Date(),
            notifications: 3
        },
        modules: {
            dashboard: { title: 'Panel Principal', icon: 'fas fa-home' },
            profile: { title: 'Mi Perfil', icon: 'fas fa-user' },
            education: { title: 'Educación en Salud', icon: 'fas fa-graduation-cap' },
            counseling: { title: 'Consejería', icon: 'fas fa-comments' },
            planning: { title: 'Planificación', icon: 'fas fa-calendar-alt' },
            tracking: { title: 'Seguimiento', icon: 'fas fa-chart-line' },
            communication: { title: 'Comunicación', icon: 'fas fa-envelope' },
            reports: { title: 'Reportes', icon: 'fas fa-file-alt' },
            emergency: { title: 'Emergencia', icon: 'fas fa-exclamation-triangle' }
        },
        notifications: [
            {
                id: 1,
                title: 'Recordatorio de Cita',
                message: 'Tienes una cita médica mañana a las 10:00 AM',
                time: '2 horas',
                type: 'appointment',
                read: false
            },
            {
                id: 2,
                title: 'Nuevo Contenido Educativo',
                message: 'Se ha agregado nueva información sobre planificación familiar',
                time: '1 día',
                type: 'education',
                read: false
            },
            {
                id: 3,
                title: 'Recordatorio de Medicamento',
                message: 'Es hora de tomar tu medicamento anticonceptivo',
                time: '30 min',
                type: 'medication',
                read: true
            }
        ]
    },

    // Elementos del DOM
    elements: {
        sidebar: null,
        sidebarToggle: null,
        mobileMenuToggle: null,
        mainContent: null,
        pageTitle: null,
        navLinks: null,
        moduleContents: null,
        notificationBtn: null,
        notificationDropdown: null,
        notificationBadge: null,
        logoutBtn: null,
        sidebarOverlay: null
    },

    // Inicialización
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeModules();
        this.updateUserInfo();
        this.updateNotifications();
        this.startPeriodicUpdates();
        this.showWelcomeAnimation();
        console.log('WarniVida App inicializada correctamente');
    },

    // Cachear elementos del DOM
    cacheElements() {
        this.elements.sidebar = document.querySelector('.sidebar');
        this.elements.sidebarToggle = document.querySelector('.sidebar-toggle');
        this.elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.elements.mainContent = document.querySelector('.main-content');
        this.elements.pageTitle = document.querySelector('.page-title');
        this.elements.navLinks = document.querySelectorAll('.nav-link');
        this.elements.moduleContents = document.querySelectorAll('.module-content');
        this.elements.notificationBtn = document.querySelector('.notification-btn');
        this.elements.notificationDropdown = document.querySelector('.notification-dropdown');
        this.elements.notificationBadge = document.querySelector('.notification-badge');
        this.elements.logoutBtn = document.querySelector('.logout-btn');
        this.elements.sidebarOverlay = document.querySelector('.sidebar-overlay');
    },

    // Vincular eventos
    bindEvents() {
        // Toggle del sidebar
        if (this.elements.sidebarToggle) {
            this.elements.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Toggle móvil del menú
        if (this.elements.mobileMenuToggle) {
            this.elements.mobileMenuToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }

        // Cerrar menú móvil al hacer clic en el overlay
        if (this.elements.sidebarOverlay) {
            this.elements.sidebarOverlay.addEventListener('click', () => this.closeMobileSidebar());
        }

        // Navegación entre módulos
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const module = link.getAttribute('data-module');
                if (module) {
                    this.navigateToModule(module);
                }
            });
        });

        // Notificaciones
        if (this.elements.notificationBtn) {
            this.elements.notificationBtn.addEventListener('click', () => this.toggleNotifications());
        }

        // Cerrar notificaciones al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-bell')) {
                this.closeNotifications();
            }
        });

        // Overlay del sidebar en móvil
        if (this.elements.sidebarOverlay) {
            this.elements.sidebarOverlay.addEventListener('click', () => this.closeMobileSidebar());
        }

        // Logout
        if (this.elements.logoutBtn) {
            this.elements.logoutBtn.addEventListener('click', () => this.showLogoutModal());
        }

        // Atajos de teclado
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Responsive
        window.addEventListener('resize', () => this.handleResize());

        // Prevenir pérdida de datos
        window.addEventListener('beforeunload', (e) => this.handleBeforeUnload(e));
    },

    // Inicializar módulos
    initializeModules() {
        // Inicializar dashboard por defecto
        this.navigateToModule('dashboard');
        
        // Inicializar funcionalidades específicas de cada módulo
        this.initDashboard();
        this.initProfile();
        this.initEducation();
        this.initPlanning();
        this.initTracking();
        this.initCommunication();
    },

    // ===== NAVEGACIÓN =====
    
    // Navegar a un módulo específico
    navigateToModule(moduleId) {
        // Validar que el módulo existe
        if (!this.state.modules[moduleId]) {
            console.error(`Módulo '${moduleId}' no encontrado`);
            return;
        }

        // Actualizar estado
        this.state.currentModule = moduleId;

        // Actualizar navegación activa
        this.updateActiveNavigation(moduleId);

        // Mostrar contenido del módulo
        this.showModuleContent(moduleId);

        // Actualizar título de la página
        this.updatePageTitle(moduleId);

        // Cerrar sidebar en móvil
        if (window.innerWidth <= 768) {
            this.closeMobileSidebar();
        }

        // Scroll al top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Analíticas (simulado)
        this.trackPageView(moduleId);
    },

    // Actualizar navegación activa
    updateActiveNavigation(moduleId) {
        // Remover clase activa de todos los elementos
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Agregar clase activa al elemento actual
        const activeNavItem = document.querySelector(`[data-module="${moduleId}"]`)?.closest('.nav-item');
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    },

    // Mostrar contenido del módulo
    showModuleContent(moduleId) {
        // Ocultar todos los contenidos
        this.elements.moduleContents.forEach(content => {
            content.classList.remove('active');
        });

        // Mostrar contenido del módulo actual
        const moduleContent = document.getElementById(`${moduleId}-module`);
        if (moduleContent) {
            moduleContent.classList.add('active');
            
            // Trigger de animación de entrada
            setTimeout(() => {
                moduleContent.style.opacity = '1';
                moduleContent.style.transform = 'translateY(0)';
            }, 50);
        } else {
            console.warn(`Módulo no encontrado: ${moduleId}-module`);
        }
    },

    // Actualizar título de la página
    updatePageTitle(moduleId) {
        const moduleInfo = this.state.modules[moduleId];
        if (this.elements.pageTitle && moduleInfo) {
            this.elements.pageTitle.textContent = moduleInfo.title;
            
            // Actualizar título del documento
            document.title = `${moduleInfo.title} - WarniVida`;
        }
    },

    // ===== SIDEBAR =====
    
    // Toggle del sidebar
    toggleSidebar() {
        this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
        
        if (this.elements.sidebar) {
            this.elements.sidebar.classList.toggle('collapsed', this.state.sidebarCollapsed);
        }

        // Guardar preferencia
        localStorage.setItem('sidebarCollapsed', this.state.sidebarCollapsed);
    },

    // Toggle del sidebar móvil
    toggleMobileSidebar() {
        if (this.elements.sidebar) {
            const isOpen = this.elements.sidebar.classList.contains('show');
            
            if (isOpen) {
                this.closeMobileSidebar();
            } else {
                this.openMobileSidebar();
            }
        }
    },

    // Abrir sidebar móvil
    openMobileSidebar() {
        if (this.elements.sidebar) {
            this.elements.sidebar.classList.add('show');
        }
        if (this.elements.sidebarOverlay) {
            this.elements.sidebarOverlay.classList.add('show');
        }
        document.body.style.overflow = 'hidden';
    },

    // Cerrar sidebar móvil
    closeMobileSidebar() {
        if (this.elements.sidebar) {
            this.elements.sidebar.classList.remove('show');
        }
        if (this.elements.sidebarOverlay) {
            this.elements.sidebarOverlay.classList.remove('show');
        }
        document.body.style.overflow = '';
    },

    // ===== NOTIFICACIONES =====
    
    // Toggle de notificaciones
    toggleNotifications() {
        if (this.elements.notificationDropdown) {
            const isOpen = this.elements.notificationDropdown.classList.contains('show');
            
            if (isOpen) {
                this.closeNotifications();
            } else {
                this.openNotifications();
            }
        }
    },

    // Abrir notificaciones
    openNotifications() {
        if (this.elements.notificationDropdown) {
            this.elements.notificationDropdown.classList.add('show');
            this.renderNotifications();
        }
    },

    // Cerrar notificaciones
    closeNotifications() {
        if (this.elements.notificationDropdown) {
            this.elements.notificationDropdown.classList.remove('show');
        }
    },

    // Renderizar notificaciones
    renderNotifications() {
        const notificationList = document.querySelector('.notification-list');
        if (!notificationList) return;

        notificationList.innerHTML = '';

        if (this.state.notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="no-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>No tienes notificaciones</p>
                </div>
            `;
            return;
        }

        this.state.notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            notificationElement.innerHTML = `
                <div class="notification-icon ${notification.type}">
                    <i class="${this.getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <h5>${notification.title}</h5>
                    <p>${notification.message}</p>
                    <span class="notification-time">Hace ${notification.time}</span>
                </div>
                <button class="mark-read-btn" onclick="WarniVidaApp.markNotificationAsRead(${notification.id})">
                    <i class="fas fa-check"></i>
                </button>
            `;
            notificationList.appendChild(notificationElement);
        });
    },

    // Obtener icono de notificación
    getNotificationIcon(type) {
        const icons = {
            appointment: 'fas fa-calendar-check',
            education: 'fas fa-graduation-cap',
            medication: 'fas fa-pills',
            emergency: 'fas fa-exclamation-triangle',
            message: 'fas fa-envelope',
            reminder: 'fas fa-bell'
        };
        return icons[type] || 'fas fa-info-circle';
    },

    // Marcar notificación como leída
    markNotificationAsRead(notificationId) {
        const notification = this.state.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.updateNotifications();
            this.renderNotifications();
        }
    },

    // Marcar todas las notificaciones como leídas
    markAllNotificationsAsRead() {
        this.state.notifications.forEach(notification => {
            notification.read = true;
        });
        this.updateNotifications();
        this.renderNotifications();
    },

    // Actualizar contador de notificaciones
    updateNotifications() {
        const unreadCount = this.state.notifications.filter(n => !n.read).length;
        
        if (this.elements.notificationBadge) {
            if (unreadCount > 0) {
                this.elements.notificationBadge.textContent = unreadCount;
                this.elements.notificationBadge.style.display = 'block';
            } else {
                this.elements.notificationBadge.style.display = 'none';
            }
        }
    },

    // ===== INFORMACIÓN DEL USUARIO =====
    
    // Actualizar información del usuario
    updateUserInfo() {
        const userNameElement = document.querySelector('.user-name');
        const userAvatarElement = document.querySelector('.user-avatar');
        const userStatusElement = document.querySelector('.user-status');

        if (userNameElement) {
            userNameElement.textContent = this.state.user.name;
        }

        if (userAvatarElement) {
            userAvatarElement.textContent = this.state.user.avatar;
        }

        if (userStatusElement) {
            const lastLogin = this.formatLastLogin(this.state.user.lastLogin);
            userStatusElement.textContent = `Último acceso: ${lastLogin}`;
        }
    },

    // Formatear última conexión
    formatLastLogin(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Ahora';
        if (minutes < 60) return `Hace ${minutes} min`;
        if (hours < 24) return `Hace ${hours} h`;
        return `Hace ${days} días`;
    },

    // ===== MÓDULOS ESPECÍFICOS =====
    
    // Inicializar Dashboard
    initDashboard() {
        // Actualizar estadísticas del dashboard
        this.updateDashboardStats();
        
        // Inicializar gráficos (simulado)
        this.initDashboardCharts();
        
        // Configurar acciones rápidas
        this.setupQuickActions();
        
        // Actualizar recordatorios
        this.updateReminders();
    },

    // Actualizar estadísticas del dashboard
    updateDashboardStats() {
        const stats = {
            nextAppointment: '15 Ene, 10:00 AM',
            cycleDay: '14 de 28',
            medicationStreak: '7 días',
            healthScore: '85%'
        };

        // Actualizar elementos del DOM con las estadísticas
        Object.keys(stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = stats[key];
            }
        });
    },

    // Inicializar gráficos del dashboard
    initDashboardCharts() {
        // Simular inicialización de gráficos
        // En una implementación real, aquí se integrarían librerías como Chart.js
        console.log('Inicializando gráficos del dashboard...');
    },

    // Configurar acciones rápidas
    setupQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    },

    // Manejar acciones rápidas
    handleQuickAction(action) {
        switch (action) {
            case 'new-appointment':
                this.navigateToModule('planning');
                break;
            case 'medication-reminder':
                this.showMedicationReminder();
                break;
            case 'emergency-contact':
                this.navigateToModule('emergency');
                break;
            case 'health-education':
                this.navigateToModule('education');
                break;
            default:
                console.log(`Acción rápida: ${action}`);
        }
    },

    // Actualizar recordatorios
    updateReminders() {
        const reminders = [
            { time: '09:00', text: 'Tomar anticonceptivo', completed: false },
            { time: '14:00', text: 'Cita con ginecólogo', completed: false },
            { time: '20:00', text: 'Ejercicio de relajación', completed: true }
        ];

        const reminderList = document.querySelector('.reminder-list');
        if (!reminderList) return;

        reminderList.innerHTML = '';
        
        reminders.forEach((reminder, index) => {
            const reminderElement = document.createElement('div');
            reminderElement.className = `reminder-item ${reminder.completed ? 'completed' : ''}`;
            reminderElement.innerHTML = `
                <span class="reminder-time">${reminder.time}</span>
                <span class="reminder-text">${reminder.text}</span>
                <button class="reminder-check" onclick="WarniVidaApp.toggleReminder(${index})">
                    <i class="fas fa-check"></i>
                </button>
            `;
            reminderList.appendChild(reminderElement);
        });
    },

    // Toggle de recordatorio
    toggleReminder(index) {
        // Simular toggle de recordatorio
        console.log(`Toggle recordatorio ${index}`);
        this.showToast('Recordatorio actualizado', 'success');
    },

    // Inicializar Perfil
    initProfile() {
        // Configurar formulario de perfil
        this.setupProfileForm();
        
        // Cargar datos del perfil
        this.loadProfileData();
    },

    // Configurar formulario de perfil
    setupProfileForm() {
        const profileForm = document.getElementById('profile-form');
        if (!profileForm) return;

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        // Validación en tiempo real
        const inputs = profileForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    },

    // Cargar datos del perfil
    loadProfileData() {
        // Simular carga de datos del perfil
        const profileData = {
            nombre: 'María González',
            apellido: 'Rodríguez',
            email: 'maria.gonzalez@email.com',
            telefono: '+57 300 123 4567',
            fechaNacimiento: '1990-05-15',
            eps: 'Sura',
            ciudad: 'Bogotá',
            direccion: 'Calle 123 #45-67'
        };

        // Llenar formulario con datos
        Object.keys(profileData).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = profileData[key];
            }
        });
    },

    // Guardar perfil
    saveProfile() {
        const saveBtn = document.querySelector('.save-profile-btn');
        if (!saveBtn) return;

        // Mostrar estado de carga
        saveBtn.classList.add('loading');
        saveBtn.disabled = true;

        // Simular guardado
        setTimeout(() => {
            saveBtn.classList.remove('loading');
            saveBtn.disabled = false;
            this.showToast('Perfil guardado exitosamente', 'success');
        }, 2000);
    },

    // Validar campo
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validaciones específicas por tipo de campo
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido';
                }
                break;
            case 'tel':
                const phoneRegex = /^[+]?[0-9\s-()]+$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un teléfono válido';
                }
                break;
        }

        // Campos requeridos
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }

        // Mostrar/ocultar error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    },

    // Mostrar error en campo
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remover mensaje de error anterior
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Agregar nuevo mensaje de error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        field.parentNode.appendChild(errorElement);
    },

    // Limpiar error de campo
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    },

    // Inicializar Educación
    initEducation() {
        // Configurar contenido educativo
        this.setupEducationalContent();
    },

    // Configurar contenido educativo
    setupEducationalContent() {
        const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
        
        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = btn.getAttribute('data-topic');
                this.showEducationalModal(topic);
            });
        });
    },

    // Mostrar modal educativo
    showEducationalModal(topic) {
        // Simular modal educativo
        this.showToast(`Abriendo contenido sobre: ${topic}`, 'info');
    },

    // Inicializar Planificación
    initPlanning() {
        // Configurar calendario y recordatorios
        console.log('Inicializando módulo de planificación...');
    },

    // Inicializar Seguimiento
    initTracking() {
        // Configurar gráficos de seguimiento
        console.log('Inicializando módulo de seguimiento...');
    },

    // Inicializar Comunicación
    initCommunication() {
        // Configurar chat y mensajería
        console.log('Inicializando módulo de comunicación...');
    },

    // ===== UTILIDADES =====
    
    // Mostrar toast de notificación
    showToast(message, type = 'info', duration = 3000) {
        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 12px;
                    padding: 1rem 1.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    min-width: 300px;
                    animation: slideInRight 0.3s ease;
                }
                .toast-success { border-left: 4px solid #4caf50; }
                .toast-error { border-left: 4px solid #f44336; }
                .toast-warning { border-left: 4px solid #ff9800; }
                .toast-info { border-left: 4px solid #2196f3; }
                .toast-content { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
                .toast-close { background: none; border: none; cursor: pointer; }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        // Agregar al DOM
        document.body.appendChild(toast);

        // Auto-remover después del tiempo especificado
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    },

    // Obtener icono para toast
    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    // Mostrar modal de logout
    showLogoutModal() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Cerrar Sesión</h3>
                    <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>¿Estás segura de que deseas cerrar sesión?</p>
                    <p class="logout-warning">Se perderán los cambios no guardados.</p>
                </div>
                <div class="modal-actions">
                    <button class="cancel-btn" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button class="confirm-btn" onclick="WarniVidaApp.logout()">Cerrar Sesión</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // Logout
    logout() {
        // Limpiar datos de sesión
        localStorage.removeItem('userSession');
        sessionStorage.clear();
        
        // Mostrar mensaje de despedida
        this.showToast('Sesión cerrada exitosamente', 'success');
        
        // Redirigir al login después de un breve delay
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    },

    // Manejar atajos de teclado
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + número para navegar a módulos
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const moduleIndex = parseInt(e.key) - 1;
            const moduleIds = Object.keys(this.state.modules);
            if (moduleIds[moduleIndex]) {
                this.navigateToModule(moduleIds[moduleIndex]);
            }
        }

        // Escape para cerrar modales y dropdowns
        if (e.key === 'Escape') {
            this.closeNotifications();
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.remove());
        }

        // Alt + M para toggle del menú
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            this.toggleSidebar();
        }
    },

    // Manejar redimensionamiento
    handleResize() {
        // Cerrar sidebar móvil si se cambia a desktop
        if (window.innerWidth > 768) {
            this.closeMobileSidebar();
        }

        // Restaurar preferencia de sidebar en desktop
        if (window.innerWidth > 768) {
            const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (savedCollapsed !== this.state.sidebarCollapsed) {
                this.toggleSidebar();
            }
        }
    },

    // Manejar antes de cerrar ventana
    handleBeforeUnload(e) {
        // Verificar si hay cambios sin guardar
        const hasUnsavedChanges = this.checkUnsavedChanges();
        
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '¿Estás segura de que deseas salir? Los cambios no guardados se perderán.';
            return e.returnValue;
        }
    },

    // Verificar cambios sin guardar
    checkUnsavedChanges() {
        // Simular verificación de cambios
        // En una implementación real, aquí se verificarían los formularios modificados
        return false;
    },

    // Mostrar animación de bienvenida
    showWelcomeAnimation() {
        // Animar entrada de las tarjetas del dashboard
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        dashboardCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    // Iniciar actualizaciones periódicas
    startPeriodicUpdates() {
        // Actualizar cada 30 segundos
        setInterval(() => {
            this.updateDashboardStats();
            this.updateNotifications();
        }, 30000);

        // Actualizar información del usuario cada 5 minutos
        setInterval(() => {
            this.updateUserInfo();
        }, 300000);
    },

    // Tracking de páginas (simulado)
    trackPageView(moduleId) {
        // En una implementación real, aquí se enviarían datos a analytics
        console.log(`Página vista: ${moduleId}`);
    },

    // Mostrar recordatorio de medicamento
    showMedicationReminder() {
        this.showToast('Recordatorio: Es hora de tomar tu medicamento', 'warning', 5000);
    }
};

// ===== INICIALIZACIÓN =====

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WarniVidaApp.init());
} else {
    WarniVidaApp.init();
}

// Exportar para uso global
window.WarniVidaApp = WarniVidaApp;

// ===== FUNCIONES AUXILIARES GLOBALES =====

// Función para mostrar recordatorio de medicamento desde HTML
function showMedicationReminder() {
    WarniVidaApp.showMedicationReminder();
}

// Función para marcar notificación como leída desde HTML
function markNotificationAsRead(id) {
    WarniVidaApp.markNotificationAsRead(id);
}

// Función para toggle de recordatorio desde HTML
function toggleReminder(index) {
    WarniVidaApp.toggleReminder(index);
}

// Función para cerrar modal desde HTML
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.remove();
    }
}

// ===== SERVICE WORKER (OPCIONAL) =====

// Registrar service worker para funcionalidad offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falló: ', registrationError);
            });
    });
}

// ===== FUNCIONES UTILITARIAS GLOBALES =====

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
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - True si es válida
 */
function validatePassword(password) {
    // Validar que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// ===== MANEJO DE ERRORES GLOBALES =====

// Capturar errores JavaScript
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    WarniVidaApp.showToast('Ha ocurrido un error inesperado', 'error');
});

// Capturar promesas rechazadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada:', e.reason);
    WarniVidaApp.showToast('Error de conexión', 'error');
});

console.log('WarniVida App - JavaScript cargado correctamente ✨');