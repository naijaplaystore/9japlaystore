import axios from "axios";
import UserContext from "context/UserContext";
import React, { FC, useContext } from "react";
import ButtonPrimary, { ButtonPrimaryProps } from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface FollowButtonProps extends ButtonPrimaryProps {
  isFollowing?: boolean;
  userId?: number | undefined;
}

interface followersProps {
  id: number | null;
  followers: [];
}

const FollowButton: FC<FollowButtonProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing = Math.random() > 0.5,
  userId,
}) => {
  const [following, setFollowing] = React.useState(isFollowing);
  const { user }: any = useContext(UserContext);
  const [isFollowers, setIsFollowers] = React.useState<followersProps>({
    id: null,
    followers: [],
  });

  // get followers Api
  React.useEffect(() => {
    const getFollowesApi = async () => {
      let url = `https://naijaplaystore.pythonanywhere.com/get-or-update-followers/${user.id}/`;
      await axios
        .get(url)
        .then((res) => {
          setIsFollowers(res.data);
        })
        .catch((err) => console.log(err));
    };
    getFollowesApi();
  }, [user.id]);

  console.log(...isFollowers.followers);
  // Follow Api
  const FollowApi = async () => {
    let url = `https://naijaplaystore.pythonanywhere.com/get-or-create-followers/`;

    const data = {
      address: user.id,
      followers: [userId],
    };
    axios
      .post(url, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // update Follow Api
  const updateFollowApi = () => {
    let url = `https://naijaplaystore.pythonanywhere.com/get-or-update-followers/${user.id}`;
    const data = {
      address: user.id,
      followers: [userId],
    };
    axios
      .post(url, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // unfollow Api
  const unFollowApi = async () => {
    try {
      const res = await axios({
        url: ``,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Follow user function
  const Follow = () => {
    console.log("follow");
    isFollowers.id ? updateFollowApi() : FollowApi();
  };

  // unfollow user function
  const unFollow = () => {
    console.log("un follow");
  };

  // Event
  const onFollow = (action: boolean) => {
    !following ? setFollowing(action) : setFollowing(action);
    !following ? Follow() : unFollow();
  };

  return !following ? (
    <ButtonPrimary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => onFollow(true)}
    >
      Follow
    </ButtonPrimary>
  ) : (
    <ButtonSecondary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => onFollow(false)}
    >
      <span className="text-sm ">Following</span>
    </ButtonSecondary>
  );
};

export default FollowButton;
