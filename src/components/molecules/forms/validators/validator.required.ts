export function validate(result, key) {
  if (typeof result.value !== 'number' && !result.value) {
    return {
      error: 'required',
    };
  }

  return {};
}

export default {
  validate,
};
