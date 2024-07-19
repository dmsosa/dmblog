export function ColContentImg({ image="", divClassName="", imageClassName="" }:{ image?: string, divClassName?: string, imageClassName?: string }) {
    return (
        <div className={`cont-img-div ${divClassName}`}>
            <img src={image} className={`cont-img ${imageClassName}`}/>
        </div>  
    )
}