import { ReactNode } from "react";

function ContainerRow({ children } : { children: ReactNode | ReactNode[] }) {

    return(
        <>
            <div className="container">
                <div className="row">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ContainerRow;