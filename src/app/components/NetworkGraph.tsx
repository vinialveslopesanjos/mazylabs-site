'use client';

import { useEffect, useRef, useState } from 'react';

const SVG_PATH =
  'M323.5-192h-9a1.5,1.5,0,0,0-1.5,1.5V-176h12v-14.5A1.5,1.5,0,0,0,323.5-192Z' +
  'M318-177v-3h2v3Zm6,0h-3v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v3.5h-3' +
  'v-13.5a.5.5,0,0,1,.5-.5h9a.5.5,0,0,1,.5.5Z' +
  'm-8-12h2v2h-2Zm4,0h2v2h-2Zm-4,4h2v2h-2Zm4,0h2v2h-2Z';

function empresaIcon(dark: boolean) {
  const fill = dark ? '#f4f3ee' : '#1c1917';
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg fill="${fill}" viewBox="-2 0 16 16" xmlns="http://www.w3.org/2000/svg">` +
    `<path fill-rule="evenodd" d="${SVG_PATH}" transform="translate(-313 192)"/>` +
    `</svg>`
  )}`;
}

export default function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const networkRef = useRef<InstanceType<typeof import('vis-network').Network> | null>(null);
  const nodesRef = useRef<InstanceType<typeof import('vis-data').DataSet> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const init = async () => {
      const { Network } = await import('vis-network');
      const { DataSet } = await import('vis-data');

      if (!containerRef.current) return;

      const base = window.location.origin;
      const isDark = document.documentElement.classList.contains('dark');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes = new DataSet<any>([
        { id: 1, x: 0,    y: -140, image: `${base}/favicon.svg`,                   shape: 'image' as const, size: 55, borderWidth: 0, font: { size: 0 } },
        { id: 2, x: -300, y: 80,   image: `${base}/logos/itau-unibanco.svg`,        shape: 'image' as const, size: 28, borderWidth: 0, font: { size: 0 } },
        { id: 3, x: -150, y: 80,   image: `${base}/logos/picpay-1.svg`,             shape: 'image' as const, size: 22, borderWidth: 0, font: { size: 0 } },
        { id: 4, x: 0,    y: 80,   image: `${base}/logos/nubank-logo.svg`,          shape: 'image' as const, size: 22, borderWidth: 0, font: { size: 0 } },
        { id: 5, x: 150,  y: 80,   image: `${base}/logos/xp-investimento-logo.svg`, shape: 'image' as const, size: 28, borderWidth: 0, font: { size: 0 } },
        {
          id: 6, x: 300, y: 80,
          label: 'sua empresa',
          image: empresaIcon(isDark),
          shape: 'image' as const, size: 20, borderWidth: 0,
          font: { size: 16, color: '#c15f3c', face: 'ui-monospace, monospace', bold: true, vadjust: 2 },
        },
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const edges = new DataSet<any>([
        { id: 'e1', from: 1, to: 2 },
        { id: 'e2', from: 1, to: 3 },
        { id: 'e3', from: 1, to: 4 },
        { id: 'e4', from: 1, to: 5 },
        { id: 'e5', from: 1, to: 6, dashes: true },
      ]);

      const options = {
        autoResize: true,
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -4000,
            centralGravity: 0.3,
            springLength: 200,
            springConstant: 0.02,
            damping: 0.9,
            avoidOverlap: 100,
          },
          maxVelocity: 2,
          minVelocity: 0.15,
          solver: 'barnesHut' as const,
          timestep: 0.1,
        },
        edges: {
          smooth: { enabled: true, type: 'curvedCW' as const, roundness: 0.15 },
          color: { color: '#d4d0c8', highlight: '#c15f3c', opacity: 0.4 },
          width: 1.5,
        },
        interaction: {
          hover: true,
          dragNodes: true,
          dragView: true,
          zoomView: true,
        },
        nodes: {
          borderWidthSelected: 0,
          shapeProperties: {
            interpolation: false,
            useImageSize: false,
            useBorderWithImage: false,
            coordinateOrigin: 'center' as const,
          },
        },
      };

      nodesRef.current = nodes as unknown as InstanceType<typeof import('vis-data').DataSet>;
      networkRef.current = new Network(containerRef.current, { nodes, edges }, options);
      networkRef.current.once('stabilized', () => {
        const net = networkRef.current;
        if (!net) return;
        net.fit({ animation: false });
        const { x, y } = net.getViewPosition();
        const scale = net.getScale() * 0.72;
        net.moveTo({ position: { x, y }, scale, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
      });
    };

    init();
    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
      nodesRef.current = null;
    };
  }, [mounted]);

  // Observa mudança de tema e atualiza o ícone da empresa
  useEffect(() => {
    if (!mounted) return;

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (nodesRef.current as any)?.update({ id: 6, image: empresaIcon(isDark) });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="space-y-5 md:space-y-8">
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Network Visualization</span>
          <h3 className="text-2xl md:text-3xl font-bold">Rede de Projetos</h3>
        </div>
        <div className="max-w-3xl mx-auto h-[280px] md:h-[360px] rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <span className="text-sm opacity-40 font-mono">Carregando...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5 md:space-y-8">
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Network Visualization</span>
        <h3 className="text-2xl md:text-3xl font-bold">Rede de Projetos</h3>
      </div>
      <div
        ref={containerRef}
        className="max-w-3xl mx-auto h-[280px] md:h-[360px] rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'transparent', borderColor: 'var(--border)' }}
      />
    </section>
  );
}
