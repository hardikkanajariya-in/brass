import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamMemberCard({ name, role, bio, image }: TeamMemberCardProps) {
  return (
    <div className="group rounded-card bg-white p-6 shadow-card transition-all duration-300 hover:shadow-cardHover border border-neutral-100 text-center">
      <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="112px"
        />
      </div>
      <h3 className="text-lg font-semibold text-brand-secondary">{name}</h3>
      <p className="text-sm font-medium text-brand-primary mb-2">{role}</p>
      <p className="text-sm text-neutral-600 leading-relaxed">{bio}</p>
    </div>
  );
}
