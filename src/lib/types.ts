export interface Extra {
  id: string;
  name: string;
  price: string;
}

export interface Service {
  id: string;
  name: string;
  type: 'semanal' | 'mensual';
  hours: string;
  price: string;
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
  services: Service[];
}