import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log('pwd below');
    console.log(process.env['PASSWORD']);
    return { message: 'try /allEntities' };
  }
}
