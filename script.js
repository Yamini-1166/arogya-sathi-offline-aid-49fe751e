
// Global state management
const AppState = {
    currentPage: 'dashboard',
    currentLanguage: 'en',
    isOnline: navigator.onLine,
    patients: [
        {
            id: 1,
            name: 'Sita Devi',
            age: 32,
            gender: 'Female',
            phone: '+91 9876543210',
            lastVisit: '2024-05-30',
            condition: 'Pregnancy Checkup',
            status: 'Active',
            village: 'Rampur'
        },
        {
            id: 2,
            name: 'Ram Kumar',
            age: 45,
            gender: 'Male',
            phone: '+91 9876543211',
            lastVisit: '2024-05-28',
            condition: 'Diabetes',
            status: 'Follow-up',
            village: 'Shyampur'
        },
        {
            id: 3,
            name: 'Meera Sharma',
            age: 28,
            gender: 'Female',
            phone: '+91 9876543212',
            lastVisit: '2024-05-25',
            condition: 'Vaccination',
            status: 'Completed',
            village: 'Rampur'
        }
    ]
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateCurrentDate();
    checkOnlineStatus();
});

// Initialize application
function initializeApp() {
    console.log('Grama Arogya Sathi - Initializing...');
    
    // Set initial page
    showPage('dashboard');
    
    // Set active navigation
    updateNavigation();
    
    // Load saved preferences
    loadUserPreferences();
    
    console.log('App initialized successfully');
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
    
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Online/offline status
    window.addEventListener('online', function() {
        AppState.isOnline = true;
        updateOnlineStatus();
        showNotification('Connection restored', 'success');
    });
    
    window.addEventListener('offline', function() {
        AppState.isOnline = false;
        updateOnlineStatus();
        showNotification('Working offline', 'warning');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterPatients(this.value);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    navigateTo('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    navigateTo('patients');
                    break;
                case '3':
                    e.preventDefault();
                    navigateTo('emergency');
                    break;
            }
        }
    });
}

// Navigation functions
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
    
    // Update state
    AppState.currentPage = page;
    
    // Show page
    showPage(page);
    
    // Update navigation
    updateNavigation();
    
    // Save to localStorage
    localStorage.setItem('currentPage', page);
    
    // Track page view
    trackPageView(page);
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific content
        loadPageContent(pageId);
    } else {
        console.error(`Page not found: ${pageId}`);
        showPage('dashboard'); // Fallback to dashboard
    }
}

function updateNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === AppState.currentPage) {
            btn.classList.add('active');
        }
    });
}

// Page-specific content loading
function loadPageContent(pageId) {
    switch(pageId) {
        case 'patients':
            renderPatients();
            break;
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'appointments':
            loadAppointments();
            break;
        default:
            console.log(`No specific content loader for: ${pageId}`);
    }
}

// Patient management functions
function renderPatients() {
    const patientsGrid = document.querySelector('.patients-grid');
    if (!patientsGrid) return;
    
    patientsGrid.innerHTML = '';
    
    AppState.patients.forEach(patient => {
        const patientCard = createPatientCard(patient);
        patientsGrid.appendChild(patientCard);
    });
}

function createPatientCard(patient) {
    const card = document.createElement('div');
    card.className = 'patient-card';
    card.innerHTML = `
        <div class="patient-header">
            <div>
                <h4>${patient.name}</h4>
                <p>${patient.age} years • ${patient.gender} • ${patient.village}</p>
            </div>
            <span class="status-badge ${patient.status.toLowerCase().replace('-', '')}">${patient.status}</span>
        </div>
        <div class="patient-details">
            <p>📞 ${patient.phone}</p>
            <p>📄 ${patient.condition}</p>
            <p>📅 Last visit: ${formatDate(patient.lastVisit)}</p>
        </div>
        <div class="patient-actions">
            <button class="btn-secondary" onclick="viewPatientDetails(${patient.id})">View Details</button>
            <button class="btn-secondary" onclick="addPatientVisit(${patient.id})">Add Visit</button>
            <button class="btn-secondary" onclick="callPatient('${patient.phone}')">Call</button>
        </div>
    `;
    return card;
}

function filterPatients(searchTerm) {
    const filteredPatients = AppState.patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const patientsGrid = document.querySelector('.patients-grid');
    if (patientsGrid) {
        patientsGrid.innerHTML = '';
        filteredPatients.forEach(patient => {
            const patientCard = createPatientCard(patient);
            patientsGrid.appendChild(patientCard);
        });
    }
}

function showAddPatientForm() {
    showNotification('Add Patient form opened', 'info');
    // In a real app, this would open a modal or navigate to a form
    console.log('Opening add patient form...');
}

function viewPatientDetails(patientId) {
    const patient = AppState.patients.find(p => p.id === patientId);
    if (patient) {
        showNotification(`Viewing details for ${patient.name}`, 'info');
        console.log('Patient details:', patient);
    }
}

function addPatientVisit(patientId) {
    const patient = AppState.patients.find(p => p.id === patientId);
    if (patient) {
        showNotification(`Adding visit for ${patient.name}`, 'info');
        console.log('Adding visit for:', patient);
    }
}

function callPatient(phoneNumber) {
    if (confirm(`Call ${phoneNumber}?`)) {
        window.open(`tel:${phoneNumber}`);
        showNotification(`Calling ${phoneNumber}`, 'success');
    }
}

// Emergency functions
function callEmergency(number) {
    const emergencyNumbers = {
        '108': 'Ambulance',
        '100': 'Police',
        '101': 'Fire Brigade'
    };
    
    const serviceName = emergencyNumbers[number] || 'Emergency Service';
    
    if (confirm(`Call ${serviceName} (${number})?`)) {
        window.open(`tel:${number}`);
        showNotification(`Calling ${serviceName}`, 'success');
        
        // Log emergency call
        logEmergencyCall(number, serviceName);
    }
}

function findNearestHospital() {
    showNotification('Opening maps to find nearest hospital', 'info');
    window.open('https://maps.google.com/?q=nearest+hospital', '_blank');
}

function logEmergencyCall(number, service) {
    const emergencyLog = {
        timestamp: new Date().toISOString(),
        number: number,
        service: service,
        location: 'Current Location' // In a real app, this would be actual GPS coordinates
    };
    
    console.log('Emergency call logged:', emergencyLog);
    
    // In a real app, this would be sent to a server
    let logs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
    logs.push(emergencyLog);
    localStorage.setItem('emergencyLogs', JSON.stringify(logs));
}

// Dashboard functions
function updateDashboardStats() {
    // Update stats with real data
    const totalPatients = AppState.patients.length;
    const activePatients = AppState.patients.filter(p => p.status === 'Active').length;
    const followUpPatients = AppState.patients.filter(p => p.status === 'Follow-up').length;
    
    console.log('Dashboard stats updated:', {
        total: totalPatients,
        active: activePatients,
        followUp: followUpPatients
    });
}

function loadAppointments() {
    console.log('Loading appointments...');
    // In a real app, this would fetch appointments from a server
}

// Utility functions
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const today = new Date();
        currentDateElement.textContent = `📅 ${formatDate(today.toISOString().split('T')[0])}`;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function checkOnlineStatus() {
    AppState.isOnline = navigator.onLine;
    updateOnlineStatus();
}

function updateOnlineStatus() {
    const statusIcon = document.querySelector('.status-icon');
    const statusText = document.querySelector('.status-text');
    
    if (statusIcon && statusText) {
        if (AppState.isOnline) {
            statusIcon.classList.add('online');
            statusText.textContent = 'Online';
            statusText.style.color = '#22c55e';
        } else {
            statusIcon.classList.remove('online');
            statusText.textContent = 'Offline Mode';
            statusText.style.color = '#ef4444';
        }
    }
}

function changeLanguage(languageCode) {
    AppState.currentLanguage = languageCode;
    localStorage.setItem('language', languageCode);
    
    console.log(`Language changed to: ${languageCode}`);
    showNotification(`Language changed to ${getLanguageName(languageCode)}`, 'success');
    
    // In a real app, this would update all text content
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'हिंदी',
        'te': 'తెలుగు'
    };
    return languages[code] || 'Unknown';
}

function loadUserPreferences() {
    // Load saved page
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        AppState.currentPage = savedPage;
    }
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        AppState.currentLanguage = savedLanguage;
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
    }
}

function trackPageView(page) {
    // Analytics tracking
    console.log(`Page view: ${page} at ${new Date().toISOString()}`);
    
    // In a real app, this would send data to analytics service
    let pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
    pageViews[page] = (pageViews[page] || 0) + 1;
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 16px',
        borderRadius: '6px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '1000',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Set background color based on type
    const colors = {
        'success': '#22c55e',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    console.log(`Notification [${type}]: ${message}`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Service worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Export functions for global access
window.navigateTo = navigateTo;
window.callEmergency = callEmergency;
window.findNearestHospital = findNearestHospital;
window.showAddPatientForm = showAddPatientForm;
window.viewPatientDetails = viewPatientDetails;
window.addPatientVisit = addPatientVisit;
window.callPatient = callPatient;

console.log('Grama Arogya Sathi - Script loaded successfully! 🎉');
