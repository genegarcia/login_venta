import { VentasInterface } from './models-history-ventas';

export interface VentasResponse {
    ventas: Array<VentasInterface>
}

export interface VentaResponse {
    venta: VentasInterface
}