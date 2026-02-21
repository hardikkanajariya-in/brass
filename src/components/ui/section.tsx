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
    <section id={id} className={cn('py-12 sm:py-16 md:py-20 lg:py-24', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
