import * as yup from 'yup';

export const hospitalValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  provider_id: yup.string().nullable(),
});
