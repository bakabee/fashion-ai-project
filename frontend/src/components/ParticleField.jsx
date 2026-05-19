const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 29) % 100}%`,
  top: `${(index * 47) % 100}%`,
  delay: `${(index % 11) * -0.36}s`,
  size: `${3 + (index % 5)}px`,
}));

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle-dot absolute rounded-full bg-[var(--color-bg)] shadow-[0_0_22px_rgba(255,79,163,0.36)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
