import React, { useState, useContext } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import UserContext from "context/UserContext";
import FavoriteContext from "context/FvoriteContext";
import toast from "react-hot-toast";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  nftId?: string;
}

interface instance {
  id?: string;
  favorites_id?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className,
  liked = +1,
  nftId,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const address = useAddress();
  const { user }: any = useContext(UserContext);
  const { allFavorite }: any = useContext(FavoriteContext);
  const favorite =
    allFavorite.length !== 0 &&
    allFavorite.find((favorite: any) => favorite.favorites_id);

  // isLoading && toast.loading(() => <div>loading</div>);

  // Add to favorite
  const addFavorite = () => {
    // console.log("Liked");
    setIsLoading(true);
    console.log(allFavorite);
    axios({
      url: `https://naijaplaystore.pythonanywhere.com/create-favorite`,
      method: "post",
      data: {
        favorites_id: nftId,
        address: user.id,
      },
    })
      .then((res) => {
        // console.log(res);
        toast.success(() => <div>Added to favoroite </div>);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Reamove from favorite
  const removeFavorite = () => {
    // console.log("unLiked");
    setIsLoading(true);
    axios({
      url: `https://naijaplaystore.pythonanywhere.com/get-or-delete-favorite/${user.id}/${nftId}`,
      method: "delete",
    })
      .then((res) => {
        // console.log(res);
        toast.error(() => (
          <div>
            <p>Removed from Favorite</p>
          </div>
        ));

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Action button
  // const onLike = () => {
  //   setIsLiked(!isLiked);
  //   // getFavorite();
  //   setTimeout(() => {
  //     if (favorite.favorites_id !== nftId && !isLiked) {
  //       addFavorite();
  //     } else {
  //       removeFavorite();
  //     }
  //   }, 100);
  // };

  const onLike = (action: boolean) => {
    !isLiked && favorite.favorites_id !== nftId
      ? setIsLiked(action)
      : setIsLiked(action);
    !isLiked && favorite.favorites_id !== nftId
      ? addFavorite()
      : removeFavorite();
  };

  return (
    <>
      {!isLiked && favorite.favorites_id !== nftId ? (
        <button
          className={`bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white ${className}`}
          onClick={() => {
            onLike(true);
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="currentColor"
              fill={"none"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* <span className="ml-2 text-sm">{isLiked ? 23 : 22}</span> */}
        </button>
      ) : (
        <button
          className={`bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white ${className}`}
          onClick={() => {
            onLike(false);
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="currentColor"
              fill={"#ef4444"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* <span className="ml-2 text-sm">{isLiked ? 23 : 22}</span> */}
        </button>
      )}
    </>
  );
};

export default LikeButton;
// fill={favorite.favorites_id === nftId ? "#ef4444" : "none"}
