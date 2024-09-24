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

export interface Service {
  id: string;
  name: string;
  price: string;
}

export interface ServiceClient extends Service {
  weekdays: Weekdays;
  hours: string;
  extras: Extra[];
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