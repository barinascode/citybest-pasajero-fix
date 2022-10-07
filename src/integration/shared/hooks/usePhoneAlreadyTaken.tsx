import RegisterServices from "../services/register/RegisterService"

const usePhoneAlreadyTaken = () => {

    const phoneAlreadyTaken = async (phone: string) => {

        try {
            const {data} = await RegisterServices.preRegister({
                phone
            })

            return data
            
        } catch (error) {
            console.log(error)
            return {
                "success": false,
                "error": "Ocurrio un error al validar el telefono"
              }
        }
    }

    return { phoneAlreadyTaken }
}

export default usePhoneAlreadyTaken