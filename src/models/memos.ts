export class Memos {
    id: number;
    codigo_memo: string;
    de: string;
    copia_para!: number;
    asunto:string;
    contenido:string;
    fecha:Date;
    fromDepartamento: number;
    toDepartamento: number;
    status: string;
    status_delete: string;
    id_user: number;
}