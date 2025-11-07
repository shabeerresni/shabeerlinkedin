// Load profile data and populate the page
let profileData = {};

async function loadProfileData() {
    try {
        const response = await fetch('profileData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        profileData = await response.json();
        console.log('Profile data loaded successfully:', profileData);
        populatePage();
    } catch (error) {
        console.error('Error loading profile data:', error);
        // Show user-friendly error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorMsg.innerHTML = `
            <p class="font-semibold">Error loading content!</p>
            <p class="text-sm mt-1">Please use a local server. Run: python3 -m http.server 8000</p>
        `;
        document.body.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 5000);
    }
}

function populatePage() {
    console.log('Populating page with data...');
    
    // Hero Section
    const heroName = document.getElementById('hero-name');
    const heroHeadline = document.getElementById('hero-headline');
    const heroLocation = document.getElementById('hero-location');
    const heroImage = document.getElementById('hero-image');
    
    if (heroName) heroName.textContent = profileData.name || 'Name not found';
    if (heroHeadline) heroHeadline.textContent = profileData.headline || 'Headline not found';
    if (heroLocation) {
        const locationSpan = heroLocation.querySelector('span');
        if (locationSpan) {
            locationSpan.textContent = profileData.location || 'Location not found';
        } else {
            heroLocation.textContent = profileData.location || 'Location not found';
        }
    }
    if (heroImage) {
        heroImage.src = profileData.photoUrl || 'https://via.placeholder.com/400';
        heroImage.alt = profileData.name || 'Profile';
    }

    // Social Links
    const linkedinLink = document.getElementById('linkedin-link');
    const githubLink = document.getElementById('github-link');
    const emailLink = document.getElementById('email-link');
    
    if (linkedinLink && profileData.socialLinks) linkedinLink.href = profileData.socialLinks.linkedIn || '#';
    if (githubLink && profileData.socialLinks) githubLink.href = profileData.socialLinks.github || '#';
    if (emailLink && profileData.socialLinks) emailLink.href = `mailto:${profileData.socialLinks.email || ''}`;

    // About Section - Use innerHTML to preserve formatting and emojis
    const aboutText = document.getElementById('about-text');
    if (aboutText && profileData.about) {
        aboutText.innerHTML = profileData.about.replace(/\n/g, '<br>');
    }

    // Experience Section
    const experienceContainer = document.getElementById('experience-timeline');
    if (experienceContainer && profileData.experience) {
        profileData.experience.forEach((exp, index) => {
            const expElement = createExperienceCard(exp, index === 0);
            experienceContainer.appendChild(expElement);
        });
    }

    // Skills Section
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && profileData.skills) {
        profileData.skills.forEach(skill => {
            const skillElement = createSkillBadge(skill);
            skillsContainer.appendChild(skillElement);
        });
    }

    // Domain Expertise
    const domainContainer = document.getElementById('domain-expertise');
    if (domainContainer && profileData.domain_expertise) {
        profileData.domain_expertise.forEach(domain => {
            const domainElement = createSkillBadge(domain, true);
            domainContainer.appendChild(domainElement);
        });
    }

    // Education Section
    const educationContainer = document.getElementById('education-container');
    if (educationContainer && profileData.education) {
        profileData.education.forEach(edu => {
            const eduElement = createEducationCard(edu);
            educationContainer.appendChild(eduElement);
        });
    }

    // Projects Section
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && profileData.projects) {
        profileData.projects.forEach(project => {
            const projectElement = createProjectCard(project);
            projectsContainer.appendChild(projectElement);
        });
    }

    // Contact Section Links
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactGithub = document.getElementById('contact-github');
    const contactEmail = document.getElementById('contact-email');
    
    if (contactLinkedin && profileData.socialLinks) contactLinkedin.href = profileData.socialLinks.linkedIn || '#';
    if (contactGithub && profileData.socialLinks) contactGithub.href = profileData.socialLinks.github || '#';
    if (contactEmail && profileData.socialLinks) contactEmail.href = `mailto:${profileData.socialLinks.email || ''}`;

    // Footer Year
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Setup contact form after data is loaded
    setupContactForm();
    
    console.log('Page populated successfully!');
}

function createExperienceCard(exp, isFirst) {
    const card = document.createElement('div');
    card.className = `timeline-item ${isFirst ? '' : 'border-l-2'} mb-8`;
    card.setAttribute('data-aos', 'fade-up');
    
    const duration = `${exp.start_date} - ${exp.end_date}`;
    
    card.innerHTML = `
        <div class="flex items-start">
            <div class="timeline-dot"></div>
            <div class="ml-6 flex-1">
                <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 card-glow border-l-4" style="border-left-color: #667eea;">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${exp.title}</h3>
                            <p class="text-lg font-semibold mb-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${exp.company}</p>
                        </div>
                        <i data-lucide="briefcase" class="w-6 h-6 text-indigo-500 flex-shrink-0 ml-4"></i>
                    </div>
                    <div class="flex flex-wrap items-center gap-4 text-sm">
                        <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <i data-lucide="calendar" class="w-4 h-4"></i>
                            ${duration}
                        </span>
                        <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <i data-lucide="map-pin" class="w-4 h-4"></i>
                            ${exp.location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Re-initialize icons
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
    
    return card;
}

function createSkillBadge(skill, isDomain = false) {
    const badge = document.createElement('span');
    if (isDomain) {
        badge.className = 'skill-badge px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-110 shadow-md';
        badge.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        badge.style.color = 'white';
    } else {
        badge.className = 'skill-badge';
    }
    badge.textContent = skill;
    return badge;
}

function createEducationCard(edu) {
    const card = document.createElement('div');
    card.className = 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 card-glow border-l-4';
    card.style.borderLeftColor = '#667eea';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${edu.degree}</h3>
                <p class="text-lg font-semibold mb-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${edu.institution}</p>
                <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
                    <span class="flex items-center gap-1">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        ${edu.startDate} - ${edu.endDate}
                    </span>
                </div>
                ${edu.description ? `<p class="text-sm text-gray-500 dark:text-gray-500 italic flex items-center gap-1 mt-2">
                    <i data-lucide="award" class="w-4 h-4"></i>
                    ${edu.description}
                </p>` : ''}
            </div>
            <i data-lucide="graduation-cap" class="w-8 h-8 text-indigo-500"></i>
        </div>
    `;
    
    // Re-initialize icons
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
    
    return card;
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    
    const linkHtml = project.link && project.link !== 'URL (if any)' 
        ? `<a href="${project.link}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
            <i data-lucide="external-link" class="w-4 h-4 inline"></i> View Project
          </a>`
        : '';
    
    card.innerHTML = `
        <h3 class="text-xl font-semibold mb-3">${project.name}</h3>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">${project.description}</p>
        ${linkHtml}
    `;
    
    // Re-initialize icons for this card
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
    
    return card;
}

// Smooth scroll for navigation links - wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

// Mobile menu toggle - wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
                const icon = document.querySelector('#mobile-menu-btn i');
                if (icon) {
                    if (menu.classList.contains('hidden')) {
                        icon.setAttribute('data-lucide', 'menu');
                    } else {
                        icon.setAttribute('data-lucide', 'x');
                    }
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            }
        });
    }
});

// Contact form handler - wait for DOM and profile data
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // For now, just open email client
            // You can integrate EmailJS here later
            if (profileData.socialLinks && profileData.socialLinks.email) {
                const mailtoLink = `mailto:${profileData.socialLinks.email}?subject=Contact from Portfolio&body=Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage: ${formData.message}`;
                window.location.href = mailtoLink;
                
                // Show success message
                alert('Opening your email client...');
                e.target.reset();
            } else {
                alert('Email address not configured. Please check profileData.json');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not loaded');
    }
    
    // Load profile data
    loadProfileData();
    
    // Initialize Lucide icons for static elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons library not loaded');
    }
});

