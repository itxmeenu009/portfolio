const CONFIG = {
  EMAILJS_PUBLIC_KEY: "GWeOGM-cWhf8QuEY2",
  EMAILJS_SERVICE_ID: "service_9j23n9f",
  EMAILJS_TEMPLATE_ID: "template_r5lqg5y",
  TYPING_SPEED: 55,
};

try {
  emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
  console.log("✅ EmailJS initialized successfully");
} catch (err) {
  console.error("❌ EmailJS initialization failed:", err);
  showEmailJSError();
}

function showEmailJSError() {
  const statusDiv = document.getElementById('formStatus');
  if (statusDiv) {
    statusDiv.textContent = '⚠️ Email service temporarily unavailable. Please email me directly at noorijopu89@gmail.com';
    statusDiv.className = 'form-status show error';
  }
}


const fullName = "I'm Noor ul amin";
const typingSpan = document.getElementById("typingTarget");
let typedIndex = 0;
let typingInterval = null;

function startTyping() {
  if (!typingSpan) return;
  typingSpan.textContent = "";
  typedIndex = 0;
  
  if (typingInterval) clearInterval(typingInterval);
  
  typingInterval = setInterval(() => {
    if (typedIndex < fullName.length) {
      typingSpan.textContent += fullName[typedIndex];
      typedIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, CONFIG.TYPING_SPEED);
}

startTyping();

// ========================================
// PROJECTS DATA
// ========================================
const projectsData = [
  {
    id: 'landing',
    title: "Landing Experience",
    description: "A performance-focused landing page with polished UI and smooth transitions.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    href: "./Landing Page index.html",
    badge: "Featured",
    category: "nextjs"
  },
  {
    id: 'ecommerce',
    title: "E-commerce UI Kit",
    description: "Component-driven UI kit with reusable patterns, accessibility, and motion.",
    tech: ["React", "Tailwind", "Framer Motion"],
    href: "./E-commerce UI Kit index.html",
    category: "react"
  },
  {
    id: 'dashboard',
    title: "Dashboard Analytics",
    description: "Data-heavy dashboard layout optimized for readability and responsive behavior.",
    tech: ["Next.js", "Charts", "TypeScript"],
    href: "./Dashboard Analytics index.html",
    badge: "Popular",
    category: "nextjs"
  },
  {
    id: 'portfolio',
    title: "Portfolio v2 Concept",
    description: "Glassmorphism + neon accents with crisp typography and interactive cards.",
    tech: ["UI/UX", "Motion", "Design System"],
    href: "./Portfolio v2 Concept index.html",
    category: "ui"
  }
];

function renderProjects(filter = 'all') {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);
  
  if (filteredProjects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 2rem; display: block; margin-bottom: 1rem;"></i>
        <p>No projects found in this category.</p>
      </div>
    `;
    return;
  }
  
  filteredProjects.forEach((proj, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.category = proj.category;
    
    const techHtml = proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
    const badgeHtml = proj.badge ? `<span class="project-badge">${proj.badge}</span>` : "";
    
    card.innerHTML = `
      ${badgeHtml}
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <div class="tech-stack">${techHtml}</div>
      <div class="project-footer">
        <a href="${proj.href}" class="project-link" target="_blank" rel="noopener noreferrer">
          View Project <span>→</span>
        </a>
        <button class="project-github" aria-label="View source code" data-github="${proj.github}">
          <i class="fab fa-github"></i>
        </button>
      </div>
    `;
    
    grid.appendChild(card);
    setTimeout(() => {
      card.classList.add('visible');
    }, 100 + index * 100);
  });
  
  // GitHub button handlers
  document.querySelectorAll('.project-github').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.github;
      if (url) window.open(url, '_blank');
    });
  });
}

function setupFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });
}


const nameInput = document.getElementById("formName");
const emailInput = document.getElementById("formEmail");
const phoneInput = document.getElementById("formPhone");
const messageInput = document.getElementById("formMessage");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function isValidPhone(phone) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validateField(field, errorElement, validator, errorMessage) {
  const value = field.value.trim();
  if (!value || !validator(value)) {
    errorElement.textContent = errorMessage;
    field.classList.add('error');
    return false;
  } else {
    errorElement.textContent = "";
    field.classList.remove('error');
    return true;
  }
}

function validateForm() {
  let valid = true;
  
  if (!validateField(nameInput, nameError, (v) => v.length >= 2, "Please enter your name (min 2 characters).")) {
    valid = false;
  }
  
  if (!validateField(emailInput, emailError, isValidEmail, "Please enter a valid email address.")) {
    valid = false;
  }
  
  if (!validateField(phoneInput, phoneError, isValidPhone, "Please enter a valid phone number (8-15 digits).")) {
    valid = false;
  }
  
  if (!validateField(messageInput, messageError, (v) => v.length >= 10, "Message must be at least 10 characters.")) {
    valid = false;
  }
  
  return valid;
}

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('92') && value.length > 2) {
      if (value.length > 4) {
        value = '+' + value.slice(0, 2) + ' ' + value.slice(2);
      }
    }
    e.target.value = value;
  });
}


async function handleSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending... <i class='fas fa-spinner fa-pulse'></i>";
  formStatus.classList.remove("show", "success", "error");
  
  const templateParams = {
    from_name: nameInput.value.trim(),
    from_email: emailInput.value.trim(),
    phone_number: phoneInput.value.trim(),
    message: messageInput.value.trim(),
    to_name: "Noor ul Amin",
    reply_to: emailInput.value.trim()
  };
  
  try {
    await emailjs.send(
      CONFIG.EMAILJS_SERVICE_ID,
      CONFIG.EMAILJS_TEMPLATE_ID,
      templateParams,
      CONFIG.EMAILJS_PUBLIC_KEY
    );
    
    formStatus.textContent = "✅ Message sent successfully! I'll get back to you within 24 hours.";
    formStatus.className = "form-status show success";
    
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
    document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.classList.remove('error'));
    
  } catch (error) {
    console.error("EmailJS error:", error);
    
    formStatus.textContent = "⚠️ Something went wrong. Please try again or contact me directly at noorijopu89@gmail.com";
    formStatus.className = "form-status show error";
    
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message <i class='fas fa-paper-plane'></i>";
    
    setTimeout(() => {
      formStatus.classList.remove("show");
    }, 8000);
  }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

[nameInput, emailInput, phoneInput, messageInput].forEach(input => {
  if (input) {
    input.addEventListener("blur", validateForm);
    input.addEventListener("input", () => {
      if (input.classList.contains('error')) {
        validateForm();
      }
    });
  }
});


document.getElementById("hireMeBtn")?.addEventListener("click", () => {
  window.open("https://wa.me/923285520430", "_blank");
});

document.getElementById("viewProjectsBtn")?.addEventListener("click", () => {
  document.getElementById("projects")?.scrollIntoView({ 
    behavior: "smooth", 
    block: "start" 
  });
});


const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = themeToggle?.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
  currentTheme = theme;
}

setTheme(currentTheme);

themeToggle?.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

document.addEventListener('keydown', (e) => {

  if (e.ctrlKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
    e.preventDefault();
    themeToggle?.click();
  }
  

  if (e.key === 'Escape') {
    navLinks?.classList.remove('open');
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

document.getElementById("currentYear").innerText = new Date().getFullYear();

renderProjects('all');
setupFilters();

console.log("🚀 Portfolio V2 initialized successfully!");


document.addEventListener('DOMContentLoaded', () => {
 
  const profileImages = document.querySelectorAll('.profile-img, #mobileDp');
  
  profileImages.forEach(img => {
    img.addEventListener('error', function() {
    
      this.style.display = 'none';
      const wrapper = this.closest('.profile-image-wrapper, .mobile-profile-img');
      if (wrapper) {
        const fallback = document.createElement('div');
        fallback.className = 'profile-fallback';
        fallback.textContent = 'NA';
        fallback.style.cssText = `
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--dark);
        `;
        wrapper.appendChild(fallback);
      }
    });
  });
});

document.addEventListener('click', (e) => {
  const menu = document.getElementById('navLinks');
  const toggle = document.getElementById('menuToggle');
  
  if (menu && toggle && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
    }
  }
});
