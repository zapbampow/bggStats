type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

export default function Container({ className, children }: Props) {
  return (
    <div
      className={`w-full lg:w-[960px] xl:w-[1024] 2xl:w-[1280] px-2 mx-auto ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
}
