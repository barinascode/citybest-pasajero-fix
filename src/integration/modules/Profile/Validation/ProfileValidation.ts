import { IsNotEmpty,MaxLength,MinLength } from "class-validator";

const MESSAGE_ERROR = 'Por favor rellena este campo'

 class ProfileValidation {
    
    @MaxLength(15, { message: 'El número no puede tener más de 15 dígitos' })
    @MinLength(9, { message: 'El número telefónico debe tener mínimo 9 dígitos' })
     @IsNotEmpty({
         message: MESSAGE_ERROR
     })
     public phoneNumber!: string;

    
    @IsNotEmpty({
        message: MESSAGE_ERROR
    })
    public gender!: string;

    @IsNotEmpty({
        message: MESSAGE_ERROR
    })
    public birthday!: string;

}

export default ProfileValidation