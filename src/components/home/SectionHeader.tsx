type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({ title, eyebrow, subtitle, align = 'center', className = '' }: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div className={`${className} ${isCenter ? 'text-center' : 'text-left'} my-3 md:my-6`}>
      {eyebrow && (
        <div className={`text-[10px] md:text-xs tracking-[0.2em] font-semibold uppercase text-[#070b2a] ${isCenter ? 'justify-center' : ''} flex items-center gap-2`}>
          <span className="inline-block h-[1px] w-6 bg-gradient-to-r from-[#070b2a] to-indigo-400"></span>
          {eyebrow}
          <span className="inline-block h-[1px] w-6 bg-gradient-to-r from-indigo-400 to-[#070b2a]"></span>
        </div>
      )}
      {isCenter ? (
        <h2 className={`mt-2 font-extrabold text-[#070b2a] leading-tight ${isCenter ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
          {title}
        </h2>
      ) : (
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-[#070b2a] to-indigo-500" />
          <h2 className={`font-extrabold text-[#070b2a] leading-tight ${isCenter ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
            {title}
          </h2>
        </div>
      )}
      {subtitle && (
        <p className={`mt-1 text-xs md:text-sm text-gray-600 ${isCenter ? 'mx-auto max-w-2xl' : ''}`}>{subtitle}</p>
      )}
      {isCenter && <div className="mt-2 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-[#070b2a] via-indigo-500 to-[#070b2a]" />}
    </div>
  );
}

