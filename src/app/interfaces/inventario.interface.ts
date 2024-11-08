export interface Inventario{
    id_lote__id_Producto__id: number;
    id_lote__id_Producto__nombre: string;
    id_lote__id_Producto__estado: boolean;
    fecha_formateada: String;
    fechaRotacion: Date;
    id_lote__estado: string;
    id_lote__numero_lote: number;
    cantidad: number;
    unidad_medida: string;
    precio_compra: number;
    id_lote__id_Producto__id_categoria__nombre: string;
    id_lote__id_Producto__proveedor: string;
    tiempoBodega: string;
    estado: boolean;
    seleccionado?: boolean;
}