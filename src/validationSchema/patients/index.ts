import * as yup from 'yup';

export const patientValidationSchema = yup.object().shape({
  symptoms: yup.string().required(),
  disease_prediction: yup.string(),
  medication_suggestion: yup.string(),
  user_id: yup.string().nullable(),
});
