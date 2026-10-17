import React, { useState } from 'react';
import './App.css';
import { graduationData } from './data/graduationData';
import Envelope from './components/Envelope';
import LetterContent from './components/LetterContent';
import LocationCard from './components/LocationCard';
import Guestbook from './components/Guestbook';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import RsvpModal from './components/RsvpModal';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const guestName = new URLSearchParams(window.location.search).get('to') || '';

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Smooth scroll down to letter after a slight delay for envelope flap animation
    setTimeout(() => {
      const letterElement = document.getElementById('invitation-letter');
      if (letterElement) {
        letterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 700);
  };

  const handleCloseEnvelope = () => {
    setIsEnvelopeOpen(false);
    const envelopeSection = document.getElementById('envelope-section');
    if (envelopeSection) {
      envelopeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate 25 floating stardust particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 10 + 10}s`,
    delay: `${Math.random() * 8}s`
  }));

  return (
    <div className="app-root">
      {/* Floating Stardust particles */}
      <div className="stardust-container" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="stardust-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* Floating Navigation & Audio Controls */}
      <FloatingNav
        isEnvelopeOpen={isEnvelopeOpen}
        onCloseEnvelope={handleCloseEnvelope}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* 3D Envelope Opening Section */}
      <Envelope
        isOpen={isEnvelopeOpen}
        onOpen={handleOpenEnvelope}
        graduate={graduationData.graduate}
      />

      {/* Revealed Full Invitation Details */}
      <div className={`revealed-content-container ${isEnvelopeOpen ? 'visible' : 'hidden'}`}>
        {/* Formal Letter, Graduate Photo Zoom & Countdown */}
        <LetterContent graduationData={graduationData} />

        {/* Location & Interactive Maps */}
        <LocationCard location={graduationData.location} />

        {/* Guestbook & Congratulations Feed */}
        <Guestbook initialWishes={graduationData.initialWishes} />

        {/* Footer */}
        <Footer graduate={graduationData.graduate} />
      </div>

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        guestName={guestName}
      />
    </div>
  );
}
