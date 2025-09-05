import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/usersController';
import { DepartamentoController} from './controllers/departamentoController'
import { RoleController } from './controllers/rolesController';
import { FirmaController } from './controllers/firmasController';
import { ScheduleModule } from '@nestjs/schedule';
import { CargoController } from './controllers/cargosController';
import { PdfController } from './controllers/pdfsController';
import { MemoController } from './controllers/memosController';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [ScheduleModule.forRoot(),MulterModule.register({ dest: './uploads' })],
  controllers: [AppController,MemoController, UsersController, DepartamentoController, RoleController, FirmaController,CargoController, PdfController],
  providers: [AppService],
})
export class AppModule {}
