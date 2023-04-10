export type CreateOrderDB = {
  bookId: number;
  customerId: number;
  status: string;
};

export type FindAllOrderDB = {
  customerId: number;
  pageNo: number;
  limit: number;
};

export type UpdateOrderDB = {
  status: string;
};
