// app/page.js (Next.js 13+ App Router)
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-6">
          DewBloom
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          An AI-driven tool for learning and practicing <strong>Dialectical Behavior Therapy (DBT) skills</strong>. 
          Experience simulated dialogues, real-time emotion detection, and personalized feedback to foster resilience and emotional growth.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="#features" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Explore Features
          </a>
          <a 
            href="#signup" 
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-32 max-w-5xl w-full grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">Simulated Dialogues</h3>
          <p className="text-gray-600">
            Practice DBT skills in realistic scenarios guided by AI to build confidence and competence.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">Real-time Emotion Detection</h3>
          <p className="text-gray-600">
            Receive instant insights into your emotional state during exercises, helping you stay self-aware.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">Personalized Feedback</h3>
          <p className="text-gray-600">
            Get actionable suggestions tailored to your growth, making DBT practice more effective and meaningful.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="mt-32 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Start Your Journey with DewBloom</h2>
        <p className="text-gray-700 mb-8">
          Sign up now to access your AI-powered DBT companion and take your emotional growth to the next level.
        </p>
        <a 
          href="/signup" 
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} DewBloom. All rights reserved.
      </footer>
    </main>
  );
}
