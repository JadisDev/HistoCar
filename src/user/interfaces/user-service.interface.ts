import { IGenericService } from 'src/common/interfaces/generic-service.interface';
import { User } from '../entities/user.entity';

export interface IUserService extends IGenericService<User> {}
