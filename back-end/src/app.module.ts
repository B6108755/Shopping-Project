import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { BillModule } from './bill/bill.module';
import { Bill } from './bill/entities/bill.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';
@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shoping',
      entities: [User, Product, Bill, Report, Contact],
      synchronize: true,
    }),

    UsersModule,
    ProductModule,
    AuthModule,
    BillModule,
    ReportModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
