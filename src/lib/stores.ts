import type { Client, Extra, Service } from "@/lib/types";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localClients = browser && localStorage.getItem("basil_clients");
export const clients = writable<Client[]>(localClients ? JSON.parse(localClients) : []);
clients.subscribe((value) => browser && (localStorage["basil_clients"] = JSON.stringify(value)));

const localServices = browser && localStorage.getItem("basil_services");
export const services = writable<Service[]>(localServices ? JSON.parse(localServices) : []);
services.subscribe((value) => browser && (localStorage["basil_services"] = JSON.stringify(value)));

const localExtras = browser && localStorage.getItem("basil_extras");
export const extras = writable<Extra[]>(localExtras ? JSON.parse(localExtras) : []);
extras.subscribe((value) => browser && (localStorage["basil_extras"] = JSON.stringify(value)));
