const EMAILJS_PUBLIC_KEY = "GWeOGM-cWhf8QuEY2";
const EMAILJS_SERVICE_ID = "service_9j23n9f";
const EMAILJS_TEMPLATE_ID = "template_r5lqg5y";

try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log("EmailJS initialized successfully");
} catch (err) {
  console.error("EmailJS initialization failed:", err);
}

const fullName = "I'm NOOR UL AMIN";
const typingSpan = document.getElementById("typingTarget");
let typedIndex = 0;
let typingInterval = null;
let isTypingComplete = false;

function startTyping() {
  if (!typingSpan) return;
  typingSpan.textContent = "";
  typedIndex = 0;
  isTypingComplete = false;
  if (typingInterval) clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    if (typedIndex < fullName.length) {
      typingSpan.textContent += fullName[typedIndex];
      typedIndex++;
    } else {
      clearInterval(typingInterval);
      isTypingComplete = true;
    }
  }, 55);
}
startTyping();

const glowLayer = document.getElementById("heroGlowLayer");
if (glowLayer) {
  const onMove = (e) => {
    const rect = glowLayer.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    glowLayer.style.setProperty("--x", `${px * 100}%`);
    glowLayer.style.setProperty("--y", `${py * 100}%`);
  };
  window.addEventListener("pointermove", onMove);
}

const projectsData = [
  {
    title: "Landing Experience",
    description: "A performance-focused landing page with polished UI and smooth transitions.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    href: "./Landing Page index.html"
  },
  {
    title: "E-commerce UI Kit",
    description: "Component-driven UI kit with reusable patterns, accessibility, and motion.",
    tech: ["React", "Tailwind", "Framer Motion"],
    href: "./E-commerce UI Kit index.html"
  },
  {
    title: "Dashboard Analytics",
    description: "Data-heavy dashboard layout optimized for readability and responsive behavior.",
    tech: ["Next.js", "Charts", "TypeScript"],
    href: "./Dashboard Analytics index.html"
  },
  {
    title: "Portfolio v2 Concept",
    description: "Glassmorphism + neon accents with crisp typography and interactive cards.",
    tech: ["UI/UX", "Motion", "Design System"],
    href: "./Portfolio v2 Concept index.html"
  }
];

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  projectsData.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";
    const techHtml = proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
    card.innerHTML = `
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.description}</p>
      <div class="tech-stack">${techHtml}</div>
      <a href="${proj.href}" class="project-link">View Project <span>→</span></a>
    `;
    grid.appendChild(card);
  });
}
renderProjects();

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validateField(field, errorElement, validator, errorMessage) {
  const value = field.value;
  if (!validator(value)) {
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validateForm() {
  let valid = true;

  if (!validateField(nameInput, nameError, (v) => v.trim().length >= 2, "Please enter your name.")) {
    valid = false;
  }

  if (!validateField(emailInput, emailError, isValidEmail, "Please enter a valid email.")) {
    valid = false;
  }

  if (!validateField(phoneInput, phoneError, isValidPhone, "Please enter a valid phone number (10–15 digits).")) {
    valid = false;
  }

  if (!validateField(messageInput, messageError, (v) => v.trim().length >= 10, "Message must be at least 10 characters.")) {
    valid = false;
  }

  return valid;
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending... <i class='fas fa-spinner fa-pulse'></i>";
  formStatus.classList.remove("show", "success", "error");

  const templateParams = {
  from_name: nameInput?.value || "Visitor",
  from_email: emailInput?.value || "",
  phone_number: phoneInput?.value || "",
  message: messageInput?.value || "",
  to_name: "Noor ul Amin",
  reply_to: emailInput?.value || ""
};

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    formStatus.textContent = "✅ Message sent successfully! I'll get back to you soon.";
    formStatus.classList.add("success", "show");

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";

  } catch (error) {
    console.error("EmailJS error:", error);

    formStatus.textContent = "⚠️ Something went wrong. Please try again or contact me directly at noorijopu89@gmail.com";
    formStatus.classList.add("error", "show");

  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message <i class='fas fa-paper-plane'></i>";

    setTimeout(() => {
      formStatus.classList.remove("show");
    }, 6000);
  }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) contactForm.addEventListener("submit", handleSubmit);

nameInput?.addEventListener("blur", () => validateForm());
emailInput?.addEventListener("blur", () => validateForm());
phoneInput?.addEventListener("blur", () => validateForm());
messageInput?.addEventListener("blur", () => validateForm());

document.getElementById("hireMeBtn")?.addEventListener("click", () => {
  window.open("https://wa.me/923285520430", "_blank");
});

document.getElementById("viewProjectsLink")?.addEventListener("click", () => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("currentYear").innerText = new Date().getFullYear();
