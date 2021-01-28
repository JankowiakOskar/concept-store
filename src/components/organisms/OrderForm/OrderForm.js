import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { useHistory } from 'react-router-dom';
import routes from 'routes';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import InputElement from 'components/molecules/InputElement/InputElement';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import RadioInput from 'components/molecules/RadioInput/RadioInput';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';
import Button from 'components/atoms/Button/Button';
import ActiveProvider from 'providers/ActiveProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { sleeper } from 'helpers';

const Form = styled.form`
  overflow: hidden;
`;

const FormWrapper = styled.div`
  overflow: hidden;
  max-width: 478px;
`;

const Section = styled.div`
  &:last-of-type {
    margin: 20px 0;
  }
`;

const StyledSectionHeading = styled(SectionHeading)`
  &&& {
    padding: 0px;
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
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
  @media (max-width: 330px) {
    max-width: 140px;
  }
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

const OrderForm = () => {
  const {
    updateStore,
    data: { shoppingCart },
  } = useContext(StoreContext);
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderSchema}
      onSubmit={async (_, { resetForm, setSubmitting }) => {
        await sleeper(200);
        await updateStore(shoppingCart);
        setSubmitting(false);
        resetForm();
        history.push(routes.orderCompleted);
      }}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <FormWrapper>
            <Section>
              <StyledSectionHeading title="Billing details" />
              <StyledInputElement
                name="firstName"
                type="text"
                label="First Name"
              />
              <StyledInputElement
                name="lastName"
                type="text"
                label="Last Name"
              />
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
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={50}
                  width={50}
                />
              ) : (
                'Complete order'
              )}
            </StyledButton>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
