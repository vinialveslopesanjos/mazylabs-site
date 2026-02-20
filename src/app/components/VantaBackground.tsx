'use client';

import { useEffect, useRef } from 'react';

interface VantaEffect {
  destroy: () => void;
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let canceled = false;

    const init = async () => {
      const THREE = await import('three');
      const NET = (await import('vanta/dist/vanta.net.min')).default;
      if (canceled || !containerRef.current) return;

      effectRef.current?.destroy();
      effectRef.current = NET({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xc15f3c,
        backgroundColor: 0x1c1917,
        points: 15,
        maxDistance: 18,
        spacing: 11,
        showDots: false,
      });
    };

    init();

    return () => {
      canceled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" aria-hidden />;
}
