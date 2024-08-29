import { ReactNode } from "react";

function ContainerRow({
  addClass = null,
  children = null,
}: {
  addClass?: string | null;
  children?: ReactNode | ReactNode[] | null;
}) {
  return (
    <>
      <div className={`container ${addClass}`}>
        <div className="row">{children}</div>
      </div>
    </>
  );
}

export default ContainerRow;
