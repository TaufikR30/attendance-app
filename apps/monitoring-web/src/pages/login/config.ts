import * as yup from "yup";

export const loginSchemaDefaultValue = {
  email: "",
  password: "",
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak sesuai")
    .required("Email harus diisi"),
  password: yup.string().required("Masukkan password terlebih dahulu"),
});
