import "./Loader.css"

export const LoaderHome = () => {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
}

export const LoaderRing = () => {
    return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
}