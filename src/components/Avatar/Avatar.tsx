import apple from "../../assets/img/apple.svg";

function Avatar({ alt, src, addClass="" } : {alt?: string | null, src: string | null, addClass?: string} ) {


    return (
        <img 
            alt={alt? alt : "Author's profile image"}
            src={src? src : apple}
            className={`img-avatar ${addClass}`}>
        </img>
    )
}

export default Avatar;