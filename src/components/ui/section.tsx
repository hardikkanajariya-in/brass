import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Container } from './container';

interface SectionProps {
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}

export function Section({ className, containerClassName, children, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-10 sm:py-16 md:py-20 lg:py-section', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
