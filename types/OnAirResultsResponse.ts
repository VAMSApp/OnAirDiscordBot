import { Airport, Aircraft, Flight, Job, Member, VirtualAirline } from 'onair-api';

export type OnAirResultsResponse = VirtualAirline|Airport|Airport[]|Aircraft|Aircraft[]|Flight|Flight[]|Job|Job[]|Member|Member[];
