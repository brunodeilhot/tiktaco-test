import { styled, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  feed: number;
  changeFeed: (_event: React.SyntheticEvent, newFeed: number) => void;
}

const TopTabs = styled(Tabs)(({ theme }) => ({
  position: "absolute",
  top: 15,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  "& .MuiTabs-indicator": {
      backgroundColor: "transparent"
  }
}));

const TopTab = styled(Tab)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1em",
    fontWeight: 700,
    textShadow: "0px 3px 3px rgba(0, 0, 0, .35)",
    "&.Mui-selected": {
        color: "#FAFAFA"
    }
}))

const FeedTabs: React.FC<Props> = ({ feed, changeFeed }) => {

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <TopTabs centered value={feed} onChange={changeFeed} sx={{ top: desktop ? 60 : 15 }}>
      <TopTab label="following" />
      <TopTab label="discover" />
    </TopTabs>
  );
};

export default FeedTabs;
