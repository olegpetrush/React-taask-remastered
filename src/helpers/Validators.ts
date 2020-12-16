export const validatePassword = (value: string): string => {
  const internalValidatePassword = (pass: string): boolean => {
    if (!(8 <= pass.length && pass.length <= 32)) {
      return false;
    }
    if (!/.*[0-9].*/.test(pass)) {
      return false;
    }
    if (!/.*[a-z].*/.test(pass)) {
      return false;
    }
    if (!/.*[A-Z].*/.test(pass)) {
      return false;
    }
    if (!/.*[\W_].*/.test(pass)) {
      return false;
    }
    return true;
  };

  if (!value || !internalValidatePassword(value)) {
    return 'Kodeord skal være mellem 6 og 32 tegn langt og indeholde mindst ét stort bogstav, ét lille bogstav og ét specialtegn.';
  }
  return '';
};
export const validateEmail = (value: string): string => {
  // https://emailregex.com/
  const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value || !regex.test(value)) {
    return 'Mailen er ikke valid.';
  }
  return '';
};

export const validateRepeatPassword = (
  value: string,
  otherPassword: string
): string => {
  if (value.localeCompare(otherPassword) !== 0) {
    return 'Kodeord matcher ikke.';
  }
  return '';
};

export const validateNotEmpty = (value: string): string => {
  if (!value) {
    return 'Dette felt skal udfyldes.';
  }
  return '';
};

export const validateAccountNumber = (value: string): string => {
  if (!value) {
    return 'Dette felt skal udfyldes.';
  }
  if (!/^\d+$/.test(value)) {
    return "Må kun indeholde tal.";
  }
  if(value.length < 1 || value.length > 10)
    return "Skal være mellem 1 og 10 tal.";
  return '';
};

export const validateRegNumber = (value: string): string => {
  if (!value) {
    return 'Dette felt skal udfyldes.';
  }
  if (!/^\d+$/.test(value)) {
    return "Må kun indeholde tal.";
  }
  if(value.length !== 4)
    return "Skal være 4 tal.";

  return '';
};
export const validateNotMinusOne = (value: string): string => {
  if (value === "-1") return "Dette felt skal udfyldes.";

  return '';
};
