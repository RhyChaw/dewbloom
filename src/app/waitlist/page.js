"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import mascot from "../../../public/HappyBG.png";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to your backend
      console.log("Email added to waitlist:", email);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="card-surface p-12">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
              You're on the waitlist!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Thanks for joining! We'll notify you when DewBloom is ready for your device.
            </p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">Design Your Happy While You Wait</h2>
              <p className="text-gray-600 mb-6">
                Customize your mascot with fun accessories and colors to make it truly yours!
              </p>
              <Link href="/design-happy" className="btn-primary">
                Start Designing
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
              <Link href="/design-happy" className="btn-primary">
                Design Happy
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
              Join the Waitlist
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Be the first to experience DBT learning with Happy! Get early access to our mobile app when it launches.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full btn-primary"
              >
                Join Waitlist
              </button>
            </form>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-black mb-4">What to expect:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Early access to the mobile app</li>
                <li>• Exclusive updates and sneak peeks</li>
                <li>• Special launch day bonuses</li>
                <li>• Direct feedback channel to our team</li>
              </ul>
            </div>
          </div>

          {/* Right side - Mascot and mockup */}
          <div className="relative">
            <div className="card-surface p-8 text-center">
              <Image
                src={mascot}
                alt="Happy"
                width={200}
                height={200}
                className="mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-black mb-4">
                Coming Soon on Mobile
              </h3>
              <div className="flex justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="text-2xl">📱</span>
                  <div className="text-sm text-black">iPhone</div>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="text-2xl">🤖</span>
                  <div className="text-sm text-black">Android</div>
                </div>
              </div>
              <p className="text-gray-600">
                Learn DBT skills anywhere, anytime with your personalized Happy companion.
              </p>
            </div>
          </div>
        </div>

        {/* Design Happy CTA */}
        <div className="mt-16 text-center">
          <div className="card-surface p-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Design Your Happy While You Wait
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Customize your mascot with fun accessories, colors, and styles. Make Happy truly yours!
            </p>
            <Link href="/design-happy" className="btn-primary">
              Start Designing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
