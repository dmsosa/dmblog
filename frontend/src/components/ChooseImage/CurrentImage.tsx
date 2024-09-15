import { useEffect, useState } from "react";

function CurrentImage({ imageUrl }: { imageUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");

  useEffect(() => {
    setLoading(true);
    setSource(imageUrl);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
    
  }, [imageUrl]);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="current-image">
      <img src={source}></img>
    </div>
  );
}

export default CurrentImage;
