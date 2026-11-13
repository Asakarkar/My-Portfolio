import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  title: string;
  className: string;
}

export default function ProjectImage({
  src,
  title,
  className,
}: ProjectImageProps) {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <div
        role="img"
        aria-label={`${title} image unavailable`}
        className={`flex h-full w-full items-center justify-center bg-[#080808] px-6 text-center text-xs uppercase tracking-wider text-[#444] ${className}`}
      >
        {title}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className={className}
      loading="lazy"
      onError={() => setUnavailable(true)}
    />
  );
}
