import _ from 'lodash';
import ValidatorRequired from './validator.required';

const importedValidators: { [key: string]: any } = {};
importedValidators.required = ValidatorRequired;

const validator = {
  execute: (field, key) => {
    const errors = [];
    if (field.validation) {
      _.forEach(field.validation, (validation: string) => {
        const validator = importedValidators[validation] as any;
        const result = validator?.validate(field, key);
        if (result?.error) {
          errors.push(result.error);
        }
      });
    }
    return errors;
  },
};

export default validator;
