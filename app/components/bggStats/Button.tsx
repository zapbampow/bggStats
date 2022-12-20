type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

// export function Button(props: Props) {
//   return (
//     <button className="px-4 py-2 rounded-lg bg-green-500 text-white">
//       {props.children}
//     </button>
//   );
// }

export function BigButton(props: Props) {
  return (
    <button
      className="px-4 py-2 rounded-sm bg-cyan-600 text-white text-3xl"
      {...props}
    >
      {props.children}
    </button>
  );
}
