export interface Weekdays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface Extra {
  id: string;
  name: string;
  price: string;
}

export interface Log {
  date: string;
  paid: "no" | "partial" | "paid";
  paid_amount: string;
  extras: Extra[];
  to_pay: {
    base: string;
    extra: string;
    total: string;
  }
}

export interface Service {
  id: string;
  name: string;
  price: string;
  price_type: 'fixed' | 'hourly';
}

export interface ServiceClient extends Service {
  weekdays: Weekdays;
  hours: string | null;
  log: Log[];
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