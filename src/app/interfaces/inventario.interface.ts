export interface Inventario{
    id_lote__id_Producto__nombre: string;
    fecha_formateada: Date;
    fecha_Rotacion: Date;
    id_lote__estado: string;
    id_lote__numero_lote: number;
    cantidad: number;
    unidad_medida: string;
    precio_compra: number;
    id_lote__id_Producto__id_categoria__nombre: string;
    id_lote__id_Producto__proveedor: string;
}