import React from "react";

export default function Answer(props) {
  if (!props.answer) return null;

  return <div className="text-3xl">Answer: {props.answer}</div>;
}
