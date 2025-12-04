import { Tag } from "./tag.interface";

export interface NIC {
name: string;
type: string;
tags?: Tag[];
}


export interface Subnet {
name: string;
type: string;
tags?: Tag[];
nics: NIC[];
}


export interface VNet {
name: string;
type: string;
tags?: Tag[];
subnets: Subnet[];
}


export interface CloudModel {
vnets: VNet[];
}