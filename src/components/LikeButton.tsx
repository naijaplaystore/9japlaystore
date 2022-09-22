import React, { useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  nftId?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className,
  liked = +1,
  nftId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<any>({});
  const [favorite, setFavorite] = useState<any>();
  const [likedNft, setLikedNft] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const address = useAddress();
  console.log(likedNft);

  //Fetch uSER
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://naijaplaystore.pythonanywhere.com/create-account/${address}`
      );
      setUser(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all data from
  const getAllFavorite = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `https://naijaplaystore.pythonanywhere.com/get-user-favorite/${user.id}`,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    isLoading ? console.log("loading....") : getAllUsers();

    getAllFavorite();
  }, []);
  // console.log(user.id);
  const getFavorite = async () => {
    try {
      const res = await axios.get(
        `https://naijaplaystore.pythonanywhere.com/get-or-delete-favorite/${user.id}/${nftId}`
      );
      setFavorite(res);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Add to favorite
  const addFavorite = () => {
    console.log("Liked");
    axios({
      url: `https://naijaplaystore.pythonanywhere.com/create-favorite`,
      method: "post",
      data: {
        favorites_id: nftId,
        address: user.id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Reamove from favorite
  const removeFavorite = () => {
    console.log("unLiked");
    axios({
      url: `https://naijaplaystore.pythonanywhere.com/get-or-delete-favorite/${user.id}/${nftId}`,
      method: "delete",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Action button
  const LikeButton = () => {
    setIsLiked(!isLiked);
    getFavorite();
    setTimeout(() => {
      !isLiked && addFavorite();
      isLiked && removeFavorite();
    }, 100);
  };

  // Add and remove from favorite

  // isLiked ? addFavorite() : removeFavorite();
  console.log(user.id);

  return (
    <button
      className={`bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white ${className}`}
      onClick={LikeButton}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke="currentColor"
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* <span className="ml-2 text-sm">{isLiked ? 23 : 22}</span> */}
    </button>
  );
};

export default LikeButton;
