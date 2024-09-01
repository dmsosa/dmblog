import { useEffect, useState } from "react";
import { getProfileImage } from "../../service/userService";
import { AxiosResponse } from "axios";
import apple from "../../assets/img/profile/apple.svg";
const defaultImages = [
  "apple",
  "pear",
  "pineapple",
  "banana",
  "broccoli",
  "cucumber",
  "carrot",
  "orange",
  "cheese",
  "coconut",
  "avocado",
  "corn",
  "strawberry",
  "peach",
  "aubergine",
];
const imagesRoute = "/dmblog/src/assets/img/profile/";

function CurrentImage({ image }: { image: string }) {
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(apple);
    setLoading(true);
    getProfileImage({ image })
      .then((res: AxiosResponse) => {
        const profileImage = res.data;
        if (profileImage.data === null) {
          setSource(imagesRoute + "apple.svg");
        } else {
          if (defaultImages.includes(profileImage)) {
            setSource(imagesRoute + profileImage + ".svg");
          } else {
            setSource(profileImage);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [source, image]);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="current-image">
      <img src={source}></img>
    </div>
  );
}

export default CurrentImage;
