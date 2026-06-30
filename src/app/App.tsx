import { useState, useEffect } from "react";
import { motion } from "motion/react";
import annisaPhoto from "../assets/annisa.png";
import ccsc from "../assets/certificates/ccsc.jpeg";
import emailjs from "@emailjs/browser";
import ambassador from "../assets/certificates/student-ambassador.jpeg";
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Download,
  Award,
  BadgeCheck,
} from "lucide-react";

const ROLES = [
  "Informatics Student",
  "UI/UX Designer",
  "Front-End Developer",
  "Problem Solver",
];

const projects = [
  {
    id: 1,
    title: "Corporate Training & Learning Management System",
    category: "Business Analysis",
    description:
      "Designed and documented a Corporate Training & Learning Management System, including Business Requirements Document (BRD), Functional Requirements, UML diagrams, ERD, user flows, and high-fidelity UI prototypes.",
    tags: ["Business Analysis", "BRD", "Figma", "UML", "System Design"],
    link: "",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    category: "Web Development",
    description:
      "Designed and developed a responsive personal portfolio website using React, TypeScript, Tailwind CSS, and Vite to showcase projects, technical skills, and certifications.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "",
  },
  {
    id: 3,
    title: "PRISM - Predictive Real-time Industrial Self-Managing System",
    category: "Artificial Intelligence",
    description:
      "Developed an intelligent predictive maintenance platform utilizing IoT devices, machine learning models, and real-time analytics to improve industrial equipment maintenance.",
    tags: ["AI", "IoT", "Machine Learning", "TypeScript"],
    link: "https://github.com/annisaregita07/PRISM-PROJECT",
  },
  {
    id: 4,
    title: "Doctors Booking Application",
    category: "Mobile Development",
    description:
      "Developed an Android application that enables users to search for doctors, schedule appointments, and manage bookings through an intuitive mobile interface.",
    tags: ["Java", "Android", "Mobile App", "UI/UX"],
    link: "https://github.com/annisaregita07/DoctorsBookingApp",
  },
  {
    id: 5,
    title: "16-Bit Encryption & Decryption",
    category: "Cyber Security",
    description:
      "Implemented a reversible 16-bit encryption and decryption algorithm demonstrating cryptographic concepts and secure bitmap data recovery.",
    tags: ["C++", "Cryptography", "Encryption", "Algorithms"],
    link: "https://github.com/annisaregita07/16-Bit-Encryption-and-Decryption-in-Cpp",
  },
];
const certificates = [
  {
    title: "Cybersecurity Career Starter Certification (CCSC)",
    issuer: "Hack & Fix",
    date: "Feb 2026",
    category: "Cybersecurity",
    image: ccsc,
    link: "",
  },
  {
    title: "Student Ambassador Certificate of Appreciation",
    issuer: "President University",
    date: "Sep 2024",
    category: "Leadership",
    image: ambassador,
    link: "",
  },
];
const skills = {
  "Business Analysis": [
    "Business Analysis",
    "BRD",
    "Functional Requirements",
    "Use Case",
    "BPMN",
    "UML",
    "ERD",
    "Figma",
  ],

  "Frontend Development": [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Vite",
    "Git",
    "GitHub",
  ],

  Cybersecurity: [
    "Linux",
    "Kali Linux",
    "Nmap",
    "Metasploit",
    "Cryptography",
    "Network Security",
    "OWASP",
    "Wireshark",
  ],
};

const navLinks = ["about", "projects", "certificates", "skills", "contact"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      alert(error?.text || error?.message || JSON.stringify(error));
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-lg font-normal tracking-tight text-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Annisa Regita<span className="text-primary">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-sm text-muted-foreground hover:text-foreground capitalize transition-colors tracking-wide"
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2 bg-primary text-primary-foreground text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              Let&apos;s Talk
            </button>
          </div>

          <button
            className="md:hidden p-1 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-t border-border px-6 py-5 flex flex-col gap-4 shadow-sm">
            {navLinks.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left text-sm capitalize text-foreground py-1 hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>
      {/* ── HERO ── */}
      <section
        id="hero"
        className="min-h-screen grid md:grid-cols-[440px_1fr] lg:grid-cols-[500px_1fr]"
      >
        {/* Left — photo panel */}
        <div className="hidden md:flex relative bg-transparent overflow-hidden items-center justify-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[420px] h-[620px] mb-0"
          >
            <div className="hidden md:flex relative bg-transparent overflow-visible items-start justify-center">
              <img
                src={annisaPhoto}
                alt="Annisa Regita Cahyani"
                className="h-[620px] w-auto -mt-15 ml-50"
              />
            </div>
          </motion.div>
        </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-28 md:pt-0 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-30 text-5xl md:text-6xl lg:text-[4.25rem] font-normal leading-[1.08] text-foreground mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Hi, I&apos;m
            <br />
            <span className="text-primary">Annisa Regita</span> Cahyani
          </motion.h1>

          {/* Animated role */}
          <div className="h-7 mb-6 overflow-hidden">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-lg text-muted-foreground font-light tracking-wide"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base text-muted-foreground max-w-md leading-relaxed mb-8"
          >
            Informatics student with a strong interest in Business Analysis,
            Cybersecurity, and Web Development. Passionate about solving
            problems, analyzing business needs, and building technology
            solutions that create real value.
          </motion.p>

          {/* Mini stats — student context */}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all hover:gap-3 duration-200"
            >
              View My Work <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <Download size={14} /> Download CV
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-5 mt-10"
          >
            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:annisaregita07@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={18} />
            </a>
            <span className="h-px w-10 bg-border" />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin size={11} /> Jakarta, Indonesia
            </span>
          </motion.div>
        </div>
      </section>
      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-primary/70 font-medium mb-4">
            About Me
          </p>

          <h2
            className="text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Creating with
            <br />
            <em>intention</em>
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-5">
            I am an Informatics student at President University with a strong
            interest in Business Analysis, Cybersecurity, and Web Development. I
            enjoy analyzing business requirements, designing system solutions,
            and developing technology driven applications that solve real-world
            problems. Through academic projects and personal learning
            experiences, I continuously improve my technical and analytical
            skills while exploring emerging technologies and industry best
            practices.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Beyond the screen, I am passionate about continuous learning,
            technology innovation, and solving complex problems. I enjoy
            transforming ideas into practical digital solutions while developing
            my skills in business analysis, cybersecurity, and software
            development.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            Open to internships & collaboration
          </div>
        </div>
      </section>
      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 bg-muted">
        <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2
                className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Projects
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p, i) => {
              const Card = (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-primary/70 font-medium mb-2">
                    {p.category}
                  </p>

                  <h3
                    className="text-xl font-normal text-foreground mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 bg-secondary text-primary rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.link && (
                      <ExternalLink
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2"
                      />
                    )}
                  </div>
                </motion.div>
              );

              return p.link ? (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {Card}
                </a>
              ) : (
                <div key={p.id}>{Card}</div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ── CERTIFICATES ── */}
      <section
        id="certificates"
        className="py-28 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto"
      >
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary/70 font-medium mb-4">
              Credentials
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Certificates
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm text-primary font-medium">
            <Award size={14} /> {certificates.length} earned
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group overflow-hidden bg-card border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Preview */}
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block text-[10px] tracking-wider uppercase px-2.5 py-1 bg-secondary text-primary rounded-full font-medium mb-3">
                  {c.category}
                </span>

                <h3 className="text-base font-semibold text-foreground leading-snug mb-1">
                  {c.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">{c.issuer}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {c.date}
                  </span>

                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center gap-1 hover:underline"
                    >
                      View
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Certificate
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 bg-muted">
        <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-primary/70 font-medium mb-4">
            What I Know
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal text-foreground mb-14 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Skills &amp; Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <h3
                  className="text-lg font-normal text-foreground mb-5 pb-4 border-b border-border"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 bg-card border border-border text-foreground rounded-full hover:bg-secondary hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28 bg-primary text-primary-foreground"
      >
        <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#EDD5C8] font-medium mb-4">
              Get In Touch
            </p>

            <h2
              className="text-4xl md:text-5xl font-normal leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s Connect
            </h2>

            <p className="text-[#EDD5C8] leading-relaxed mb-10 text-sm">
              I&apos;m always open to internship opportunities, collaboration,
              or discussions about Business Analysis, Frontend Development, and
              Cybersecurity. Feel free to reach out!
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:annisaregita07@gmail.com"
                className="flex items-center gap-3 text-sm text-[#EDD5C8] hover:text-white transition-colors"
              >
                <Mail size={15} />
                annisaregita07@gmail.com
              </a>

              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/annisaregita07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C87070] hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/annisa-regita-cahyani-1aa604326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C87070] hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p
                className="text-lg italic text-[#EDD5C8]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Turning ideas into practical digital solutions.
              </p>

              <p className="text-xs text-[#C87070] mt-2">
                Business Analysis • Frontend Development • Cybersecurity
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm placeholder:text-[#C87070] text-white outline-none focus:border-white/50 transition-colors"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm placeholder:text-[#C87070] text-white outline-none focus:border-white/50 transition-colors"
            />

            <textarea
              placeholder="Write your message..."
              rows={5}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm placeholder:text-[#C87070] text-white outline-none focus:border-white/50 transition-colors resize-none"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3.5 bg-[#FAF7F2] text-primary rounded-xl text-sm font-medium hover:bg-white transition-colors"
            >
              {submitted ? (
                "Message Sent!"
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
      {/* ── FOOTER ── */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span
            className="text-base font-normal text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Annisa Regita<span className="text-primary">.</span>
          </span>

          <span>© 2026 Annisa Regita Cahyani. All Rights Reserved.</span>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/annisaregita07"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/annisa-regita-cahyani-1aa604326"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:annisaregita07@gmail.com"
              className="hover:text-primary transition-colors"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </footer>{" "}
    </div>
  );
}
