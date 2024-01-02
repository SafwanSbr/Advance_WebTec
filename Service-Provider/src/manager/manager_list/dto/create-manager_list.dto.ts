import {
    Equals,
    IsDate,
    IsInt,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateManagerListDto {
    

    id: number;

    @IsNotEmpty({ message: 'Name is required' })
    
    name: string;

    

    @IsNotEmpty({ message: 'Phone number is required' })
   
    phone: string;

    @IsNotEmpty({ message: 'Email is required' })
    
    email: string;

    
    @IsNotEmpty({ message: 'Date of birth is required' })
    DOB: string;


    @IsNotEmpty({ message: 'Username is required' })
    
    username: string;


    @IsNotEmpty({ message: 'Password is required' })
    
    password: string;

 

    
    


    filename: string;
  }
  