import { ReactNode } from "react";

function ColContent({
  addClass = null,
  title = null,
  subtitle = null,
  children = null,
}: {
  addClass?: string | null;
  title?: string | null;
  subtitle?: string | null;
  children?: ReactNode | ReactNode[] | null;
}) {
  return (
    <div className={`col cont ${addClass}`}>
      <div className="cont-header">
        {title && <h1>{title}</h1>}
        {subtitle && <h3>{subtitle}</h3>}
      </div>
      {children}
    </div>
  );
}

export default ColContent;
