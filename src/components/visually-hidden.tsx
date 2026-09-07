type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export default function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="visuallyHidden">{children}</span>;
}
