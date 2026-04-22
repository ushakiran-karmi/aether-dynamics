import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Field = ({ label, type = "text", value, onChange, textarea, name }: any) => (
  <label className="group relative block">
    <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    {textarea ? (
      <textarea
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors resize-none"
        placeholder="Tell us about your project, timing and goals…"
      />
    ) : (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-3 text-base transition-colors"
        placeholder=" "
      />
    )}
    <span className="pointer-events-none absolute left-0 -bottom-px h-px w-0 bg-gradient-primary group-focus-within:w-full transition-all duration-500" />
  </label>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const onChange = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }
    toast.success("Thanks! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-hero-glow -z-10" />
        <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-widest text-secondary">
              Contact
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className="mt-4 font-display text-5xl md:text-7xl font-semibold leading-[1]"
            >
              Let's build something <span className="text-gradient">unforgettable</span>.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="mt-6 text-muted-foreground max-w-md">
              Tell us about your project. We respond within one business day with a clear next step.
            </motion.p>

            <div className="mt-12 space-y-5 text-sm">
              {[
                { icon: Mail, label: "Email", value: "hello@nebula.studio" },
                { icon: Phone, label: "Phone", value: "+1 (415) 555-0142" },
                { icon: MapPin, label: "Studio", value: "San Francisco · Berlin" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="h-11 w-11 grid place-items-center rounded-xl border border-border/60 text-secondary">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                    <div className="text-base">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative p-8 md:p-10 rounded-3xl glass border border-border/60"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Your name" name="name" value={form.name} onChange={onChange} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} />
              <Field label="Company" name="company" value={form.company} onChange={onChange} />
              <Field label="Budget (USD)" name="budget" value={form.budget} onChange={onChange} />
              <div className="md:col-span-2">
                <Field label="Project brief" name="message" value={form.message} onChange={onChange} textarea />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-primary text-background font-medium shadow-glow hover:scale-[1.03] transition-transform"
            >
              Send enquiry
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Contact;