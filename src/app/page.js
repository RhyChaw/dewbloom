// app/page.js
import Image from "next/image";
import Link from "next/link";
import mascot from "../../public/HappyBG.png"; // put mascot in /public
import Navbar from "@/components/Navbar";
import AIA from "../../public/AIA.png"; // put AIA in /public
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 via-indigo-50 to-white px-6">
      <Navbar />
      <Chatbot />
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center mt-20 relative">
        <div className="flex flex-col items-center gap-6">
          <Image
            src={mascot}
            alt="DewBloom Mascot"
            width={220}
            height={220}
            className="animate-bounce"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700">
            DewBloom
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
            Your friendly companion for learning <strong>DBT skills</strong>.  
            Grow emotional resilience through fun lessons, playful dialogues, and real-time feedback.
          </p>
          <div className="flex justify-center gap-6 mt-6 overflow-x-scroll">
            <Link
              href="/course"
              className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
            >
              Start Learning
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
            >
              See dashboard
            </Link>
            <Link
              href="/admin"
              className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
            >
              See admin
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 border border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-100 transition"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-28 max-w-5xl w-full grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:scale-105 transform transition">
          <span className="text-4xl">💬</span>
          <h3 className="text-xl font-bold text-purple-700 mt-3">Playful Dialogues</h3>
          <p className="text-gray-600 text-sm mt-2">
            Practice DBT skills with your mascot buddy in safe, guided conversations.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:scale-105 transform transition">
          <span className="text-4xl">🧠</span>
          <h3 className="text-xl font-bold text-purple-700 mt-3">Emotion Insights</h3>
          <p className="text-gray-600 text-sm mt-2">
            Get gentle real-time feedback on your emotions to stay self-aware.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:scale-105 transform transition">
          <span className="text-4xl">🎉</span>
          <h3 className="text-xl font-bold text-purple-700 mt-3">Fun Progress</h3>
          <p className="text-gray-600 text-sm mt-2">
            Earn rewards and celebrate milestones with your penguin guide.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="signup" className="mt-28 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          Ready to grow with DewBloom?
        </h2>
        <p className="text-gray-700 mb-6">
          Sign up today and start learning with your penguin companion 🐧
        </p>
        <Link
          href="/signup"
          className="px-10 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-500 text-sm border-t border-gray-200 w-full">
        &copy; {new Date().getFullYear()} DewBloom. All rights reserved.
      </footer>
    </main>
  );
}
