export type FindAllCustomerDB = {
  email?: string;
};

export type FindOneCustomerDB = {
  id?: number;
  email?: string;
};

export type CreateCustomerDB = {
  email: string;
  password: string;
};

export type UpdateCustomerDB = {
  email?: string;
  password?: string;
};
