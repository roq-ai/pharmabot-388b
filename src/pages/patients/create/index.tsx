import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPatient } from 'apiSdk/patients';
import { Error } from 'components/error';
import { patientValidationSchema } from 'validationSchema/patients';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PatientInterface } from 'interfaces/patient';

function PatientCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PatientInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPatient(values);
      resetForm();
      router.push('/patients');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PatientInterface>({
    initialValues: {
      symptoms: '',
      disease_prediction: '',
      medication_suggestion: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: patientValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Patient
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="symptoms" mb="4" isInvalid={!!formik.errors?.symptoms}>
            <FormLabel>Symptoms</FormLabel>
            <Input type="text" name="symptoms" value={formik.values?.symptoms} onChange={formik.handleChange} />
            {formik.errors.symptoms && <FormErrorMessage>{formik.errors?.symptoms}</FormErrorMessage>}
          </FormControl>
          <FormControl id="disease_prediction" mb="4" isInvalid={!!formik.errors?.disease_prediction}>
            <FormLabel>Disease Prediction</FormLabel>
            <Input
              type="text"
              name="disease_prediction"
              value={formik.values?.disease_prediction}
              onChange={formik.handleChange}
            />
            {formik.errors.disease_prediction && (
              <FormErrorMessage>{formik.errors?.disease_prediction}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="medication_suggestion" mb="4" isInvalid={!!formik.errors?.medication_suggestion}>
            <FormLabel>Medication Suggestion</FormLabel>
            <Input
              type="text"
              name="medication_suggestion"
              value={formik.values?.medication_suggestion}
              onChange={formik.handleChange}
            />
            {formik.errors.medication_suggestion && (
              <FormErrorMessage>{formik.errors?.medication_suggestion}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'patient',
    operation: AccessOperationEnum.CREATE,
  }),
)(PatientCreatePage);
