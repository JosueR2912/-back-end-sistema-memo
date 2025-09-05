import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/common/constantes';
import { SqlHelper } from 'src/common/sqlHelper.entity';
import { Firma } from 'src/models/firmas';
import {  UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('firma')
export class FirmaController {
    @Post()
    async create(@Body() body: Firma): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `INSERT INTO firmas(nombre, direccion) VALUES ('${body.nombre}', '${body.direccion}')`;
        
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'firma could not be created';
        }

        return output.response.insertId;
    }

    @Post('edit')
    async edit(@Body() body: Firma): Promise<string> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        let command: string = `UPDATE firmas SET nombre='${body.nombre}', direccion='${body.direccion}' WHERE id=${body.id}`;
        console.log(command);
        const output: any = {};
        await SqlHelper.run(connection, command, output);

        connection.end();

        if (output === null) {
            return 'firma could not be edited';
        }

        return 'ok';
    }


    @Get('view')
    async findOne(@Query('id') id): Promise<any> {
        let connection = await SqlHelper.connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE);
        
        const output: any = {};
        await SqlHelper.run(connection, `SELECT * FROM firmas WHERE id=${id}`, output);

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
        await SqlHelper.run(connection, `SELECT COUNT(*) FROM firmas`, count);
        
        const items: any = {};
        await SqlHelper.run(connection, `SELECT * FROM firmas LIMIT ${pageNumber* pageSize}, ${pageSize}`, items);

        connection.end();

        if (items === null) {
            return 'Query could not be executed';
        }

        return {items: items.response, count: count.response[0]['COUNT(*)']};
    }
    @Post('file')
  @UseInterceptors(FileInterceptor('myFile[]', {
    storage: diskStorage({
      destination: './uploads/firmas', // La carpeta donde se guardarán los archivos
      filename: (req, file, callback) => {
        // Genera un nombre de archivo único para evitar colisiones
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const ext = extname(file.originalname);
        // callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        callback(null, file.originalname); // Mantiene el nombre original del archivo
      },
    }),
    fileFilter: (req, file, callback) => {
      // Opcional: valida el tipo de archivo
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new HttpException('Solo se permiten archivos de imagen!', HttpStatus.BAD_REQUEST), false);
      }
      callback(null, true);
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No se ha subido ningún archivo.', HttpStatus.BAD_REQUEST);
    }
    
    // Aquí puedes guardar la información del archivo en una base de datos si lo necesitas
    console.log(file);

    return {
      message: 'Archivo subido correctamente!',
      filename: file.filename,
    };
  }

}