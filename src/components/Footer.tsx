import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Github, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="absolute inset-0 bg-hero-glow opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl md:text-5xl font-semibold leading-tight">
              Let's craft something{" "}
              <span className="text-gradient">extraordinary</span>.
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-primary text-background font-medium shadow-glow hover:scale-[1.03] transition-transform"
            >
              Start a project <ArrowUpRight size={18} />
            </Link>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Studio
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gradient transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-gradient transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-gradient transition-colors">Portfolio</Link></li>
              <li><Link to="/clients" className="hover:text-gradient transition-colors">Clients</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Reach us
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@nebula.studio</li>
              <li>+1 (415) 555-0142</li>
              <li>San Francisco · Berlin</li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[Instagram, Linkedin, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 grid place-items-center rounded-full border border-border/60 hover:border-primary hover:text-primary transition-colors"
                  aria-label="social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Nebula Studio — All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;