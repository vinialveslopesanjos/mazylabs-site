'use client';

import { useEffect } from 'react';

/** Reveals group boundaries once, so the reading order stays clear while scrolling. */
export default function PageReveal() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });
    const showAll = () => {
      if (media.matches) {
        elements.forEach((element) => element.classList.remove('reveal-pending'));
        observer.disconnect();
      }
    };
    media.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', showAll);
      elements.forEach((element) => element.classList.remove('reveal-pending'));
    };
  }, []);
  return null;
}
