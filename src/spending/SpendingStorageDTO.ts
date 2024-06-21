export type SpendingStorageDTO = {
  id: string;
  invoice: string;
  productCode: string;
  invoiceValue: string;
  state: string;
  provider: string;
  tax?: string
}