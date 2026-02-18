'use client';

import { useEffect, useRef, useState } from 'react';

// Bone-white versions of PF/PJ icons using inline SVG data URIs
// Using the exact same icons but with #f4f3ee (bone) fill for contrast on dark bg
// Risk nodes use red (#ef4444) to stand out
const BONE = '#f4f3ee';
const RED = '#ef4444';
const STROKE = '#b1ada1';
const STROKE_RED = '#ef4444';

function pfIcon(risk: boolean) {
  const fill = risk ? RED : BONE;
  const stroke = risk ? STROKE_RED : STROKE;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">` +
    `<circle cx="512" cy="288" r="200" fill="${fill}" stroke="${stroke}" stroke-width="20"/>` +
    `<path d="M140 880c0-206 164-372 372-372s372 166 372 372" fill="${fill}"/>` +
    `</svg>`
  )}`;
}

function pjIcon(risk: boolean) {
  const fill = risk ? RED : BONE;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg fill="${fill}" viewBox="-2 0 16 16" xmlns="http://www.w3.org/2000/svg">` +
    `<path fill-rule="evenodd" d="M323.5-192h-9a1.5,1.5,0,0,0-1.5,1.5V-176h12v-14.5A1.5,1.5,0,0,0,323.5-192ZM318-177v-3h2v3Zm6,0h-3v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v3.5h-3v-13.5a.5.5,0,0,1,.5-.5h9a.5.5,0,0,1,.5.5Zm-8-12h2v2h-2Zm4,0h2v2h-2Zm-4,4h2v2h-2Zm4,0h2v2h-2Z" transform="translate(-313 192)"/>` +
    `</svg>`
  )}`;
}

export default function ItauGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let network: InstanceType<typeof import('vis-network').Network> | null = null;

    const init = async () => {
      const { Network } = await import('vis-network');
      const { DataSet } = await import('vis-data');

      if (!containerRef.current) return;

      // 15 nodes: mix of PF and PJ, 3 are flagged as risk (red)
      const nodeData = [
        { id: 1,  pj: true,  risk: false },
        { id: 2,  pj: false, risk: false },
        { id: 3,  pj: true,  risk: true  },
        { id: 4,  pj: false, risk: false },
        { id: 5,  pj: true,  risk: false },
        { id: 6,  pj: false, risk: true  },
        { id: 7,  pj: false, risk: false },
        { id: 8,  pj: true,  risk: false },
        { id: 9,  pj: false, risk: false },
        { id: 10, pj: true,  risk: true  },
        { id: 11, pj: false, risk: false },
        { id: 12, pj: true,  risk: false },
        { id: 13, pj: false, risk: false },
        { id: 14, pj: false, risk: false },
        { id: 15, pj: true,  risk: false },
      ];

      const nodes = new DataSet(
        nodeData.map((n) => ({
          id: n.id,
          image: n.pj ? pjIcon(n.risk) : pfIcon(n.risk),
          shape: 'image' as const,
          size: n.pj ? 20 : 16,
          borderWidth: 0,
          font: { size: 0 },
        }))
      );

      // 20 directed edges
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const edges = new DataSet<any>([
        { id: 'e1',  from: 1,  to: 2,  arrows: 'to' },
        { id: 'e2',  from: 1,  to: 3,  arrows: 'to' },
        { id: 'e3',  from: 2,  to: 4,  arrows: 'to' },
        { id: 'e4',  from: 3,  to: 5,  arrows: 'to' },
        { id: 'e5',  from: 3,  to: 6,  arrows: 'to' },
        { id: 'e6',  from: 4,  to: 7,  arrows: 'to' },
        { id: 'e7',  from: 5,  to: 8,  arrows: 'to' },
        { id: 'e8',  from: 6,  to: 9,  arrows: 'to' },
        { id: 'e9',  from: 7,  to: 10, arrows: 'to' },
        { id: 'e10', from: 8,  to: 11, arrows: 'to' },
        { id: 'e11', from: 9,  to: 12, arrows: 'to' },
        { id: 'e12', from: 10, to: 13, arrows: 'to' },
        { id: 'e13', from: 11, to: 14, arrows: 'to' },
        { id: 'e14', from: 12, to: 15, arrows: 'to' },
        { id: 'e15', from: 1,  to: 6,  arrows: 'to' },
        { id: 'e16', from: 3,  to: 10, arrows: 'to' },
        { id: 'e17', from: 5,  to: 13, arrows: 'to' },
        { id: 'e18', from: 2,  to: 8,  arrows: 'to' },
        { id: 'e19', from: 14, to: 3,  arrows: 'to' },
        { id: 'e20', from: 15, to: 6,  arrows: 'to' },
      ]);

      const options = {
        autoResize: true,
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -1500,
            centralGravity: 0.4,
            springLength: 80,
            springConstant: 0.05,
            damping: 0.12,
            avoidOverlap: 0.1,
          },
          maxVelocity: 30,
          minVelocity: 0.75,
          solver: 'barnesHut' as const,
          timestep: 0.15,
        },
        edges: {
          smooth: { enabled: true, type: 'curvedCW' as const, roundness: 0.15 },
          color: { color: '#d4d0c8', highlight: '#c15f3c', opacity: 0.5 },
          width: 1.5,
          arrows: { to: { scaleFactor: 0.5 } },
        },
        interaction: {
          hover: true,
          dragNodes: true,
          dragView: true,
          zoomView: true,
        },
        nodes: { borderWidthSelected: 0 },
      };

      network = new Network(containerRef.current, { nodes, edges }, options);
      network.once('stabilized', () => {
        if (!network) return;
        network.fit({ animation: false });
        const { x, y } = network.getViewPosition();
        const scale = network.getScale() * 0.72;
        network.moveTo({ position: { x, y }, scale, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
      });
    };

    init();
    return () => { network?.destroy(); };
  }, [mounted]);

  if (!mounted) {
    return <div className="w-full h-[300px] rounded-lg bg-black/20 flex items-center justify-center">
      <span className="text-[10px] font-mono text-gray-500">Carregando grafo...</span>
    </div>;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] rounded-lg overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    />
  );
}
