import { useEffect, useState } from "react";
import profilePhoto from "./assets/profile.png";
import { projects, skillGroups, contact } from "./data";
import "./App.css";

const THEME_KEY = "talia-portfolio-theme";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "system";
    } catch {
      return "system";
    }
  });

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* localStorage no disponible */
    }
  }, [theme]);

  const toggle = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentlyDark = theme === "dark" || (theme === "system" && prefersDark);
    setTheme(currentlyDark ? "light" : "dark");
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  return { isDark, toggle };
}

function NavBar({ isDark, onToggleTheme }) {
  return (
    <nav className="navbar">
      <a className="brand" href="#top">
        Talia Rodrigues
      </a>
      <div className="nav-links">
        <a href="#about">Sobre mí</a>
        <a href="#projects">Proyectos</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contacto</a>
      </div>
      <button
        id="theme-toggle"
        aria-label="Cambiar tema claro/oscuro"
        title="Cambiar tema"
        onClick={onToggleTheme}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <img className="avatar" src={profilePhoto} alt="Foto de perfil de Talia Rodrigues" />
      <div>
        <p className="eyebrow">Hola, soy</p>
        <h1>Talia Rodrigues</h1>
        <p className="role">Programadora Fullstack &amp; Docente de Informática</p>
        <p className="sub">Estudiando Desarrollo de Videojuegos</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            Ver proyectos
          </a>
          <a className="btn btn-secondary" href="#contact">
            Contactarme
          </a>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section id="about">
      <h2>Sobre mí</h2>
      <div className="card">
        <p>
          Soy programadora Fullstack y docente de informática, apasionada por compartir
          conocimiento tanto como por seguir aprendiendo. Actualmente estoy ampliando mis
          habilidades en el desarrollo de videojuegos, combinando mi experiencia en
          programación con las ganas de crear experiencias interactivas propias. Me gusta
          el trabajo en equipo, entender bien los problemas antes de resolverlos, y
          convertir ideas complejas en explicaciones simples — tanto en el código como en
          el aula.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="project-links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            Ver demo ↗
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer">
            Código ↗
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects">
      <h2>Proyectos</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.name} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="card skills-card">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tags">
              {group.skills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <h2>Contacto</h2>
      <div className="card contact-card">
        <a href={`mailto:${contact.email}`}>📧 {contact.email}</a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          💼 LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer">
          💻 GitHub
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      Hecho con React + Vite — © {new Date().getFullYear()} Talia Rodrigues
    </footer>
  );
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <NavBar isDark={isDark} onToggleTheme={toggle} />
      <div className="wrap">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
