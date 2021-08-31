import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/starter-app', {
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
    }),
    ConfigModule,
    UserModule,
    RoleModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {
  static port: number | string;
  constructor(
    private readonly _roleService: RoleService,
    private readonly _configService: ConfigService,
  ) {
    AppModule.port = this._configService.get(Configuration.PORT);
    this._roleService.initRoles();
  }
}
