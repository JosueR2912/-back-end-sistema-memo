export class Memos {
    id: number;
    codigo_memo: string;
    de: string;
    copia_para!: string;
    asunto:string;
    contenido:string;
    fecha:Date;
    fromDepartamento: number;
    toDepartamento: number;
    redactadoPor: string;
    status: string;
    status_delete: string;
    id_user: number;
}