import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "The user's phone number",
    type: String,
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: "The user's password",
    type: String,
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
