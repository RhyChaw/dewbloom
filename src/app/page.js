// app/page.js
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-purple-50 via-indigo-50 to-white px-6">
      
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center mt-20 relative">
        <h1 className="text-6xl md:text-7xl font-extrabold text-purple-700 mb-6 animate-bounce">
          DewBloom
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Learn <strong>DBT skills</strong> in a fun, interactive way. Engage in simulated dialogues, get real-time emotion feedback, and receive personalized guidance to grow your emotional resilience.
        </p>
        <div className="flex justify-center gap-6 mb-16">
          <a 
            href="#features" 
            className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
          >
            Explore Features
          </a>
          <a 
            href="#signup" 
            className="px-8 py-4 border border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-100 transition"
          >
            Get Started
          </a>
          
        </div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-purple-400 via-indigo-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
      </section>

          

      {/* Features Section */}
      <section id="features" className="mt-32 max-w-6xl w-full grid md:grid-cols-3 gap-12 text-center">
        <div className="p-8 bg-white shadow-2xl rounded-2xl hover:scale-105 transform transition">
          <div className="mb-4 text-purple-600 text-5xl">💬</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-700">Simulated Dialogues</h3>
          <p className="text-gray-600">
            Practice DBT skills in realistic AI-guided scenarios to build confidence and competence.
          </p>
        </div>
        <div className="p-8 bg-white shadow-2xl rounded-2xl hover:scale-105 transform transition">
          <div className="mb-4 text-purple-600 text-5xl">🧠</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-700">Real-time Emotion Detection</h3>
          <p className="text-gray-600">
            Get instant insights into your emotional state to stay self-aware and adaptive during exercises.
          </p>
        </div>
        <div className="p-8 bg-white shadow-2xl rounded-2xl hover:scale-105 transform transition">
          <div className="mb-4 text-purple-600 text-5xl">📈</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-700">Personalized Feedback</h3>
          <p className="text-gray-600">
            Receive actionable suggestions tailored to your journey for meaningful emotional growth.
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mt-32 w-full max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-12">How DewBloom Works</h2>
        <Link
            href="/course"
            className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition"
          >
            See Course
          </Link>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-4xl mb-4 text-indigo-500">1️⃣</div>
            <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Interactive Lessons</h3>
            <p className="text-gray-600">
              Learn core DBT skills through gamified modules designed to be fun and engaging.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-4xl mb-4 text-indigo-500">2️⃣</div>
            <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Simulations</h3>
            <p className="text-gray-600">
              Practice conversations and scenarios where you apply skills and track your progress.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-4xl mb-4 text-indigo-500">3️⃣</div>
            <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Feedback & Rewards</h3>
            <p className="text-gray-600">
              Receive personalized feedback and unlock achievements as you grow emotionally.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-32 max-w-5xl w-full text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "DewBloom makes learning DBT skills so much easier and fun. The AI dialogues feel real and super helpful!"
            </p>
            <h4 className="font-bold text-purple-600">— Alex R.</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "I love the real-time emotion feedback. It really helped me understand myself better."
            </p>
            <h4 className="font-bold text-purple-600">— Sam K.</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "The personalized feedback and achievements keep me motivated to practice daily!"
            </p>
            <h4 className="font-bold text-purple-600">— Taylor M.</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="mt-32 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-6">Start Your Journey with DewBloom</h2>
        <p className="text-gray-700 mb-8">
          Sign up now to access your AI-powered DBT companion and level up your emotional skills!
        </p>
        <a 
          href="/signup" 
          className="px-10 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg"
        >
          Sign Up
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-10 text-center text-gray-500 border-t border-gray-200 w-full">
        &copy; {new Date().getFullYear()} DewBloom. All rights reserved.
      </footer>

    </main>
  );
}
