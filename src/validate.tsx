export const isEmail = (input: string): boolean =>
  /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-.]+\.[a-z]{2,}$/.test(input);

export const isPassword = (input: string): boolean =>
  /^[a-z0-9!@#$%^&*()_-]{4,}/i.test(input);
