"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import mascot from "../../../public/HappyBG.png";

export default function DesignHappy() {
  const [accessories, setAccessories] = useState({
    hat: null,
    glasses: null,
    scarf: null,
    color: "#7c3aed"
  });

  const [savedDesigns, setSavedDesigns] = useState([]);

  const hatOptions = [
    { id: "none", name: "No Hat", emoji: "" },
    { id: "cap", name: "Baseball Cap", emoji: "🧢" },
    { id: "crown", name: "Crown", emoji: "👑" },
    { id: "beanie", name: "Beanie", emoji: "🎩" },
    { id: "party", name: "Party Hat", emoji: "🎉" }
  ];

  const glassesOptions = [
    { id: "none", name: "No Glasses", emoji: "" },
    { id: "sun", name: "Sunglasses", emoji: "🕶️" },
    { id: "reading", name: "Reading Glasses", emoji: "🤓" },
    { id: "safety", name: "Safety Goggles", emoji: "🥽" }
  ];

  const scarfOptions = [
    { id: "none", name: "No Scarf", emoji: "" },
    { id: "winter", name: "Winter Scarf", emoji: "🧣" },
    { id: "bow", name: "Bow Tie", emoji: "🎀" },
    { id: "tie", name: "Necktie", emoji: "👔" }
  ];

  const colorOptions = [
    "#7c3aed", "#ef4444", "#f59e0b", "#10b981", 
    "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280"
  ];

  const saveDesign = () => {
    const newDesign = {
      id: Date.now(),
      accessories: { ...accessories },
      timestamp: new Date().toLocaleString()
    };
    setSavedDesigns([...savedDesigns, newDesign]);
  };

  const loadDesign = (design) => {
    setAccessories({ ...design.accessories });
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
            Design Your Happy
          </h1>
          <p className="text-gray-600 text-lg">
            Customize your mascot with fun accessories and colors!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Design Preview */}
          <div className="card-surface p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-6">Your Happy</h2>
            <div className="relative inline-block">
              <Image
                src={mascot}
                alt="Happy"
                width={200}
                height={200}
                className="mx-auto"
                style={{ filter: `hue-rotate(${accessories.color === "#7c3aed" ? 0 : 60}deg)` }}
              />
              {/* Accessories overlay */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl">
                {accessories.hat && hatOptions.find(h => h.id === accessories.hat)?.emoji}
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-3xl">
                {accessories.glasses && glassesOptions.find(g => g.id === accessories.glasses)?.emoji}
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-3xl">
                {accessories.scarf && scarfOptions.find(s => s.id === accessories.scarf)?.emoji}
              </div>
            </div>
            <button 
              onClick={saveDesign}
              className="btn-primary mt-6"
            >
              Save This Design
            </button>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Hat Selection */}
            <div className="card-surface p-6">
              <h3 className="text-xl font-bold text-black mb-4">Hat</h3>
              <div className="grid grid-cols-3 gap-3">
                {hatOptions.map(hat => (
                  <button
                    key={hat.id}
                    onClick={() => setAccessories({...accessories, hat: hat.id})}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      accessories.hat === hat.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{hat.emoji}</div>
                    <div className="text-sm text-black">{hat.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Glasses Selection */}
            <div className="card-surface p-6">
              <h3 className="text-xl font-bold text-black mb-4">Glasses</h3>
              <div className="grid grid-cols-2 gap-3">
                {glassesOptions.map(glasses => (
                  <button
                    key={glasses.id}
                    onClick={() => setAccessories({...accessories, glasses: glasses.id})}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      accessories.glasses === glasses.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{glasses.emoji}</div>
                    <div className="text-sm text-black">{glasses.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scarf Selection */}
            <div className="card-surface p-6">
              <h3 className="text-xl font-bold text-black mb-4">Accessories</h3>
              <div className="grid grid-cols-2 gap-3">
                {scarfOptions.map(scarf => (
                  <button
                    key={scarf.id}
                    onClick={() => setAccessories({...accessories, scarf: scarf.id})}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      accessories.scarf === scarf.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{scarf.emoji}</div>
                    <div className="text-sm text-black">{scarf.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="card-surface p-6">
              <h3 className="text-xl font-bold text-black mb-4">Color</h3>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => setAccessories({...accessories, color})}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      accessories.color === color 
                        ? 'border-black scale-110' 
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Designs */}
        {savedDesigns.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">Your Saved Designs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedDesigns.map(design => (
                <div key={design.id} className="card-surface p-4 text-center">
                  <div className="relative inline-block mb-3">
                    <Image
                      src={mascot}
                      alt="Happy"
                      width={100}
                      height={100}
                      style={{ filter: `hue-rotate(${design.accessories.color === "#7c3aed" ? 0 : 60}deg)` }}
                    />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl">
                      {design.accessories.hat && hatOptions.find(h => h.id === design.accessories.hat)?.emoji}
                    </div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl">
                      {design.accessories.glasses && glassesOptions.find(g => g.id === design.accessories.glasses)?.emoji}
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl">
                      {design.accessories.scarf && scarfOptions.find(s => s.id === design.accessories.scarf)?.emoji}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{design.timestamp}</p>
                  <button 
                    onClick={() => loadDesign(design)}
                    className="btn-secondary text-sm"
                  >
                    Load Design
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
