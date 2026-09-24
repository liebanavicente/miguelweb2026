import { Fragment } from "react";

/** Renders a dictionary string, turning `**words**` into <strong>. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>))}
    </>
  );
}
