import { Popover } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from "@floating-ui/react";
import { useRef } from "react";
import QuestionCircle from "../icons/QuestionCircle";

export default function InfoButton({ children }) {
  const arrowRef = useRef(null);
  const { x, y, strategy, refs } = useFloating({
    // placement: "top",
    middleware: [offset(5), flip(), shift(), arrow({ element: arrowRef })],
    // whileElementsMounted: autoUpdate,'
    strategy: "fixed",
  });

  let screenWidth = globalThis.window && globalThis.window.innerWidth;

  const style = {
    position: strategy,
    top: y ? y + 12 : 0,
    left: x ?? 0,
    width: "max-content",
  };

  const arrowStyle = {
    right: x !== null ? Math.abs(x) - 10 : 0,
    bottom: y !== null ? Math.abs(y) - 68 : 0,
  };

  console.log("style", style);
  return (
    <Popover>
      <Popover.Button
        ref={refs.setReference}
        className="absolute top-0 bottom-0 left-0 right-0"
      >
        <QuestionCircle width={18} />
      </Popover.Button>

      <Popover.Panel
        ref={refs.setFloating}
        style={style}
        className="relative z-10 p-4 -mx-4 font-normal text-white rounded-md bg-slate-800"
      >
        <div
          ref={arrowRef}
          id="arrow"
          className="absolute w-[1.25rem] h-[1.25rem] rotate-45 bg-slate-800 z-0"
          style={arrowStyle}
        />
        <div>{children}</div>
      </Popover.Panel>
    </Popover>
  );
}
