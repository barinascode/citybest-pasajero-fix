import RegisterServices from "../services/register/RegisterService"

const useEmailAlreadyTaken = () => {

    const mailAlreadyTaken = async (email: string) => {

        try {
            const {data} = await RegisterServices.preRegister({
                email
            })

            return data
            
        } catch (error) {
            console.log(error)
            return {
                "success": false,
                "error": "Ocurrio un error al validar el email"
              }
        }
    }

    return { mailAlreadyTaken }
}

export default useEmailAlreadyTaken