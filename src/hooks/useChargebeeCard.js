import React, { useState, useEffect, useCallback } from "react";
import ApiCall from "../utils/apiCall";

// Validators
const isRequired = () => val => val && val.length > 0;
const hasLength = length => val => val && val.length === length;

const FORM_VALIDATORS = {
  first_name: isRequired(),
  last_name: isRequired(),
  country: hasLength(2),
  city: isRequired(),
  state: isRequired(),
  zip: isRequired()
};

const getChargebeeCurrentPaymentMethod = () =>
  ApiCall.get("/chargebee_integrations/payment_sources").then(({ json }) =>
    Promise.resolve(json.length === 0 ? null : json.pop())
  );

const createChargebeePaymentMethod = data =>
  ApiCall.post("/chargebee_integrations/payment_sources", data).then(({ json }) => {
    return Promise.resolve(json);
  });

export const useChargebeeCard = () => {
  const ref = React.useRef();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    state: "",
    zip: ""
  });
  const [invalidFields, setInvalidFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState();
  const getPaymentMethod = () => {
    setLoading(true);
    return getChargebeeCurrentPaymentMethod().then(currentPaymentMethod => {
      setCurrentPaymentMethod(currentPaymentMethod);
      setLoading(false);
    });
  };
  useEffect(
    () => {
      getPaymentMethod();
    },
    [setCurrentPaymentMethod]
  );
  /**
   * Mark a field as invalid. Use it on blur events to check if a input is empty
   *
   *  @param {string} field The form field to mark as invalid
   **/
  const setInvalidField = useCallback(
    (field, isInvalid) => {
      setInvalidFields(values => ({ ...values, [field]: isInvalid }));
    },
    [invalidFields]
  );
  /**
   * Validate a specific field in the current form and updates the invalidFields state.
   *
   *  @param {string} field The form field to validate
   *  @param {string} [value] Validate with a specific value (Optional)
   **/
  const validateField = useCallback(
    (field, value) => {
      const validateFn = FORM_VALIDATORS[field];
      const isValid = validateFn(value || form[field]);
      setInvalidField(field, !isValid);
    },
    [setInvalidField, form]
  );
  /**
   * Set a field value in the form
   *
   *  @param {string} field The form field to update
   *  @param {string} value The value of the field to update
   **/
  const setFormField = useCallback(
    (field, value) => {
      setForm(values => ({ ...values, [field]: value }));
      validateField(field, value);
    },
    [validateField]
  );
  /**
   * Generate a Chargebee Card Token
   *
   *  @returns {Promise} Promise object represents the token object
   **/
  const generateCardToken = useCallback(
    () => ref.current.tokenize({}).then(data => Promise.resolve(data.token)),
    [ref]
  );
  /**
   * Check if form is valid to perform submit. This is will validate all the form fields
   */
  const validateForm = useCallback(
    () => {
      const isCardValid = ["number", "expiry", "cvv"].every(field => invalidFields[field] === false);
      const isFormValid = Object.keys(FORM_VALIDATORS).every(field => invalidFields[field] === false);
      return isCardValid && isFormValid;
    },
    [invalidFields]
  );
  /**
   * Create a payment method. It will generate the card token and perform the create payment method in Spocket API
   *
   *  @returns {Promise} Promise object represents the token object
   **/
  const createPaymentMethod = useCallback(
    () => {
      if (!validateForm()) {
        return Promise.reject(new Error("Invalid Form"));
      }
      setLoading(true);
      return generateCardToken().then(token => {
        const data = { ...form };
        data.token_id = token;
        return createChargebeePaymentMethod(data).then(res => {
          setLoading(false);
          return Promise.resolve(res);
        });
      });
    },
    [form]
  );
  /**
   * Refetch the current payment method. Use it when you need to reload the card info after update the card
   *
   **/
  const refetch = useCallback(() => {
    getPaymentMethod();
  }, []);
  return {
    // States
    ref,
    loading,
    currentPaymentMethod,
    form,
    invalidFields,
    // Callbacks
    validateField,
    setFormField,
    setInvalidField,
    createPaymentMethod,
    refetch,
    validateForm
  };
};



// WEBPACK FOOTER //
// ./src/hooks/useChargebeeCard.js