import { CheckCircleRounded } from "@mui/icons-material";
import { Avatar, Grid, IconButton } from "@mui/material";
import ProfileFollow from "../../../icons/ProfileFollow";
import { IUserMeta } from "../../../models/user";

interface Props {
  handleClickAvatar: (e: React.SyntheticEvent) => void;
  toggleFollow: (
    e: React.SyntheticEvent,
    userId: string,
    userIsFollowed: number
  ) => void;
  userId: string;
  username: string;
  picture: string;
  avatarPath: string;
  usersFollowed: IUserMeta[];
  activeUser: string;
}

const ProfileBt: React.FC<Props> = ({
  handleClickAvatar,
  userId,
  username,
  picture,
  avatarPath,
  toggleFollow,
  usersFollowed,
  activeUser,
}) => {
  const userIsFollowed = usersFollowed.findIndex(
    (u: IUserMeta) => u.user === userId
  );

  return (
    <Grid item position="relative" mb={2}>
      <IconButton onClick={handleClickAvatar}>
        <Avatar
          alt={username}
          src={`${avatarPath}/${picture}`}
          sx={{ width: 66, height: 66, border: "3px solid #FFF" }}
        />
      </IconButton>
      {activeUser !== userId && (
        <IconButton
          onClick={(e) => toggleFollow(e, userId, userIsFollowed)}
          sx={{ position: "absolute", padding: 0, bottom: 0, left: 31 }}
        >
          {userIsFollowed === -1 ? (
            <ProfileFollow viewBox="0 0 16 16" fontSize="small" />
          ) : (
            <CheckCircleRounded
              fontSize="small"
              color="primary"
              sx={{ backgroundColor: "#FAFAFA", borderRadius: "50%" }}
            />
          )}
        </IconButton>
      )}
    </Grid>
  );
};

export default ProfileBt;
