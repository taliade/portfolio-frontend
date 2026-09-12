import { useEffect, useState } from "react";
import profilePhoto from "./assets/profile.png";
import { projects, skillGroups, contact } from "./data";

const THEME_KEY = "talia-portfolio-theme";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "system";
    } catch {
      return "system";
    }
  });

  const isDark = () => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark());
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* localStorage no disponible */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const toggle = () => setTheme(isDark() ? "light" : "dark");

  return { isDark: isDark(), toggle };
}

function NavBar({ isDark, onToggleTheme }) {
  return (
    <nav className="sticky top-0 z-20 flex items-center gap-6 border-b border-sage/25 bg-cream/85 px-6 py-3.5 backdrop-blur-md dark:border-sage/20 dark:bg-forest/85">
      <a href="#top" className="mr-auto text-sm font-bold tracking-tight text-forest dark:text-cream">
        Talia Rodrigues
      </a>
      <div className="hidden gap-6 sm:flex">
        {[
          ["Sobre mí", "#about"],
          ["Proyectos", "#projects"],
          ["Skills", "#skills"],
          ["Contacto", "#contact"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-forest/60 transition-colors hover:text-teal dark:text-cream/60 dark:hover:text-rose"
          >
            {label}
          </a>
        ))}
      </div>
      <button
        aria-label="Cambiar tema claro/oscuro"
        title="Cambiar tema"
        onClick={onToggleTheme}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage/30 bg-cream text-base shadow-sm transition-transform hover:scale-105 dark:border-sage/25 dark:bg-forest-light"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-20 sm:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center blur-3xl"
      >
        <div className="h-72 w-[36rem] rounded-full bg-gradient-to-tr from-teal/25 via-sage/20 to-rose/25 dark:from-teal/20 dark:via-sage/15 dark:to-rose/20" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
        <img
          src={profilePhoto}
          alt="Foto de perfil de Talia Rodrigues"
          className="h-32 w-32 shrink-0 rounded-full border-4 border-cream object-cover shadow-xl dark:border-forest-light sm:h-36 sm:w-36"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal dark:text-rose">
            Hola, soy
          </p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-forest dark:text-cream sm:text-5xl">
            Talia Rodrigues
          </h1>
          <p className="mt-3 text-lg font-semibold text-forest/85 dark:text-cream/90">
            Programadora Fullstack &amp; Docente de Informática
          </p>
          <p className="mt-1 text-forest/55 dark:text-cream/55">
            Estudiando Desarrollo de Videojuegos
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-cream shadow-sm shadow-teal/30 transition hover:bg-forest"
            >
              Ver proyectos
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-sage/40 bg-cream px-5 py-2.5 text-sm font-semibold text-forest shadow-sm transition hover:border-sage dark:border-sage/30 dark:bg-forest-light dark:text-cream dark:hover:border-sage/60"
            >
              Contactarme
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-forest dark:text-cream">
      <span className="h-2.5 w-2.5 rounded-sm bg-teal dark:bg-rose" />
      {children}
    </h2>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto mb-16 max-w-4xl scroll-mt-20 px-6">
      <SectionHeading>Sobre mí</SectionHeading>
      <div className="rounded-2xl border border-sage/25 bg-white p-7 shadow-sm dark:border-sage/15 dark:bg-forest-light">
        <p className="leading-relaxed text-forest/70 dark:text-cream/75">
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

function Tag({ children }) {
  return (
    <span className="rounded-full bg-sage/15 px-2.5 py-1 text-xs font-semibold text-forest dark:bg-sage/20 dark:text-cream">
      {children}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-sage/25 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal/50 hover:shadow-md dark:border-sage/15 dark:bg-forest-light dark:hover:border-rose/40">
      <h3 className="text-base font-bold text-forest dark:text-cream">
        {project.name}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-forest/60 dark:text-cream/65">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="flex gap-4 pt-1">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-teal hover:underline dark:text-rose"
          >
            Ver demo ↗
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-teal hover:underline dark:text-rose"
          >
            Código ↗
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto mb-16 max-w-5xl scroll-mt-20 px-6">
      <SectionHeading>Proyectos</SectionHeading>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.name} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto mb-16 max-w-4xl scroll-mt-20 px-6">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-sage/25 bg-white p-7 shadow-sm dark:border-sage/15 dark:bg-forest-light sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-forest/45 dark:text-cream/45">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
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
    <section id="contact" className="mx-auto mb-16 max-w-4xl scroll-mt-20 px-6">
      <SectionHeading>Contacto</SectionHeading>
      <div className="flex flex-wrap gap-6 rounded-2xl border border-sage/25 bg-white p-7 shadow-sm dark:border-sage/15 dark:bg-forest-light">
        <a
          href={`mailto:${contact.email}`}
          className="font-semibold text-forest/80 transition-colors hover:text-teal dark:text-cream/85 dark:hover:text-rose"
        >
          📧 {contact.email}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-forest/80 transition-colors hover:text-teal dark:text-cream/85 dark:hover:text-rose"
        >
          💼 LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-forest/80 transition-colors hover:text-teal dark:text-cream/85 dark:hover:text-rose"
        >
          💻 GitHub
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-sage/20 py-8 text-center text-sm text-forest/45 dark:border-sage/15 dark:text-cream/40">
      Hecho con React + Vite + Tailwind — © {new Date().getFullYear()} Talia Rodrigues
    </footer>
  );
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-cream dark:bg-forest">
      <NavBar isDark={isDark} onToggleTheme={toggle} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
