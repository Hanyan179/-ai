import React from 'react';
import { cn } from './utils';
import { motion } from 'framer-motion';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[24px] bg-white border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export function SectionHeading({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight text-[#111111] mb-2">{children}</h2>
      {subtitle && <p className="text-[#666666] text-lg">{subtitle}</p>}
    </div>
  );
}

export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FlowArrow({ direction = 'down' }: { direction?: 'down' | 'right' }) {
  return (
    <div className={cn("flex items-center justify-center text-[#CCCCCC]", direction === 'down' ? 'h-8 py-2' : 'w-8 px-2')}>
      {direction === 'down' ? (
        <div className="h-full w-[2px] bg-gradient-to-b from-[#EAEAEA] to-[#CCCCCC] relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#CCCCCC]" />
        </div>
      ) : (
        <div className="w-full h-[2px] bg-gradient-to-r from-[#EAEAEA] to-[#CCCCCC] relative">
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#CCCCCC]" />
        </div>
      )}
    </div>
  );
}
