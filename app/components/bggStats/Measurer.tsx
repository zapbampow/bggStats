import React, { useRef } from "react";

type Props = {
  value: string;
  visible: boolean;
  setVisible: (val: boolean) => void;
  impactedRef: React.MutableRefObject<
    HTMLInputElement | HTMLButtonElement | HTMLDivElement | null
  >;
  addedWidth?: number;
};

export default function Measurer({
  value,
  visible,
  setVisible,
  impactedRef,
  addedWidth = 0,
}: Props) {
  let measurerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setVisible(true);
  }, [value, setVisible]);

  React.useLayoutEffect(() => {
    if (!visible || !measurerRef?.current || !impactedRef?.current) return;
    const rect = measurerRef?.current?.getBoundingClientRect();

    if (rect.width === 0) {
      impactedRef.current.style.width = "max-content";
      setVisible(false);
      return;
    }
    // debugger;
    let newWidth = `${rect.width + addedWidth}px`;
    impactedRef.current.style.width = newWidth;
    setVisible(false);
  }, [visible, setVisible, measurerRef, impactedRef, addedWidth]);

  if (!visible) return null;

  return (
    <div ref={measurerRef} className="invisible absolute w-max">
      {value}
    </div>
  );
}
