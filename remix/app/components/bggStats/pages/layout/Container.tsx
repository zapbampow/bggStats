type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

export default function Container({ className, children }: Props) {
  return (
    <div className={`max-w-5xl p-8 mx-auto ${className ? className : ""}`}>
      {children}
    </div>
  );
}
