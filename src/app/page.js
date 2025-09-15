import Image from "next/image";
import Link from "next/link";
import mascot from "../../public/HappyBG.png";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-6">
      <Navbar />
      <Chatbot />

      {/* Hero */}
      <section className="w-full max-w-6xl text-center mt-28 md:mt-36 relative">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-60 pointer-events-none" aria-hidden>
          <div className="mx-auto h-64 w-64 md:h-96 md:w-96 rounded-full" style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.35), transparent 60%)" }} />
        </div>

        <div className="flex flex-col items-center gap-5">
          <Image
            src={mascot}
            alt="DewBloom Mascot"
            width={210}
            height={210}
            className="md:w-[240px] md:h-[240px] drop-shadow-xl"
            priority
          />
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg,#fff, #a78bfa)" }}>
            DewBloom
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-foreground)]/85 max-w-2xl">
            Your friendly companion for learning <strong>DBT skills</strong>. Grow emotional resilience through fun lessons, playful dialogues, and real-time feedback.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 max-w-[800px]">
            <Link href="/course" className="btn-primary">
              Start learning
            </Link>
            <Link href="/dashboard" className="btn-secondary">
              See dashboard
            </Link>
            <Link href="/admin" className="btn-secondary">
              See admin
            </Link>
            <Link href="/signup" className="btn-secondary">
              Join us
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-16 md:mt-28 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 px-1">
        {[{
          icon: "💬",
          title: "Playful Dialogues",
          body: "Practice DBT skills with your mascot buddy in safe, guided conversations."
        },{
          icon: "🧠",
          title: "Emotion Insights",
          body: "Get gentle real-time feedback on your emotions to stay self-aware."
        },{
          icon: "🎉",
          title: "Fun Progress",
          body: "Earn rewards and celebrate milestones with your penguin guide."
        }].map((f, i) => (
          <div key={i} className="card-surface p-6 md:p-7 hover:translate-y-[-2px] transition-transform">
            <span className="text-4xl" aria-hidden>{f.icon}</span>
            <h3 className="text-xl font-bold mt-3 text-white">{f.title}</h3>
            <p className="text-[var(--color-foreground)]/80 text-sm mt-2">{f.body}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="signup" className="mt-16 md:mt-28 text-center px-2 w-full">
        <div className="card-surface max-w-3xl mx-auto p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-white">Ready to grow with DewBloom?</h2>
          <p className="text-[var(--color-foreground)]/85 mb-6">Sign up today and start learning with your penguin companion 🐧</p>
          <Link href="/signup" className="btn-primary">
            Get started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 md:mt-20 py-6 md:py-8 text-center text-[var(--color-foreground)]/60 text-sm w-full px-2">
        © {new Date().getFullYear()} DewBloom. All rights reserved.
      </footer>
    </main>
  );
}
