import * as yup from "yup";

export const updateSchema = yup.object({
  name: yup.string().max(50, "max length is 50 chars").required(),
  username: yup
    .string()
    .lowercase()
    .max(25, "max length is 25 chars")
    .matches(/^[a-z0-9_.]+$/, "username is invalid")
    .required(),
  picture: yup
    .mixed()
    .test(
      "FileSize",
      "File must be under 1MB",
      (value) => !value[0] || (value[0] && value[0].size <= 1024 * 1024)
    )
    .test(
      "FileType",
      "File must be an image",
      (value) =>
        !value[0] ||
        (value[0] &&
          process.env.REACT_APP_IMAGE_FORMATS.includes(value[0].type))
    ),
  bio: yup.string().max(250, "max length is 250 chars"),
});

export const createSchema = yup.object({
  name: yup.string().max(50, "max length is 50 chars").required(),
  email: yup.string().email("must be a valid email").required(),
  username: yup
    .string()
    .lowercase()
    .max(25, "max length is 25 chars")
    .matches(/^[a-z0-9_.]+$/, "username is invalid")
    .required(),
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
      (value) =>
        !value[0] ||
        (value[0] &&
          process.env.REACT_APP_IMAGE_FORMATS.includes(value[0].type))
    ),
  bio: yup.string().max(250, "max length is 250 chars"),
});
