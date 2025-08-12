// src/components/ui/scroll-area.tsx
import * as React from 'react';

export const ScrollArea = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent ${className}`}>
      {children}
    </div>
  );
};

export default ScrollArea;