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
    <nav className="sticky top-0 z-20 flex items-center gap-6 border-b border-slate-200 bg-white/80 px-6 py-3.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <a href="#top" className="mr-auto text-sm font-bold tracking-tight text-slate-900 dark:text-white">
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
            className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            {label}
          </a>
        ))}
      </div>
      <button
        aria-label="Cambiar tema claro/oscuro"
        title="Cambiar tema"
        onClick={onToggleTheme}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-base shadow-sm transition-transform hover:scale-105 dark:border-slate-700 dark:bg-slate-900"
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
        <div className="h-72 w-[36rem] rounded-full bg-gradient-to-tr from-blue-400/30 via-sky-300/20 to-indigo-400/30 dark:from-blue-500/20 dark:via-sky-400/10 dark:to-indigo-500/20" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
        <img
          src={profilePhoto}
          alt="Foto de perfil de Talia Rodrigues"
          className="h-32 w-32 shrink-0 rounded-full border-4 border-white object-cover shadow-xl dark:border-slate-800 sm:h-36 sm:w-36"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Hola, soy
          </p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Talia Rodrigues
          </h1>
          <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-200">
            Programadora Fullstack &amp; Docente de Informática
          </p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Estudiando Desarrollo de Videojuegos
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700"
            >
              Ver proyectos
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
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
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
      <span className="h-2.5 w-2.5 rounded-sm bg-blue-600" />
      {children}
    </h2>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto mb-16 max-w-4xl scroll-mt-20 px-6">
      <SectionHeading>Sobre mí</SectionHeading>
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">
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
    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
      {children}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        {project.name}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Ver demo ↗
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
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
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
      <div className="flex flex-wrap gap-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <a
          href={`mailto:${contact.email}`}
          className="font-semibold text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          📧 {contact.email}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          💼 LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
        >
          💻 GitHub
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-500">
      Hecho con React + Vite + Tailwind — © {new Date().getFullYear()} Talia Rodrigues
    </footer>
  );
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
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
