import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'secretpassword',
  })
  @IsString()
  password: string;
}
