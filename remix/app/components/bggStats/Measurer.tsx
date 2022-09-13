import React, { useRef } from "react";

type Props = {
  value: string;
  visible: boolean;
  setVisible: (val: boolean) => void;
  impactedRef: React.MutableRefObject<HTMLInputElement | null>;
};

export default function Measurer({
  value,
  visible,
  setVisible,
  impactedRef,
}: Props) {
  let measurerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setVisible(true);
  }, [value, setVisible]);

  React.useLayoutEffect(() => {
    if (!visible || !measurerRef?.current || !impactedRef?.current) return;

    const rect = measurerRef?.current?.getBoundingClientRect();

    if (rect.width === 0) {
      impactedRef.current.style.width = "218px";
      setVisible(false);
      return;
    }

    let newWidth = `${rect.width + 48}px`;
    console.log("newWidth", newWidth);
    impactedRef.current.style.width = newWidth;
    // setWidth(rect.width);
    setVisible(false);
  }, [visible, setVisible, measurerRef, impactedRef]);

  return (
    <div ref={measurerRef} className="absolute visibility-0 ">
      {visible && value}
    </div>
  );
}
