// src/components/ui/separator.tsx
export const Separator = ({ className = '' }: { className?: string }) => {
  return <hr className={`border-t border-border ${className}`} />;
};
export default Separator;