"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  const features = [
    {
      icon: "⏱️",
      title: "Time on Page",
      desc: "See how long users actually stay — not just visits.",
    },
    {
      icon: "🖱️",
      title: "Click Paths",
      desc: "Track where users click and how they navigate.",
    },
    {
      icon: "📍",
      title: "Geo Location",
      desc: "Know where your users are coming from in real-time.",
    },
    {
      icon: "⚡",
      title: "Live Sessions",
      desc: "Watch active visitors and what they’re doing — live.",
    },
    {
      icon: "📊",
      title: "Event Tracking",
      desc: "Track custom events like buttons, forms, and more.",
    },
    {
      icon: "🛡️",
      title: "Privacy-First",
      desc: "No cookies. No PII. Ethical tracking, built-in.",
    },
  ];

  return (
    <section
      ref={ref}
      className="flex justify-center items-center py-24 px-6 min-h-screen text-white bg-[#ff6347]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <h2 className="mb-16 text-4xl font-bold tracking-tight text-center md:text-5xl">
          What We Track
        </h2>
        <div className="flex flex-col gap-4 items-center mb-16">
          <p className="max-w-xl text-lg text-center text-white/70">
            Real-time insights with zero bloat. Just powerful, privacy-friendly
            analytics.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="py-3 px-6 font-semibold text-white rounded-full border transition-all duration-300 hover:shadow-md bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 hover:shadow-white/30"
          >
            Get Started
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="overflow-hidden relative p-6 rounded-2xl border shadow-xl transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-lg hover:shadow-white/30"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 pointer-events-none hover:border-white/20" />

              <div className="flex justify-center items-center mb-4 w-14 h-14 text-2xl rounded-full shadow-inner transition-shadow duration-300 bg-white/10 shadow-white/10 hover:shadow-white/20">
                {f.icon}
              </div>

              <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/90">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
