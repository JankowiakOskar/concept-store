import React from 'react';
import styled from 'styled-components';
import InputElement from 'components/molecules/InputElement/InputElement';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import RadioInput from 'components/molecules/RadioInput/RadioInput';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';
import Button from 'components/atoms/Button/Button';
import ActiveProvider from 'providers/ActiveProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Form = styled.form`
  overflow: hidden;
`;

const Section = styled.div`
  &:last-of-type {
    margin: 20px 0;
  }
`;

const StyledSectionHeading = styled(SectionHeading)`
  &&& {
    padding: 0px;
  }
`;

const StyledInputElement = styled(InputElement)`
  &&& {
    margin: 10px 0;
  }
`;

const StyledCheckBoxElement = styled(CheckBoxElement)`
  &&& {
    margin: 20px 0 10px;
    width: 100%;
  }
`;

const StyledRadioInput = styled(RadioInput)`
  &&& {
    margin: 10px 0;
  }
`;

const StyledButton = styled(Button)`
  margin: 30px 0 0 0;
`;

const OrderSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  adress: Yup.string().required('Adress is required'),
  postCode: Yup.string()
    .matches(/^\d+$/, 'Please enter only number digits')
    .min(5, 'Minimum 5 number digits')
    .required('Postcode is required'),
  city: Yup.string().required('Please enter a city'),
  email: Yup.string()
    .email('Email adress is not correct')
    .required('Please enter your email'),
  toggleMobilePhone: Yup.bool(),
  mobilePhone: Yup.string()
    .matches(/^\d+$/, 'Please enter only number digits')
    .min(9, 'Please enter minimum 9 digits'),
});

const OrderForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    adress: '',
    postCode: '',
    city: '',
    email: '',
    mobilePhone: '',
    toggleMobilePhone: false,
  };

  return (
    <Formik initialValues={initialValues} validationSchema={OrderSchema}>
      {({ values, setFieldValue }) => (
        <Form>
          <Section>
            <StyledSectionHeading title="Billing details" />
            <StyledInputElement
              name="firstName"
              type="text"
              label="First Name"
            />
            <StyledInputElement name="lastName" type="text" label="Last Name" />
            <StyledInputElement
              name="adress"
              type="text"
              label="Adress"
              placeholder="Street with the house number"
            />

            <StyledInputElement
              name="postCode"
              type="number"
              label="Postcode"
            />

            <StyledInputElement name="city" type="text" label="City" />
            <StyledInputElement
              name="email"
              type="text"
              label="Email address"
              placeholder="We will send you all order details"
            />
            <StyledCheckBoxElement
              name="toggleMobilePhone"
              description="Add mobile phone (optional)"
              value={values.toggleMobilePhone}
              toggleCheckbox={(name) =>
                setFieldValue(name, !values.toggleMobilePhone)
              }
            />
            {values.toggleMobilePhone && (
              <StyledInputElement
                name="mobilePhone"
                type="text"
                label="Mobile number"
              />
            )}
          </Section>
          <Section>
            <StyledSectionHeading
              title="Payment methods"
              subtitle="Choose good one for you"
            />
            <ActiveProvider defaultActive={1}>
              {({ active, changeActive }) => (
                <>
                  <StyledRadioInput
                    value={active === 0}
                    setActive={() => changeActive(0)}
                    label="Credit card"
                  />
                  <StyledRadioInput
                    value={active === 1}
                    setActive={() => changeActive(1)}
                    label="Bank transfer"
                  />
                  <StyledRadioInput
                    value={active === 2}
                    setActive={() => changeActive(2)}
                    label="Cash on delivery"
                  />
                </>
              )}
            </ActiveProvider>
          </Section>
          <StyledButton type="submit">Complete order</StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
