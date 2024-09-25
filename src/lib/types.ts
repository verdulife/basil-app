export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Extra {
  id: string;
  name: string;
  price: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  price_type: 'fixed' | 'hourly';
}

export interface ServiceClient extends Service {
  weekday: Weekday;
  hours: string | null;
  date: string;
  paid: "no" | "partial" | "paid";
  paid_amount: string;
  to_pay: {
    base: string;
    extra: string;
    total: string;
  }
}

export interface Client {
  id: string;
  name: string;
  contact: {
    phone?: string;
    email?: string;
  },
  address: {
    street: string;
    city: string;
    state: string;
  },
  services: ServiceClient[];
}