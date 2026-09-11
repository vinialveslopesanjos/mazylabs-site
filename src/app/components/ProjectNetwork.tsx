'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import NetworkGraph from './NetworkGraph';

export default function ProjectNetwork() {
  const [open, setOpen] = useState(false);
  return (
    <details className="network-disclosure" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Explore a rede de projetos <Plus size={20} aria-hidden="true" /></summary>
      {open && <NetworkGraph />}
    </details>
  );
}
