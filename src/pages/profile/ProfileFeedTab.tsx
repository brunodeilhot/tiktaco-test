import { FavoriteRounded, StarRounded } from "@mui/icons-material";
import { Grid, Tab, Tabs } from "@mui/material";
import FeedGrid from "../../icons/FeedGrid";

interface Props {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabValue: string;
}

const ProfileFeedTab: React.FC<Props> = ({ handleTabChange, tabValue }) => {

  const profileTabs = [
    {
      name: "recipes",
      icon: <FeedGrid color="#FFF" />,
    },
    {
      name: "likes",
      icon: <FavoriteRounded sx={{ fontSize: 28 }} />,
    },
    {
      name: "favorites",
      icon: <StarRounded sx={{ fontSize: 36 }} />,
    },
  ];

  return (
    <Grid container>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="profile feed tab menu"
        sx={{ width: "100%", '& .MuiTabs-indicator': { height: '3px'} }}
      >
        {profileTabs.map((tab) => (
          <Tab
            key={tab.name}
            value={tab.name}
            label={tab.icon}
            sx={{ minWidth: (100 / profileTabs.length).toString() + "%" }}
          />
        ))}
      </Tabs>
    </Grid>
  );
};

export default ProfileFeedTab;
