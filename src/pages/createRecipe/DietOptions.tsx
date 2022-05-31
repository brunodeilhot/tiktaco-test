import { Avatar, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IDiet } from "../../models/recipe";

const DietOptions: React.FC = () => {
  const { register } = useFormContext();
  const [status, setStatus] = useState<IDiet>({
    glutenFree: false,
    dairyFree: false,
    vegan: false,
    vegetarian: false,
    keto: false,
  });

  const handleOption = (name: string) => {
    switch (name) {
      case "GF":
        setStatus({ ...status, glutenFree: !status.glutenFree });
        break;
      case "DF":
        setStatus({ ...status, dairyFree: !status.dairyFree });
        break;
      case "VE":
        setStatus({ ...status, vegan: !status.vegan });
        break;
      case "V":
        setStatus({ ...status, vegetarian: !status.vegetarian });
        break;
      case "K":
        setStatus({ ...status, keto: !status.keto });
        break;
    }
  };

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
    <Grid container item flexDirection="column" flexWrap="nowrap" pb={4}>
      <Grid item>
        <Typography
          variant="h4"
          component="h2"
          color="primary"
          fontWeight={700}
          pb={3}
        >
          Dietary Options
        </Typography>
      </Grid>
      <Grid container item justifyContent="space-around">
        {icons.map((item, index) => (
          <Grid key={item.name} item>
            <Tooltip
              title={item.alt}
              enterDelay={300}
              leaveDelay={200}
              enterTouchDelay={0}
            >
              <IconButton
                {...item.status === true && {...register(`diet[${index}]`, { value: `${item.name}` })}}
                onClick={() => handleOption(item.name)}
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
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DietOptions;
