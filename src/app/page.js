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

      {/* New Hero with iPhone mockup and scattered mascot */}
      <section className="w-full max-w-6xl mt-28 md:mt-36 relative">
        {/* Subtle glow background */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-30 pointer-events-none" aria-hidden>
          <div className="mx-auto h-64 w-64 md:h-[28rem] md:w-[28rem] rounded-full" style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15), transparent 60%)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black">
              DBT with AI, in a playful Duolingo style
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
              Learn DBT skills with Happy, your friendly mascot. Bite-sized lessons, playful practice, real feedback.
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <Link href="/course" className="btn-primary">Start learning</Link>
              <Link href="/signup" className="btn-secondary">Join waitlist</Link>
            </div>

            {/* Platform badges */}
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-600">Coming soon on</span>
              <span className="text-sm font-semibold text-black">iPhone</span>
              <span className="text-sm text-gray-500">and</span>
              <span className="text-sm font-semibold text-black">Android</span>
            </div>
          </div>

          {/* Right iPhone mockup with realistic UI */}
          <div className="relative flex justify-center">
            <div className="relative h-[540px] w-[270px] md:h-[620px] md:w-[300px] rounded-[48px] border border-gray-200 bg-gray-900 shadow-2xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}>
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-black rounded-b-2xl" />
              {/* Screen content placeholder */}
              <div className="absolute inset-0 p-5 flex flex-col">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Happy</span>
                  <span>•••</span>
                </div>
                {/* Lesson card */}
                <div className="mt-4 bg-white/10 p-4 rounded-xl text-left">
                  <div className="text-sm font-semibold text-white">Daily Skill</div>
                  <div className="text-xs text-gray-300">Mindful Breathing</div>
                </div>
                {/* Chat */}
                <div className="mt-3 flex-1 bg-white/10 rounded-xl p-3 overflow-hidden flex flex-col">
                  <div className="text-xs text-gray-300 mb-2 px-1">Chat with Happy</div>
                  <div className="flex-1 space-y-2 overflow-auto pr-1">
                    <div className="max-w-[85%] text-xs bg-purple-500/30 text-white px-3 py-2 rounded-2xl rounded-bl-sm">Hi! I'm Happy. Ready for a 1‑minute mindful breath?</div>
                    <div className="max-w-[85%] text-xs bg-white/20 text-white/90 px-3 py-2 rounded-2xl rounded-br-sm ml-auto">Yes, let's do it.</div>
                    <div className="max-w-[85%] text-xs bg-purple-500/30 text-white px-3 py-2 rounded-2xl rounded-bl-sm">Great! Inhale for 4… hold 4… exhale for 6…</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-8 flex-1 bg-white/20 rounded-full"></div>
                    <div className="h-8 w-8 rounded-full bg-purple-500/60" />
                  </div>
                </div>
                {/* Bottom nav */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="bg-white/10 h-12 rounded-xl flex items-center justify-center text-white/70 text-xs">Home</div>
                  <div className="bg-white/10 h-12 rounded-xl flex items-center justify-center text-white/70 text-xs">Learn</div>
                  <div className="bg-white/10 h-12 rounded-xl flex items-center justify-center text-white/70 text-xs">You</div>
                </div>
              </div>
            </div>

            {/* Mascots around phone */}
            <Image src={mascot} alt="Happy" width={56} height={56} className="absolute -left-6 top-6 rotate-[-12deg]" />
            <Image src={mascot} alt="Happy" width={48} height={48} className="absolute -right-8 top-24 rotate-[10deg]" />
            <Image src={mascot} alt="Happy" width={44} height={44} className="absolute -left-10 bottom-16 rotate-[6deg]" />
            <Image src={mascot} alt="Happy" width={52} height={52} className="absolute -right-6 bottom-6 rotate-[-6deg]" />
          </div>
        </div>

        {/* Extra scattered mascots for large screens */}
        <Image src={mascot} alt="Happy" width={40} height={40} className="hidden md:block absolute -left-6 top-10" />
        <Image src={mascot} alt="Happy" width={36} height={36} className="hidden md:block absolute right-8 -top-6" />
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
            <h3 className="text-xl font-bold mt-3 text-black">{f.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Side-by-side: Design Happy and CTA */}
      <section className="mt-16 md:mt-28 max-w-6xl w-full px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-surface p-8 md:p-10">
            <h2 className="text-3xl font-extrabold text-black mb-3">Design Your Happy</h2>
            <p className="text-gray-600 mb-6">Customize your mascot with accessories, colors, and styles.</p>
            <Link href="/design-happy" className="btn-primary">Start Designing</Link>
          </div>
          <div className="card-surface p-8 md:p-10">
            <h2 className="text-3xl font-extrabold text-black mb-3">Grow with DewBloom</h2>
            <p className="text-gray-600 mb-6">Join the waitlist and get early access to our playful DBT trainer.</p>
            <Link href="/signup" className="btn-secondary">Join Waitlist</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="signup" className="mt-16 md:mt-28 text-center px-2 w-full">
        <div className="card-surface max-w-3xl mx-auto p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-black">Ready to grow with DewBloom?</h2>
          <p className="text-gray-600 mb-6">Sign up today and start learning with your penguin companion 🐧</p>
          <Link href="/signup" className="btn-primary">
            Join the waitlist
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 md:mt-20 py-6 md:py-8 text-center text-gray-500 text-sm w-full px-2">
        © {new Date().getFullYear()} DewBloom. All rights reserved.
      </footer>
    </main>
  );
}
