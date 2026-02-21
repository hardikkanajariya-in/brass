import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

export function PlaceholderImage({
  width = 400,
  height = 300,
  text = 'Image',
  className,
}: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('bg-neutral-100', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="var(--colors-neutral-100)" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="var(--colors-neutral-400)"
        fontFamily="var(--typography-font-family-body)"
        fontSize="14"
      >
        {text}
      </text>
    </svg>
  );
}
