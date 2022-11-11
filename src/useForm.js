import { useReducer } from "react";

/**
 * Returns the set of props for a text BInput
 * @param label{string} form input label
 * @param placeholder
 * @param preFix {JSXElement} to add the prefix icon before input field
 * @param value{string} current form input value
 * @param updater{function} updates formState with next value
 * @return {{onChange, label, type: string, value}}
 */
function getTextInputProps(
  { label = "", options = {}, type = "text", preFix },
  value,
  updater
) {
  return {
    label,
    value,
    type,
    preFix,
    onChange: updater,
    options,
  };
}

/**
 * Returns the set of props for a Dropdown ( BDropDown )
 * @param label{string} form input label
 * @param dropDownList{array} Dropdown options
 * @param value{string} form input value.
 * @param updater{function} updates formState with updated value.
 * @returns {{onChange, list, title, selectedValue}}
 */
function getDropDownInputProps(
  { label = "", dropDownList = [], options = {}, isSearchable = false },
  value,
  updater
) {
  return {
    list: dropDownList,
    title: label,
    selectedValue: value,
    onChange: updater,
    isSearchBar: isSearchable,
    options,
  };
}

/**
 * Returns the set of props for a Switch ( BSwitch )
 * @param initialValue
 * @param checked
 * @param updater
 * @returns {{onChange: (function(*): *), defaultChecked: boolean}}
 */
function getSwitchInputProps({ initialValue }, checked, updater) {
  return {
    defaultChecked: Boolean(initialValue),
    onChange: (next) => updater(next),
  };
}

const FORM_INPUT_TYPES = (type = "") => {
  switch (type) {
    case "text":
    case "number":
      return getTextInputProps;
    case "dropdown":
      return getDropDownInputProps;
    case "switch":
      return getSwitchInputProps;
    default:
      return () => {};
  }
};

/**
 * @param formConfiguration{object}
 * @return {object} Reducer initial state
 */
function createInitialFormState(formConfiguration) {
  return Object.keys(formConfiguration).reduce((acc, current) => {
    const item = formConfiguration[current];
    acc[current] = item.initialValue || "";
    return acc;
  }, {});
}

/**
 * Reducer function
 * @param formState{object}
 * @param field{string} Form field
 * @param value{*} Updated value for form
 * @return {*}
 */
function reduceForm(formState, { field, value = null }) {
  if (formState[field] !== undefined) {
    return {
      ...formState,
      [field]: value,
    };
  }
  return formState;
}

/**
 * useForm: Form state management.
 * Could also move to BB after adding form validation / error handling
 * @param formConfiguration
 * @returns {{formState: S, register: (function(*): *)}}
 */
function useForm(formConfiguration = {}) {
  const [formState, dispatch] = useReducer(
    reduceForm,
    createInitialFormState(formConfiguration)
  );
  const doUpdate = (field) => (value) => {
    dispatch({ field, value });
  };

  const register = (fieldKey) => {
    const fieldConfiguration = formConfiguration[fieldKey];
    if (fieldConfiguration && fieldConfiguration.type) {
      const getPropsFn = FORM_INPUT_TYPES(fieldConfiguration.type);
      return getPropsFn(
        fieldConfiguration,
        formState[fieldKey],
        doUpdate(fieldKey)
      );
    }
    return FORM_INPUT_TYPES();
  };

  return { register, formState };
}

export default useForm;
