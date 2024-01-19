export interface SearchOptions {
  date_start: string;
  date_end: string;
  quantity: number;
  keyword?: string;
}

export interface ReserveOptions {
  date_start: string;
  date_end: string;
  quantity: number;
  promotion?: string | number;
  coupon_code?: string;
  discount_code?: string;
  billing?: string | number;
}

export interface TicketOptions {
  action: string;
  ticket_code?: string;
  resource_url?: string;
}
