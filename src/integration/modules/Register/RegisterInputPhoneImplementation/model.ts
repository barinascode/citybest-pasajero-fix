import { IsNotEmpty,MaxLength,MinLength, ValidateIf, IsInt, Min, Max } from "class-validator";


 class RegisterInputPhoneModel {
    @MaxLength(15, { message: 'El número no puede tener más de 15 dígitos' })
    @MinLength(9, { message: 'El número telefónico debe tener mínimo 9 dígitos' })
     public phoneNumber!: string;
}

export default RegisterInputPhoneModel