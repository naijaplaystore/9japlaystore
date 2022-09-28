import axios from "axios";
import UserContext from "context/UserContext";
import React, { FC, useContext } from "react";
import ButtonPrimary, { ButtonPrimaryProps } from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface FollowButtonProps extends ButtonPrimaryProps {
  isFollowing?: boolean;
}

const FollowButton: FC<FollowButtonProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing = Math.random() > 0.5,
}) => {
  const [following, setFollowing] = React.useState(isFollowing);
  const { user }: any = useContext(UserContext);
  // console.log(user);

  // Follow Api
  const FollowApi = async () => {
    // try {
    // const res = await axios({
    //   method: "post",
    //   url: `https://naijaplaystore.pythonanywhere.com/create-followers/${user.id}`,
    //   data: {
    //     address: user.id,
    //   },
    // });

    // console.log(res);
    let url = `https://naijaplaystore.pythonanywhere.com/create-followers/42`;
    const data = {
      address: "42",
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
    FollowApi();
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
