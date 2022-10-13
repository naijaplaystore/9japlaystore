import axios from "axios";
import UserContext from "context/UserContext";
import React, { FC, useContext } from "react";
import ButtonPrimary, { ButtonPrimaryProps } from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useAddress } from "@thirdweb-dev/react";
import { useHistory } from "react-router-dom";

export interface FollowButtonProps extends ButtonPrimaryProps {
  isFollowing?: boolean;
  userId?: number | undefined;
}

interface followersProps {
  id: number | null;
  followers: [];
  address: string;
}

const FollowButton: FC<FollowButtonProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing = Math.random() > 0.5,
  userId,
}) => {
  const [following, setFollowing] = React.useState(false);
  const { user }: any = useContext(UserContext);
  const [isFollowers, setIsFollowers] = React.useState<followersProps>({
    id: null,
    followers: [],
    address: "",
  });
  const address = useAddress();
  const checkUser = address === undefined;
  const history = useHistory();
  React.useEffect(() => {
    const getFollowesApi = async () => {
      let url = `https://naijaplaystore.pythonanywhere.com/get-or-update-followers/${user.id}/`;
      await axios
        .get(url)
        .then((res) => {
          setIsFollowers(res.data);
        })
        .catch((err) => err);
    };
    if (!checkUser) {
      getFollowesApi();
    }
  }, [user.id, isFollowers, checkUser]);

  // Follow Api
  const FollowApi = async () => {
    let url = `https://naijaplaystore.pythonanywhere.com/get-or-create-followers/`;

    const data = {
      address: user.id,
      followers: [userId],
    };
    axios
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch((err) => err);
  };

  // update Follow Api
  const updateFollowApi = () => {
    let url = `https://naijaplaystore.pythonanywhere.com/get-or-update-followers/${user.id}/`;
    // addFollowers.push(userId);

    const data = {
      address: user.id,
      followers: [...isFollowers.followers, userId],
    };
    axios
      .put(url, data)
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  // console.log(addFollowers);

  // unfollow Api

  const unFollowApi = async () => {
    let url = `https://naijaplaystore.pythonanywhere.com/get-or-update-followers/${user.id}/`;
    const filterId = isFollowers.followers.filter((e) => e !== userId);
    // console.log(filterId);
    const data = {
      address: user.id,
      followers: filterId,
    };
    axios
      .put(url, data)
      .then((res) => console.log(res))
      .catch((err) => err);
  };

  // Follow user function
  const Follow = () => {
    isFollowers.address ? updateFollowApi() : FollowApi();
  };

  // unfollow user function
  const unFollow = () => {
    console.log("un follow");
    unFollowApi();
  };

  // const filterFollowers = (e: any) => e === userId;

  // const filtered = isFollowers.followers.filter(filterFollowers);

  // Event
  const onFollow = (action: boolean) => {
    if (checkUser) {
      history.push("/connect-wallet");
    } else {
      !following && !isFollowers.followers.includes(userId as never)
        ? setFollowing(action)
        : setFollowing(action);
      !following && !isFollowers.followers.includes(userId as never)
        ? Follow()
        : unFollow();
    }
  };

  return !following && !isFollowers.followers.includes(userId as never) ? (
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
