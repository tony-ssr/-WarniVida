/*
 * WarniVida - Módulos Específicos de JavaScript
 * Funcionalidades avanzadas para cada módulo de la plataforma
 * 
 * Autora: Eliana Narvaez Diaz
 * Desarrollador: Antony Salcedo
 * Año: 2025
 * 
 * Características:
 * - Módulo de Educación en Salud
 * - Módulo de Planificación y Recordatorios
 * - Módulo de Seguimiento Personalizado
 * - Módulo de Comunicación
 * - Módulo de Reportes
 * - Funcionalidades interactivas avanzadas
 */

// ===== MÓDULO DE EDUCACIÓN EN SALUD =====
const EducationModule = {
    // Estado del módulo
    state: {
        currentTopic: null,
        completedTopics: [],
        bookmarkedTopics: [],
        searchQuery: '',
        filterCategory: 'all'
    },

    // Contenido educativo
    topics: [
        {
            id: 1,
            title: 'Métodos Anticonceptivos',
            category: 'planificacion',
            description: 'Conoce todos los métodos disponibles y encuentra el ideal para ti',
            content: `
                <h3>Métodos Anticonceptivos Disponibles</h3>
                <div class="method-grid">
                    <div class="method-card">
                        <h4>Píldora Anticonceptiva</h4>
                        <p>Eficacia: 91-99%</p>
                        <p>Hormonal, uso diario</p>
                    </div>
                    <div class="method-card">
                        <h4>DIU</h4>
                        <p>Eficacia: 99%</p>
                        <p>Dispositivo intrauterino de larga duración</p>
                    </div>
                    <div class="method-card">
                        <h4>Implante Subdérmico</h4>
                        <p>Eficacia: 99%</p>
                        <p>Protección por 3 años</p>
                    </div>
                    <div class="method-card">
                        <h4>Condón</h4>
                        <p>Eficacia: 85-98%</p>
                        <p>Protege contra ITS</p>
                    </div>
                </div>
            `,
            duration: '15 min',
            difficulty: 'Básico',
            tags: ['anticonceptivos', 'planificacion', 'salud']
        },
        {
            id: 2,
            title: 'Ciclo Menstrual',
            category: 'salud',
            description: 'Comprende tu ciclo y aprende a identificar las diferentes fases',
            content: `
                <h3>Entendiendo tu Ciclo Menstrual</h3>
                <div class="cycle-phases">
                    <div class="phase-card">
                        <h4>Fase Menstrual (Días 1-5)</h4>
                        <p>Descamación del endometrio</p>
                        <ul>
                            <li>Sangrado menstrual</li>
                            <li>Niveles hormonales bajos</li>
                            <li>Posibles cólicos</li>
                        </ul>
                    </div>
                    <div class="phase-card">
                        <h4>Fase Folicular (Días 1-13)</h4>
                        <p>Preparación para la ovulación</p>
                        <ul>
                            <li>Aumento de estrógenos</li>
                            <li>Desarrollo del folículo</li>
                            <li>Engrosamiento del endometrio</li>
                        </ul>
                    </div>
                    <div class="phase-card">
                        <h4>Ovulación (Día 14)</h4>
                        <p>Liberación del óvulo</p>
                        <ul>
                            <li>Pico de fertilidad</li>
                            <li>Aumento de temperatura</li>
                            <li>Cambios en el moco cervical</li>
                        </ul>
                    </div>
                    <div class="phase-card">
                        <h4>Fase Lútea (Días 15-28)</h4>
                        <p>Preparación para posible embarazo</p>
                        <ul>
                            <li>Aumento de progesterona</li>
                            <li>Síntomas premenstruales</li>
                            <li>Preparación del endometrio</li>
                        </ul>
                    </div>
                </div>
            `,
            duration: '20 min',
            difficulty: 'Intermedio',
            tags: ['ciclo', 'menstruacion', 'hormonas']
        },
        {
            id: 3,
            title: 'Infecciones de Transmisión Sexual',
            category: 'prevencion',
            description: 'Información importante sobre prevención y detección temprana',
            content: `
                <h3>Prevención de ITS</h3>
                <div class="prevention-info">
                    <div class="info-section">
                        <h4>Métodos de Prevención</h4>
                        <ul>
                            <li>Uso correcto del condón</li>
                            <li>Comunicación con la pareja</li>
                            <li>Pruebas regulares</li>
                            <li>Vacunación (VPH, Hepatitis B)</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h4>Señales de Alerta</h4>
                        <ul>
                            <li>Flujo vaginal anormal</li>
                            <li>Dolor al orinar</li>
                            <li>Lesiones genitales</li>
                            <li>Dolor pélvico</li>
                        </ul>
                    </div>
                </div>
            `,
            duration: '25 min',
            difficulty: 'Intermedio',
            tags: ['its', 'prevencion', 'salud']
        },
        {
            id: 4,
            title: 'Nutrición y Salud Reproductiva',
            category: 'nutricion',
            description: 'Cómo una buena alimentación impacta tu salud reproductiva',
            content: `
                <h3>Alimentación para la Salud Reproductiva</h3>
                <div class="nutrition-guide">
                    <div class="nutrient-group">
                        <h4>Ácido Fólico</h4>
                        <p>Esencial para la salud reproductiva</p>
                        <p><strong>Fuentes:</strong> Vegetales verdes, legumbres, cereales fortificados</p>
                    </div>
                    <div class="nutrient-group">
                        <h4>Hierro</h4>
                        <p>Importante durante la menstruación</p>
                        <p><strong>Fuentes:</strong> Carnes rojas, espinacas, lentejas</p>
                    </div>
                    <div class="nutrient-group">
                        <h4>Calcio</h4>
                        <p>Para la salud ósea y hormonal</p>
                        <p><strong>Fuentes:</strong> Lácteos, sardinas, brócoli</p>
                    </div>
                </div>
            `,
            duration: '18 min',
            difficulty: 'Básico',
            tags: ['nutricion', 'salud', 'bienestar']
        }
    ],

    // Inicializar módulo de educación
    init() {
        this.renderTopics();
        this.setupSearch();
        this.setupFilters();
        this.loadProgress();
        console.log('Módulo de Educación inicializado');
    },

    // Renderizar temas educativos
    renderTopics() {
        const container = document.getElementById('education-topics');
        if (!container) return;

        const filteredTopics = this.getFilteredTopics();
        
        container.innerHTML = '';
        
        filteredTopics.forEach(topic => {
            const topicCard = document.createElement('div');
            topicCard.className = 'education-card';
            topicCard.innerHTML = `
                <div class="card-header">
                    <h3>${topic.title}</h3>
                    <div class="card-actions">
                        <button class="bookmark-btn ${this.state.bookmarkedTopics.includes(topic.id) ? 'active' : ''}" 
                                onclick="EducationModule.toggleBookmark(${topic.id})">
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <p class="topic-description">${topic.description}</p>
                    <div class="topic-meta">
                        <span class="duration"><i class="fas fa-clock"></i> ${topic.duration}</span>
                        <span class="difficulty difficulty-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
                        <span class="category">${this.getCategoryName(topic.category)}</span>
                    </div>
                    <div class="topic-tags">
                        ${topic.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="learn-btn" onclick="EducationModule.openTopic(${topic.id})">
                        ${this.state.completedTopics.includes(topic.id) ? 'Revisar' : 'Aprender'}
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    ${this.state.completedTopics.includes(topic.id) ? 
                        '<span class="completed-badge"><i class="fas fa-check"></i> Completado</span>' : ''}
                </div>
            `;
            container.appendChild(topicCard);
        });
    },

    // Obtener temas filtrados
    getFilteredTopics() {
        let filtered = this.topics;

        // Filtrar por categoría
        if (this.state.filterCategory !== 'all') {
            filtered = filtered.filter(topic => topic.category === this.state.filterCategory);
        }

        // Filtrar por búsqueda
        if (this.state.searchQuery) {
            const query = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(topic => 
                topic.title.toLowerCase().includes(query) ||
                topic.description.toLowerCase().includes(query) ||
                topic.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    },

    // Configurar búsqueda
    setupSearch() {
        const searchInput = document.getElementById('education-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            this.state.searchQuery = e.target.value;
            this.renderTopics();
        });
    },

    // Configurar filtros
    setupFilters() {
        const filterSelect = document.getElementById('education-filter');
        if (!filterSelect) return;

        filterSelect.addEventListener('change', (e) => {
            this.state.filterCategory = e.target.value;
            this.renderTopics();
        });
    },

    // Abrir tema educativo
    openTopic(topicId) {
        const topic = this.topics.find(t => t.id === topicId);
        if (!topic) return;

        this.state.currentTopic = topicId;
        this.showTopicModal(topic);
    },

    // Mostrar modal del tema
    showTopicModal(topic) {
        const modal = document.createElement('div');
        modal.className = 'modal education-modal show';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>${topic.title}</h3>
                    <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="topic-content">
                        ${topic.content}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="secondary-btn" onclick="this.closest('.modal').remove()">Cerrar</button>
                    <button class="primary-btn" onclick="EducationModule.completeTopic(${topic.id})">
                        Marcar como Completado
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // Completar tema
    completeTopic(topicId) {
        if (!this.state.completedTopics.includes(topicId)) {
            this.state.completedTopics.push(topicId);
            this.saveProgress();
            this.renderTopics();
            WarniVidaApp.showToast('¡Tema completado exitosamente!', 'success');
        }
        
        // Cerrar modal
        const modal = document.querySelector('.education-modal');
        if (modal) modal.remove();
    },

    // Toggle bookmark
    toggleBookmark(topicId) {
        const index = this.state.bookmarkedTopics.indexOf(topicId);
        if (index > -1) {
            this.state.bookmarkedTopics.splice(index, 1);
            WarniVidaApp.showToast('Marcador eliminado', 'info');
        } else {
            this.state.bookmarkedTopics.push(topicId);
            WarniVidaApp.showToast('Tema guardado en marcadores', 'success');
        }
        this.saveProgress();
        this.renderTopics();
    },

    // Obtener nombre de categoría
    getCategoryName(category) {
        const names = {
            planificacion: 'Planificación',
            salud: 'Salud General',
            prevencion: 'Prevención',
            nutricion: 'Nutrición'
        };
        return names[category] || category;
    },

    // Guardar progreso
    saveProgress() {
        localStorage.setItem('educationProgress', JSON.stringify({
            completedTopics: this.state.completedTopics,
            bookmarkedTopics: this.state.bookmarkedTopics
        }));
    },

    // Cargar progreso
    loadProgress() {
        const saved = localStorage.getItem('educationProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.state.completedTopics = progress.completedTopics || [];
            this.state.bookmarkedTopics = progress.bookmarkedTopics || [];
        }
    }
};

// ===== MÓDULO DE PLANIFICACIÓN Y RECORDATORIOS =====
const PlanningModule = {
    // Estado del módulo
    state: {
        currentDate: new Date(),
        selectedDate: null,
        appointments: [],
        reminders: [],
        cycleData: {
            lastPeriod: null,
            cycleLength: 28,
            periodLength: 5
        }
    },

    // Inicializar módulo de planificación
    init() {
        this.loadData();
        this.renderCalendar();
        this.setupEventListeners();
        this.updateCycleInfo();
        console.log('Módulo de Planificación inicializado');
    },

    // Renderizar calendario
    renderCalendar() {
        const calendarContainer = document.getElementById('planning-calendar');
        if (!calendarContainer) return;

        const year = this.state.currentDate.getFullYear();
        const month = this.state.currentDate.getMonth();
        
        // Header del calendario
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button class="nav-btn" onclick="PlanningModule.previousMonth()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h3>${this.getMonthName(month)} ${year}</h3>
            <button class="nav-btn" onclick="PlanningModule.nextMonth()">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        // Días de la semana
        const weekDays = document.createElement('div');
        weekDays.className = 'week-days';
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'week-day';
            dayElement.textContent = day;
            weekDays.appendChild(dayElement);
        });

        // Días del mes
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Días vacíos del mes anterior
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            daysGrid.appendChild(emptyDay);
        }
        
        // Días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDate = new Date(year, month, day);
            const dateString = this.formatDate(currentDate);
            
            // Marcar día actual
            if (this.isToday(currentDate)) {
                dayElement.classList.add('today');
            }
            
            // Marcar días con eventos
            if (this.hasEvents(dateString)) {
                dayElement.classList.add('has-events');
            }
            
            // Marcar días del ciclo menstrual
            const cycleDay = this.getCycleDay(currentDate);
            if (cycleDay) {
                dayElement.classList.add(`cycle-${cycleDay.type}`);
                dayElement.setAttribute('data-cycle', cycleDay.type);
            }
            
            dayElement.addEventListener('click', () => {
                this.selectDate(currentDate);
            });
            
            daysGrid.appendChild(dayElement);
        }

        // Limpiar y agregar elementos
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(header);
        calendarContainer.appendChild(weekDays);
        calendarContainer.appendChild(daysGrid);
    },

    // Configurar event listeners
    setupEventListeners() {
        // Formulario de nueva cita
        const appointmentForm = document.getElementById('appointment-form');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addAppointment();
            });
        }

        // Formulario de recordatorio
        const reminderForm = document.getElementById('reminder-form');
        if (reminderForm) {
            reminderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addReminder();
            });
        }
    },

    // Navegar mes anterior
    previousMonth() {
        this.state.currentDate.setMonth(this.state.currentDate.getMonth() - 1);
        this.renderCalendar();
    },

    // Navegar mes siguiente
    nextMonth() {
        this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1);
        this.renderCalendar();
    },

    // Seleccionar fecha
    selectDate(date) {
        this.state.selectedDate = date;
        
        // Actualizar selección visual
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        
        event.target.classList.add('selected');
        
        // Mostrar eventos del día
        this.showDayEvents(date);
    },

    // Mostrar eventos del día
    showDayEvents(date) {
        const dateString = this.formatDate(date);
        const dayEvents = this.getEventsForDate(dateString);
        
        const eventsContainer = document.getElementById('day-events');
        if (!eventsContainer) return;
        
        eventsContainer.innerHTML = `
            <h4>Eventos para ${this.formatDateDisplay(date)}</h4>
            <div class="events-list">
                ${dayEvents.length > 0 ? 
                    dayEvents.map(event => this.renderEvent(event)).join('') :
                    '<p class="no-events">No hay eventos programados</p>'
                }
            </div>
            <button class="add-event-btn" onclick="PlanningModule.showAddEventModal('${dateString}')">
                <i class="fas fa-plus"></i> Agregar Evento
            </button>
        `;
    },

    // Agregar cita
    addAppointment() {
        const form = document.getElementById('appointment-form');
        const formData = new FormData(form);
        
        const appointment = {
            id: Date.now(),
            type: 'appointment',
            title: formData.get('title'),
            date: formData.get('date'),
            time: formData.get('time'),
            doctor: formData.get('doctor'),
            location: formData.get('location'),
            notes: formData.get('notes')
        };
        
        this.state.appointments.push(appointment);
        this.saveData();
        this.renderCalendar();
        
        WarniVidaApp.showToast('Cita agregada exitosamente', 'success');
        form.reset();
    },

    // Agregar recordatorio
    addReminder() {
        const form = document.getElementById('reminder-form');
        const formData = new FormData(form);
        
        const reminder = {
            id: Date.now(),
            type: 'reminder',
            title: formData.get('title'),
            date: formData.get('date'),
            time: formData.get('time'),
            frequency: formData.get('frequency'),
            notes: formData.get('notes')
        };
        
        this.state.reminders.push(reminder);
        this.saveData();
        this.renderCalendar();
        
        WarniVidaApp.showToast('Recordatorio agregado exitosamente', 'success');
        form.reset();
    },

    // Obtener día del ciclo
    getCycleDay(date) {
        if (!this.state.cycleData.lastPeriod) return null;
        
        const lastPeriod = new Date(this.state.cycleData.lastPeriod);
        const daysDiff = Math.floor((date - lastPeriod) / (1000 * 60 * 60 * 24));
        const cycleDay = (daysDiff % this.state.cycleData.cycleLength) + 1;
        
        if (cycleDay <= this.state.cycleData.periodLength) {
            return { type: 'period', day: cycleDay };
        } else if (cycleDay >= 12 && cycleDay <= 16) {
            return { type: 'fertile', day: cycleDay };
        } else if (cycleDay === 14) {
            return { type: 'ovulation', day: cycleDay };
        }
        
        return { type: 'normal', day: cycleDay };
    },

    // Actualizar información del ciclo
    updateCycleInfo() {
        const cycleInfo = document.getElementById('cycle-info');
        if (!cycleInfo || !this.state.cycleData.lastPeriod) return;
        
        const today = new Date();
        const lastPeriod = new Date(this.state.cycleData.lastPeriod);
        const daysSince = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
        const currentCycleDay = (daysSince % this.state.cycleData.cycleLength) + 1;
        
        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(nextPeriod.getDate() + this.state.cycleData.cycleLength);
        
        cycleInfo.innerHTML = `
            <div class="cycle-stat">
                <h4>Día del Ciclo</h4>
                <span class="cycle-day">${currentCycleDay}</span>
            </div>
            <div class="cycle-stat">
                <h4>Próxima Menstruación</h4>
                <span class="next-period">${this.formatDateDisplay(nextPeriod)}</span>
            </div>
        `;
    },

    // Utilidades
    getMonthName(month) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month];
    },

    formatDate(date) {
        return date.toISOString().split('T')[0];
    },

    formatDateDisplay(date) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    },

    hasEvents(dateString) {
        return this.getEventsForDate(dateString).length > 0;
    },

    getEventsForDate(dateString) {
        const appointments = this.state.appointments.filter(apt => apt.date === dateString);
        const reminders = this.state.reminders.filter(rem => rem.date === dateString);
        return [...appointments, ...reminders];
    },

    renderEvent(event) {
        return `
            <div class="event-item ${event.type}">
                <div class="event-time">${event.time}</div>
                <div class="event-details">
                    <h5>${event.title}</h5>
                    ${event.doctor ? `<p>Dr. ${event.doctor}</p>` : ''}
                    ${event.location ? `<p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>` : ''}
                </div>
                <button class="delete-event-btn" onclick="PlanningModule.deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    },

    deleteEvent(eventId) {
        this.state.appointments = this.state.appointments.filter(apt => apt.id !== eventId);
        this.state.reminders = this.state.reminders.filter(rem => rem.id !== eventId);
        this.saveData();
        this.renderCalendar();
        WarniVidaApp.showToast('Evento eliminado', 'info');
    },

    saveData() {
        localStorage.setItem('planningData', JSON.stringify({
            appointments: this.state.appointments,
            reminders: this.state.reminders,
            cycleData: this.state.cycleData
        }));
    },

    loadData() {
        const saved = localStorage.getItem('planningData');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.appointments = data.appointments || [];
            this.state.reminders = data.reminders || [];
            this.state.cycleData = { ...this.state.cycleData, ...data.cycleData };
        }
    }
};

// ===== MÓDULO DE SEGUIMIENTO =====
const TrackingModule = {
    // Estado del módulo
    state: {
        symptoms: [],
        mood: [],
        medications: [],
        vitals: []
    },

    // Inicializar módulo de seguimiento
    init() {
        this.loadData();
        this.renderCharts();
        this.setupTracking();
        console.log('Módulo de Seguimiento inicializado');
    },

    // Configurar seguimiento
    setupTracking() {
        // Formulario de síntomas
        const symptomsForm = document.getElementById('symptoms-form');
        if (symptomsForm) {
            symptomsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addSymptom();
            });
        }

        // Selector de estado de ánimo
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.recordMood(btn.dataset.mood);
            });
        });
    },

    // Agregar síntoma
    addSymptom() {
        const form = document.getElementById('symptoms-form');
        const formData = new FormData(form);
        
        const symptom = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            type: formData.get('symptom-type'),
            severity: parseInt(formData.get('severity')),
            notes: formData.get('notes')
        };
        
        this.state.symptoms.push(symptom);
        this.saveData();
        this.renderCharts();
        
        WarniVidaApp.showToast('Síntoma registrado', 'success');
        form.reset();
    },

    // Registrar estado de ánimo
    recordMood(mood) {
        const moodEntry = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            mood: mood,
            timestamp: new Date().toISOString()
        };
        
        this.state.mood.push(moodEntry);
        this.saveData();
        
        WarniVidaApp.showToast(`Estado de ánimo registrado: ${mood}`, 'success');
    },

    // Renderizar gráficos
    renderCharts() {
        this.renderSymptomsChart();
        this.renderMoodChart();
        this.renderSummary();
    },

    // Renderizar gráfico de síntomas
    renderSymptomsChart() {
        const container = document.getElementById('symptoms-chart');
        if (!container) return;
        
        // Simular gráfico de síntomas
        container.innerHTML = `
            <h4>Síntomas de los Últimos 7 Días</h4>
            <div class="chart-placeholder">
                <p>Gráfico de síntomas aquí</p>
                <p>En una implementación real, se usaría Chart.js o similar</p>
            </div>
        `;
    },

    // Renderizar gráfico de estado de ánimo
    renderMoodChart() {
        const container = document.getElementById('mood-chart');
        if (!container) return;
        
        container.innerHTML = `
            <h4>Estado de Ánimo</h4>
            <div class="mood-history">
                ${this.state.mood.slice(-7).map(entry => `
                    <div class="mood-entry">
                        <span class="mood-date">${entry.date}</span>
                        <span class="mood-value">${entry.mood}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // Renderizar resumen
    renderSummary() {
        const container = document.getElementById('tracking-summary');
        if (!container) return;
        
        const recentSymptoms = this.state.symptoms.slice(-5);
        const avgMood = this.calculateAverageMood();
        
        container.innerHTML = `
            <div class="summary-card">
                <h4>Resumen de Seguimiento</h4>
                <div class="summary-stats">
                    <div class="stat">
                        <span class="stat-label">Síntomas Registrados</span>
                        <span class="stat-value">${this.state.symptoms.length}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Estado de Ánimo Promedio</span>
                        <span class="stat-value">${avgMood}</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Calcular estado de ánimo promedio
    calculateAverageMood() {
        if (this.state.mood.length === 0) return 'N/A';
        
        const moodValues = {
            'excelente': 5,
            'bueno': 4,
            'regular': 3,
            'malo': 2,
            'terrible': 1
        };
        
        const total = this.state.mood.reduce((sum, entry) => {
            return sum + (moodValues[entry.mood] || 3);
        }, 0);
        
        const average = total / this.state.mood.length;
        
        if (average >= 4.5) return 'Excelente';
        if (average >= 3.5) return 'Bueno';
        if (average >= 2.5) return 'Regular';
        if (average >= 1.5) return 'Malo';
        return 'Necesita atención';
    },

    saveData() {
        localStorage.setItem('trackingData', JSON.stringify(this.state));
    },

    loadData() {
        const saved = localStorage.getItem('trackingData');
        if (saved) {
            this.state = { ...this.state, ...JSON.parse(saved) };
        }
    }
};

// ===== MÓDULO DE COMUNICACIÓN =====
const CommunicationModule = {
    // Estado del módulo
    state: {
        messages: [],
        contacts: [],
        currentChat: null
    },

    // Inicializar módulo de comunicación
    init() {
        this.loadData();
        this.renderContacts();
        this.setupChat();
        console.log('Módulo de Comunicación inicializado');
    },

    // Configurar chat
    setupChat() {
        const messageForm = document.getElementById('message-form');
        if (messageForm) {
            messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
    },

    // Renderizar contactos
    renderContacts() {
        const container = document.getElementById('contacts-list');
        if (!container) return;
        
        const contacts = [
            { id: 1, name: 'Dr. Ana García', specialty: 'Ginecología', status: 'online' },
            { id: 2, name: 'Enfermera María', specialty: 'Planificación Familiar', status: 'offline' },
            { id: 3, name: 'Soporte WarniVida', specialty: 'Asistencia Técnica', status: 'online' }
        ];
        
        container.innerHTML = contacts.map(contact => `
            <div class="contact-item" onclick="CommunicationModule.openChat(${contact.id})">
                <div class="contact-avatar">
                    <i class="fas fa-user-md"></i>
                    <span class="status-indicator ${contact.status}"></span>
                </div>
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p>${contact.specialty}</p>
                </div>
            </div>
        `).join('');
    },

    // Abrir chat
    openChat(contactId) {
        this.state.currentChat = contactId;
        this.renderChat();
    },

    // Renderizar chat
    renderChat() {
        const container = document.getElementById('chat-container');
        if (!container) return;
        
        // Simular mensajes
        const messages = [
            { sender: 'Dr. Ana García', message: 'Hola, ¿cómo te sientes hoy?', time: '10:30 AM', type: 'received' },
            { sender: 'Tú', message: 'Hola doctora, me siento bien gracias', time: '10:32 AM', type: 'sent' }
        ];
        
        container.innerHTML = `
            <div class="chat-header">
                <h4>Dr. Ana García</h4>
                <span class="online-status">En línea</span>
            </div>
            <div class="chat-messages">
                ${messages.map(msg => `
                    <div class="message ${msg.type}">
                        <div class="message-content">${msg.message}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                `).join('')}
            </div>
            <form id="message-form" class="message-form">
                <input type="text" placeholder="Escribe tu mensaje..." required>
                <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
        `;
    },

    // Enviar mensaje
    sendMessage() {
        const form = document.getElementById('message-form');
        const input = form.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            // Simular envío de mensaje
            WarniVidaApp.showToast('Mensaje enviado', 'success');
            input.value = '';
        }
    },

    saveData() {
        localStorage.setItem('communicationData', JSON.stringify(this.state));
    },

    loadData() {
        const saved = localStorage.getItem('communicationData');
        if (saved) {
            this.state = { ...this.state, ...JSON.parse(saved) };
        }
    }
};

// ===== INICIALIZACIÓN DE MÓDULOS =====

// Función para inicializar todos los módulos
function initializeModules() {
    // Inicializar módulos cuando se navegue a ellos
    const moduleInitializers = {
        'educacion': () => EducationModule.init(),
        'planificacion': () => PlanningModule.init(),
        'seguimiento': () => TrackingModule.init(),
        'comunicacion': () => CommunicationModule.init()
    };

    // Observar cambios en la navegación
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    const moduleId = target.id.replace('-content', '');
                    if (moduleInitializers[moduleId]) {
                        setTimeout(() => moduleInitializers[moduleId](), 100);
                    }
                }
            }
        });
    });

    // Observar todos los contenidos de módulos
    document.querySelectorAll('.module-content').forEach(content => {
        observer.observe(content, { attributes: true });
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModules);
} else {
    initializeModules();
}

// Exportar módulos para uso global
window.EducationModule = EducationModule;
window.PlanningModule = PlanningModule;
window.TrackingModule = TrackingModule;
window.CommunicationModule = CommunicationModule;

console.log('Módulos específicos de WarniVida cargados correctamente ✨');