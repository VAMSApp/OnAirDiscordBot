import Table from 'easy-table';
import { Fbo as OnAirFbo } from 'onair-api';

export function FBODetail (x:OnAirFbo):string|void {
    if (!x) return;

    const t = new Table;
    
    return t.toString();
}