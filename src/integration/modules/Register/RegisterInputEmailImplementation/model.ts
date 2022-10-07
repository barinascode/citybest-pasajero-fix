import {IsEmail} from "class-validator";

 class RegisterInputEmailModel {
    
    @IsEmail({},{ message: 'Ingrese un correo válido' })
    public email!: string;

}

export default RegisterInputEmailModel