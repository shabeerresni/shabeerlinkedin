// Load profile data and populate the page
let profileData = {};

async function loadProfileData() {
    try {
        const response = await fetch('profileData.json');
        profileData = await response.json();
        populatePage();
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function populatePage() {
    // Hero Section
    document.getElementById('hero-name').textContent = profileData.name;
    document.getElementById('hero-headline').textContent = profileData.headline;
    document.getElementById('hero-location').textContent = profileData.location;
    document.getElementById('hero-image').src = profileData.photoUrl || 'https://via.placeholder.com/400';
    document.getElementById('hero-image').alt = profileData.name;

    // Social Links
    document.getElementById('linkedin-link').href = profileData.socialLinks.linkedIn;
    document.getElementById('github-link').href = profileData.socialLinks.github;
    document.getElementById('email-link').href = `mailto:${profileData.socialLinks.email}`;

    // About Section - Use innerHTML to preserve formatting and emojis
    document.getElementById('about-text').innerHTML = profileData.about.replace(/\n/g, '<br>');

    // Experience Section
    const experienceContainer = document.getElementById('experience-timeline');
    profileData.experience.forEach((exp, index) => {
        const expElement = createExperienceCard(exp, index === 0);
        experienceContainer.appendChild(expElement);
    });

    // Skills Section
    const skillsContainer = document.getElementById('skills-container');
    profileData.skills.forEach(skill => {
        const skillElement = createSkillBadge(skill);
        skillsContainer.appendChild(skillElement);
    });

    // Domain Expertise
    const domainContainer = document.getElementById('domain-expertise');
    profileData.domain_expertise.forEach(domain => {
        const domainElement = createSkillBadge(domain, true);
        domainContainer.appendChild(domainElement);
    });

    // Education Section
    const educationContainer = document.getElementById('education-container');
    profileData.education.forEach(edu => {
        const eduElement = createEducationCard(edu);
        educationContainer.appendChild(eduElement);
    });

    // Projects Section
    const projectsContainer = document.getElementById('projects-container');
    profileData.projects.forEach(project => {
        const projectElement = createProjectCard(project);
        projectsContainer.appendChild(projectElement);
    });

    // Contact Section Links
    document.getElementById('contact-linkedin').href = profileData.socialLinks.linkedIn;
    document.getElementById('contact-github').href = profileData.socialLinks.github;
    document.getElementById('contact-email').href = `mailto:${profileData.socialLinks.email}`;

    // Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Lucide icons
    lucide.createIcons();
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
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-2">${exp.title}</h3>
                    <p class="text-lg text-blue-600 dark:text-blue-400 mb-2">${exp.company}</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">${duration}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-500">${exp.location}</p>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function createSkillBadge(skill, isDomain = false) {
    const badge = document.createElement('span');
    badge.className = isDomain 
        ? 'skill-badge bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
        : 'skill-badge';
    badge.textContent = skill;
    return badge;
}

function createEducationCard(edu) {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${edu.degree}</h3>
        <p class="text-lg text-blue-600 dark:text-blue-400 mb-2">${edu.institution}</p>
        <p class="text-gray-600 dark:text-gray-400 mb-2">${edu.startDate} - ${edu.endDate}</p>
        ${edu.description ? `<p class="text-sm text-gray-500 dark:text-gray-500 italic">${edu.description}</p>` : ''}
    `;
    
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
    setTimeout(() => lucide.createIcons(), 100);
    
    return card;
}

// Smooth scroll for navigation links
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
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    const icon = document.querySelector('#mobile-menu-btn i');
    if (menu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
});

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // For now, just open email client
    // You can integrate EmailJS here later
    const mailtoLink = `mailto:${profileData.socialLinks.email}?subject=Contact from Portfolio&body=Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Opening your email client...');
    e.target.reset();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

