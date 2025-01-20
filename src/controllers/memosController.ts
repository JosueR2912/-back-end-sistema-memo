import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/common/constantes';
import { SqlHelper } from 'src/common/sqlHelper.entity';
import { Memos } from 'src/models/memos';

@Controller('memos')
export class MemoController {
    @Post()
    async create(@Body() body: Memos): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `INSERT INTO memos(codigo_memo, de, copia_para, asunto, contenido, fecha, fromDepartamento, toDepartamento, status, status_delete, id_user) VALUES ('${body.codigo_memo}', '${body.de}', '${body.copia_para || "0"}', '${body.asunto}', '${body.contenido}', '${body.fecha}', ${body.fromDepartamento}, ${body.toDepartamento}, '${body.status}', '${body.status_delete}', ${body.id_user || 0})`;
        
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'Memo could not be created';
        }

        return output.response.insertId;
    }
    @Post('edit')
    async edit(@Body() body: Memos): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE memos SET status='${body.status}' WHERE id=${body.id}`;
        console.log(command);
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'memo could not be edited';
        }

        return 'ok';
    }
    
    @Get('view')
    async findOne(@Query('id') id): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const output: any = {};
        await SqlHelper.run(connection, `SELECT * FROM memos WHERE id=${id}`, output);

        connection.end();

        if (output === null) {
            return 'Query could not be executed';
        }

        return output;
    }
    @Get()
    async findAll(@Query('pageNumber') pageNumber, @Query('pageSize') pageSize): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const count: any = {};
        await SqlHelper.run(connection, `SELECT COUNT(*) FROM memos`, count);
        
        const items: any = {};
        await SqlHelper.run(connection, `SELECT * FROM memos LIMIT ${pageNumber* pageSize}, ${pageSize}`, items);

        connection.end();

        if (items === null) {
            return 'Query could not be executed';
        }

        return {items: items.response, count: count.response[0]['COUNT(*)']};
    }

    @Post('logic-delete')
    async logicDelete(@Body() body: Memos): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE memos SET status_delete= 2 WHERE id=${body.id}`;

        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'memo could not be edited';
        }

        return 'ok';
    }


}