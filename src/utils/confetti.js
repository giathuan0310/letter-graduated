import confetti from 'canvas-confetti';

export const launchGraduationConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Gold, midnight navy, champagne, emerald, and silver graduation burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#D4AF37', '#FFDF00', '#F3E5AB']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#D4AF37', '#FFFFFF', '#FCD34D']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#10B981', '#F59E0B']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#D4AF37', '#FFFFFF']
  });
};

export const launchWishConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.85 },
    colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6']
  });
};
