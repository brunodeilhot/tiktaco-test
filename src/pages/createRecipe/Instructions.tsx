import { DeleteForeverRounded, DragHandleRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import CustomTextField from "./CustomTextField";
import React from "react";

interface Props {}

const Instructions: React.FC<Props> = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    name: "steps",
  });

  const handleAddInput = () => append({});

  const handleRemoveInput = (index: number) => remove(index);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
  };

  const onDragStart = () =>
    document.activeElement && (document.activeElement as HTMLElement).blur();

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid
        container
        item
        width="100%"
        paddingY={4}
        flexDirection="column"
        flexWrap="nowrap"
      >
        <Typography
          variant="h4"
          component="h2"
          color="primary"
          fontWeight={700}
          pb={3}
        >
          Instructions
        </Typography>
        {errors.steps?.message && (
          <Typography pb={2} variant="body1" color="error">
            {errors.steps.message}
          </Typography>
        )}
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Grid
              {...provided.droppableProps}
              ref={provided.innerRef}
              container
              item
            >
              {provided.placeholder}
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <Grid
                      container
                      item
                      flexWrap="nowrap"
                      pb={2}
                      alignItems="center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Grid item xs={1} mr={1} mt={1}>
                        <DragHandleRounded />
                      </Grid>
                      <Grid item xs={1}>
                        <Typography fontWeight={700} display="inline">
                          {index + 1}
                          {". "}
                        </Typography>
                      </Grid>
                      <Grid container item xs={9} pr={2}>
                        <CustomTextField
                          multiline
                          name={`steps.${index}.step`}
                          label={`Step ${index + 1}`}
                          error={
                            !errors.steps ||
                            typeof errors.steps[index] === "undefined"
                              ? false
                              : errors.steps[index].step
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleRemoveInput(index)}
                        >
                          <DeleteForeverRounded />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                </Draggable>
              ))}
            </Grid>
          )}
        </Droppable>
        <Button
          onClick={handleAddInput}
          variant="outlined"
          sx={{
            borderRadius: 10,
            textTransform: "uppercase",
            fontSize: 10,
          }}
        >
          add step
        </Button>
      </Grid>
    </DragDropContext>
  );
};

export default Instructions;
