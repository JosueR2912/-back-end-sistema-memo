import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/common/constantes';
import { SqlHelper } from 'src/common/sqlHelper.entity';
import {Cargo} from 'src/models/cargos';

@Controller('cargo')
export class CargoController {
    @Post()
    async create(@Body() body: Cargo): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `INSERT INTO cargos (nombre, status) VALUES ('${body.nombre}', '${body.status || 'activo'}')`;
        
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'User could not be created';
        }

        return output.response.insertId;
    }

    @Post('edit')
    async edit(@Body() body: Cargo): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE cargos SET nombre='${body.nombre}', status='${body.status}' WHERE id=${body.id}`;
        console.log(command);
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'User could not be edited';
        }

        return 'ok';
    }

    @Get('view')
    async findOne(@Query('id') id): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const output: any = {};
        await SqlHelper.run(connection, `SELECT * FROM cargos WHERE id=${id}`, output);

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
        await SqlHelper.run(connection, `SELECT COUNT(*) FROM cargos`, count);
        
        const items: any = {};
        await SqlHelper.run(connection, `SELECT * FROM cargos LIMIT ${pageNumber* pageSize}, ${pageSize}`, items);

        connection.end();

        if (items === null) {
            return 'Query could not be executed';
        }

        return {items: items.response, count: count.response[0]['COUNT(*)']};
    }

    @Post('logic-delete')
    async logicDelete(@Body() body: Cargo): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE cargos SET status='inactivo' WHERE id=${body.id}`;

        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'cargo could not be edited';
        }

        return 'ok';
    }



    @Post('delete')
    async delete(@Body() body: any): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `DELETE FROM cargos WHERE id IN (${body.id.join(',')})`;
        console.log(command);
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'cargocould not be delete';
        }

        return 'ok';
    }
}