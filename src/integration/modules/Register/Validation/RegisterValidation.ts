import { IsNotEmpty,MaxLength,MinLength, ValidateIf, IsInt, Min, Max } from "class-validator";

const MESSAGE_ERROR = 'Por favor rellena este campo'

 class RegisterValidation {

    @IsNotEmpty({
        message: MESSAGE_ERROR
    })
    public gender!: string;

    @IsNotEmpty({
        message: MESSAGE_ERROR
    })
    public birthday!: string;

   

}

export default RegisterValidation