import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
// import { Configuration } from './config/config.keys';
import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ModuleModule } from './module/module.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: false,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ModuleModule,
    PermissionModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _roleService: RoleService) {
    AppModule.port = process.env.PORT;
    this._roleService.initRoles();
  }
}
