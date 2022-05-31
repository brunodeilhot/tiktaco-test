import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().max(50, "max length is 50 chars").required("required"),
  time: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .required("required"),
  servings: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .required("required"),
  ingredients: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("required"),
        quantity: yup.string().required("required"),
      })
    )
    .min(1, "Add at least one ingredient"),
  steps: yup
    .array()
    .of(
      yup.object({
        step: yup.string().required("required"),
      })
    )
    .min(1, "Add at least one step"),
  picture: yup
    .mixed()
    .test("FileRequired", "Picture is required", (value) => value.length !== 0)
    .test(
      "FileSize",
      "File must be under 1MB",
      (value) => !value[0] || (value[0] && value[0].size <= 1024 * 1024)
    )
    .test(
      "FileType",
      "File must be an image",
      (value) => !value[0] || (value[0] && process.env.REACT_APP_IMAGE_FORMATS.includes(value[0].type))
    ),
});