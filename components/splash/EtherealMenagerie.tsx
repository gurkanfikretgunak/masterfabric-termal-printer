'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Abstract Eagle SVG - Soaring lines
const EagleForm = ({ isAwakened }: { isAwakened: boolean }) => (
  <svg
    className={`ethereal-animal eagle ${isAwakened ? 'awakened' : ''}`}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wing arc - left */}
    <path
      d="M20 100 Q50 40, 100 50 Q80 70, 90 90"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="eagle-wing-left"
    />
    {/* Wing arc - right */}
    <path
      d="M180 100 Q150 40, 100 50 Q120 70, 110 90"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="eagle-wing-right"
    />
    {/* Body line */}
    <path
      d="M100 50 Q100 80, 100 120 Q95 140, 100 160"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="eagle-body"
    />
    {/* Tail feathers */}
    <path
      d="M100 160 Q85 175, 70 180"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className="eagle-tail"
    />
    <path
      d="M100 160 Q115 175, 130 180"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className="eagle-tail"
    />
    {/* Head accent */}
    <circle cx="100" cy="45" r="3" fill="currentColor" className="eagle-head" />
  </svg>
);

// Abstract Panther SVG - Fluid leaping curve
const PantherForm = ({ isAwakened }: { isAwakened: boolean }) => (
  <svg
    className={`ethereal-animal panther ${isAwakened ? 'awakened' : ''}`}
    viewBox="0 0 240 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main body curve */}
    <path
      d="M30 80 Q60 30, 120 40 Q180 50, 210 70"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="panther-body"
    />
    {/* Back leg */}
    <path
      d="M45 75 Q40 95, 35 110"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="panther-leg"
    />
    {/* Front leg extended */}
    <path
      d="M195 68 Q210 85, 225 75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="panther-leg"
    />
    {/* Tail flowing */}
    <path
      d="M30 80 Q10 60, 15 35 Q20 25, 25 30"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="panther-tail"
    />
    {/* Head */}
    <ellipse cx="215" cy="65" rx="8" ry="6" fill="currentColor" className="panther-head" />
    {/* Ear */}
    <path
      d="M218 58 L222 52 L225 58"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="panther-ear"
    />
  </svg>
);

// Abstract Deer Antlers SVG - Geometric branching
const DeerAntlersForm = ({ isAwakened }: { isAwakened: boolean }) => (
  <svg
    className={`ethereal-animal deer ${isAwakened ? 'awakened' : ''}`}
    viewBox="0 0 180 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left antler main branch */}
    <path
      d="M90 180 L75 140 L60 100 L45 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="antler-main"
    />
    {/* Left antler tines */}
    <path
      d="M60 100 L40 90"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M50 75 L30 55"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M45 60 L25 40"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M45 60 L55 35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    
    {/* Right antler main branch */}
    <path
      d="M90 180 L105 140 L120 100 L135 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="antler-main"
    />
    {/* Right antler tines */}
    <path
      d="M120 100 L140 90"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M130 75 L150 55"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M135 60 L155 40"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    <path
      d="M135 60 L125 35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="antler-tine"
    />
    
    {/* Connection point at base */}
    <circle cx="90" cy="185" r="4" fill="currentColor" className="antler-base" />
  </svg>
);

// Abstract Wolf SVG - Howling silhouette
const WolfForm = ({ isAwakened }: { isAwakened: boolean }) => (
  <svg
    className={`ethereal-animal wolf ${isAwakened ? 'awakened' : ''}`}
    viewBox="0 0 160 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Howling snout pointing up */}
    <path
      d="M80 20 L85 45 L80 50 L75 45 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="wolf-snout"
    />
    {/* Head */}
    <ellipse cx="80" cy="65" rx="18" ry="15" stroke="currentColor" strokeWidth="1.5" className="wolf-head" />
    {/* Ears */}
    <path
      d="M65 52 L58 35 L68 48"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="wolf-ear"
    />
    <path
      d="M95 52 L102 35 L92 48"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="wolf-ear"
    />
    {/* Neck and body */}
    <path
      d="M80 80 Q80 100, 75 130 Q70 160, 80 180"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="wolf-body"
    />
    {/* Front leg */}
    <path
      d="M72 150 L65 175 L68 180"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="wolf-leg"
    />
    {/* Tail */}
    <path
      d="M85 170 Q100 165, 115 175 Q125 180, 130 170"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="wolf-tail"
    />
  </svg>
);

interface EtherealMenagerieProps {
  children: React.ReactNode;
}

type StatusState = 'idle' | 'counting' | 'awakening' | 'awakened';

export default function EtherealMenagerie({ children }: EtherealMenagerieProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isAwakened, setIsAwakened] = useState(false);
  const [status, setStatus] = useState<StatusState>('idle');
  const [showHint, setShowHint] = useState(true);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    // Clear previous timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Hide hint after first interaction
    if (showHint) {
      setShowHint(false);
    }

    // If already awakened, toggle back to normal
    if (isAwakened) {
      setIsAwakened(false);
      setStatus('idle');
      setClickCount(0);
      return;
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);
    setStatus('counting');

    // Check for triple click
    if (newCount >= 3) {
      setStatus('awakening');
      
      // Short delay before awakening for dramatic effect
      setTimeout(() => {
        setIsAwakened(true);
        setStatus('awakened');
        setClickCount(0);
      }, 300);
    } else {
      // Reset counter after 800ms of no clicks
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
        setStatus('idle');
      }, 800);
    }
  }, [clickCount, isAwakened, showHint]);

  // Show hint after 3 seconds of inactivity
  useEffect(() => {
    if (status === 'idle' && !isAwakened) {
      hintTimeoutRef.current = setTimeout(() => {
        setShowHint(true);
      }, 5000);
    }
    
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, [status, isAwakened]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  // Get status message
  const getStatusMessage = () => {
    switch (status) {
      case 'counting':
        return `${clickCount} of 3`;
      case 'awakening':
        return 'Awakening...';
      case 'awakened':
        return '✨ Awakened';
      default:
        return '';
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`ethereal-menagerie-container ${isAwakened ? 'awakened' : ''}`}
    >
      {/* Glassmorphism overlay */}
      <div className="ethereal-glass-layer" />
      
      {/* RGB Flow background (activated on awakening) */}
      <div className={`ethereal-rgb-flow ${isAwakened ? 'active' : ''}`} />
      
      {/* Abstract animal forms layer */}
      <div className="ethereal-animals-layer">
        <div className="animal-container eagle-container">
          <EagleForm isAwakened={isAwakened} />
        </div>
        <div className="animal-container panther-container">
          <PantherForm isAwakened={isAwakened} />
        </div>
        <div className="animal-container deer-container">
          <DeerAntlersForm isAwakened={isAwakened} />
        </div>
        <div className="animal-container wolf-container">
          <WolfForm isAwakened={isAwakened} />
        </div>
      </div>
      
      {/* Floating particles */}
      <div className={`ethereal-particles ${isAwakened ? 'active' : ''}`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
      
      {/* Status Indicator - Always visible at bottom */}
      <div className={`status-indicator ${status !== 'idle' || isAwakened ? 'visible' : ''} ${isAwakened ? 'awakened' : ''}`}>
        {/* Progress dots */}
        <div className="status-dots">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`status-dot ${
                i < clickCount ? 'filled' : ''
              } ${
                status === 'awakening' || isAwakened ? 'glow' : ''
              }`}
            />
          ))}
        </div>
        
        {/* Status text */}
        <div className={`status-text ${status !== 'idle' ? 'visible' : ''}`}>
          {getStatusMessage()}
        </div>
      </div>
      
      {/* Hint indicator */}
      {showHint && !isAwakened && status === 'idle' && (
        <div className="hint-indicator">
          <div className="hint-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>Tap 3× to awaken</span>
        </div>
      )}
      
      {/* Main content */}
      <div className="ethereal-content">
        {children}
      </div>
    </div>
  );
}

