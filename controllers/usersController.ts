import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/common/constantes';
import { SqlHelper } from 'src/common/sqlHelper.entity';
import { Users } from 'src/models/users';


@Controller('users')
export class UsersController {
    @Post()
    async create(@Body() body: Users): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
    
        let command: string = `INSERT INTO usuarios(username, password, nombre, seg_nombre, apellido, seg_apellido, correo,grado_academico,  status, id_role, id_depart, id_firma, id_cargo) VALUES ('${body.username}', md5('${body.password}'), '${body.nombre}', '${body.seg_nombre}', '${body.apellido}', '${body.seg_apellido}', '${body.correo}', '${body.grado_academico}', '${body.status || 1}', '${body.id_role || 2}', '${body.id_depart || 0}', '${body.id_firma || 0}', '${body.id_cargo || 0}')`;
    
        const output: any = {};
        await SqlHelper.run(connection, command, output);
    
        connection.end();
    
        if (output === null) {
            return 'User could not be created';
        }
    
        return output.response.insertId;
    }
    

    @Post('edit')
    async edit(@Body() body: Users): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE usuarios SET password=md5('${body.password}'), username='${body.username}', nombre='${body.nombre}',seg_nombre='${body.seg_nombre}', apellido='${body.apellido}',seg_apellido='${body.seg_apellido}',correo='${body.correo}',grado_academico='${body.grado_academico}' ,cargo='${body.id_cargo || ''}', status='${body. status || '1'}', id_role='${body.id_role}, id_depart='${body.id_depart || ''} ', id_firma='${body.id_firma || ''} ' WHERE id=${body.id}`;

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
        console.log(id);
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const output: any = {};
        await SqlHelper.run(connection, `SELECT *, id as id FROM usuarios WHERE id = ${id}`, output);

        connection.end();

        if (output === null) {
            return 'Query could not be executed';
        }

        return output;
    }

    @Post('login')
    async login(@Body() body: any): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
    
        const output: any = {};
        await SqlHelper.run(connection, `SELECT *, id as id FROM usuarios WHERE username='${body.username || ''}' AND password=md5('${body.password}')`, output);
    
        if (output?.response?.length) {
            // Si encuentra el usuario, determina el tipo basado en el campo role
            output.response[0].tipo = output.response[0].id_role === 1 ? "admin" : "normal";
            console.log(output.response[0].tipo);
        }

        console.log(output);
    
        connection.end();
    
        return output?.response ? output?.response[0] : null;
    }

    
    @Get()
    async findAll(@Query('pageNumber') pageNumber, @Query('pageSize') pageSize): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const count: any = {};
        await SqlHelper.run(connection, `SELECT COUNT(*) FROM usuarios WHERE usuarios.status != 2`, count);
        
        const items: any = {};
        await SqlHelper.run(connection, `SELECT *, id as id FROM usuarios WHERE usuarios.status != 2 LIMIT ${pageNumber* pageSize}, ${pageSize}`, items);

        connection.end();

        if (items === null) {
            return 'Query could not be executed';
        }

        return {items: items.response, count: count.response[0]['COUNT(*)']};
    }
    
    @Post('delete')
    async delete(@Body() body: any): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `DELETE FROM usuarios WHERE id IN (${body.id.join(',')})`;
        console.log(command);
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'User could not be delete';
        }

        return 'ok';
    }

    @Post('logic-delete')
    async logicDelete(@Body() body: Users): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE usuarios SET status= 2 WHERE id=${body.id}`;

        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'User could not be edited';
        }

        return 'ok';
    }
}
