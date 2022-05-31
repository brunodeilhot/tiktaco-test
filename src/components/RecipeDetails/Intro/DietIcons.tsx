import { Avatar, Grid, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { IDiet } from "../../../models/recipe";

interface Props {
  diet: string[];
}

const DietIcons: React.FC<Props> = ({ diet }) => {
  const [status, setStatus] = useState<IDiet>({
    glutenFree: false,
    dairyFree: false,
    vegan: false,
    vegetarian: false,
    keto: false,
  });

  useEffect(() => {
    diet.forEach((type: string) => {
      switch (type) {
        case "gf":
          setStatus(status => ({ ...status, glutenFree: true }));
          break;
        case "df":
          setStatus(status => ({ ...status, dairyFree: true }));
          break;
        case "v":
          setStatus(status => ({ ...status, vegan: true }));
          break;
        case "vv":
          setStatus(status => ({ ...status, vegetarian: true }));
          break;
        case "k":
          setStatus(status => ({ ...status, keto: true }));
          break;
      }
    });
  }, [diet]);

  const icons = [
    { name: "GF", alt: "Gluten Free", status: status.glutenFree },
    { name: "DF", alt: "Dairy Free", status: status.dairyFree },
    { name: "V", alt: "Vegetarian", status: status.vegetarian },
    { name: "VE", alt: "Vegan", status: status.vegan },
    { name: "K", alt: "Ketogenic", status: status.keto },
  ];

  const iconStyle = {
    border: "2px solid",
    borderColor: "text.secondary",
    backgroundColor: "transparent",
    color: "text.secondary",
    fontWeight: 700,
    fontSize: 12,
    width: 28,
    height: 28,
  };

  return (
    <Grid container item spacing={1}>
      {icons.map((item) => (
        <Grid key={item.name} item>
          <Tooltip
            title={item.alt}
            enterDelay={300}
            leaveDelay={200}
            enterTouchDelay={0}
          >
            <Avatar
              alt={item.alt}
              sx={
                item.status
                  ? {
                      ...iconStyle,
                      borderColor: "primary.main",
                      color: "primary.main",
                    }
                  : iconStyle
              }
            >
              {item.name}
            </Avatar>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default DietIcons;
