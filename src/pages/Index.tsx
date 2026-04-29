import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  PieChart,
  Hourglass,
  Star,
  Award,
  Settings,
  TrendingUp,
  Stars,
  BarChart3,
  MapPin,
} from "lucide-react";

type Cell = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  col: string;
  row: string;
  accent?: boolean;
};

const PETALS: Cell[] = [
  { id: "p1", icon: Lightbulb, title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-3", row: "row-start-1", accent: true },
  { id: "p2", icon: Users,     title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-1", row: "row-start-2" },
  { id: "p3", icon: Star,      title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-5", row: "row-start-2" },
  { id: "p4", icon: Settings,  title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-1", row: "row-start-4" },
  { id: "p5", icon: BarChart3, title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-5", row: "row-start-4" },
  { id: "p6", icon: MapPin,    title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-3", row: "row-start-5" },
];

const INNER: Cell[] = [
  { id: "i1", icon: PieChart,   title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-2" },
  { id: "i2", icon: Hourglass,  title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-2" },
  { id: "i3", icon: Award,      title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-3" },
  { id: "i4", icon: Settings,   title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-3" },
  { id: "i5", icon: TrendingUp, title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-4" },
  { id: "i6", icon: Stars,      title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-4" },
];

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const Hex = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.04 }}
    className="relative aspect-[1/1.1547] w-full"
    style={{ clipPath: HEX_CLIP }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/50 to-secondary/60" />
    <div
      className="absolute inset-[1.5px] glass flex items-center justify-center"
      style={{ clipPath: HEX_CLIP }}
    >
      {children}
    </div>
  </motion.div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background bg-hero-glow font-sans text-foreground overflow-hidden">
      <section className="relative pt-32 pb-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent"
        >
          Our Framework
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl md:text-6xl font-light tracking-tight"
        >
          A <span className="text-gradient font-medium">connected</span> system,
          built around your brand.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground"
        >
          Twelve disciplines orbiting one core idea — every hex is a service
          working in concert with the others.
        </motion.p>
      </section>

      <section className="relative px-4 md:px-10 pb-32">
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-5 grid-rows-5 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-5">
          {PETALS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className={`${c.col} ${c.row}`}>
                <Hex delay={0.05 * i}>
                  <div className="flex flex-col items-center px-4 text-center">
                    <Icon className={`h-6 w-6 mb-2 ${c.accent ? "text-accent" : "text-foreground/90"}`} />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${c.accent ? "text-accent" : "text-primary"}`}>
                      {c.title}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground line-clamp-4">
                      {c.body}
                    </p>
                  </div>
                </Hex>
              </div>
            );
          })}

          {INNER.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className={`${c.col} ${c.row}`}>
                <Hex delay={0.4 + 0.05 * i}>
                  <div className="flex flex-col items-center px-3 text-center">
                    <Icon className="h-5 w-5 mb-1.5 text-foreground/80" />
                    <p className="text-[10px] leading-snug text-muted-foreground line-clamp-3">
                      {c.body}
                    </p>
                  </div>
                </Hex>
              </div>
            );
          })}

          <div className="col-start-3 row-start-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[1/1.1547] w-full"
              style={{ clipPath: HEX_CLIP }}
            >
              <div className="absolute inset-0 bg-gradient-primary" />
              <div
                className="absolute inset-[2px] bg-card flex flex-col items-center justify-center"
                style={{ clipPath: HEX_CLIP }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="h-10 w-10 rounded-md border-2 border-accent rotate-45"
                />
                <p className="mt-3 text-[11px] font-serif italic text-foreground/90">Company</p>
                <p className="text-[11px] font-serif italic text-foreground/90 -mt-0.5">Logo</p>
              </div>
              <div className="absolute -inset-6 -z-10 rounded-full bg-accent/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
