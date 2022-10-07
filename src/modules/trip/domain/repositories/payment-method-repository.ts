export default interface PaymentMethodRepository {
    getIdentificationTypes(): Promise<
        {
            id: string;
            maxLength: number;
            minLength: number;
            name: string;
            type: number;
        }[]
    >;

    getUserCards(): Promise<
        {
            id: string;
            type: string;
            lastFourDigits: string;
            firstSixDigits: string;
            thumbnail: string;
            holderName: string;
        }[]
    >;
    saveCard(cardToken: string): Promise<any>;
    deleteCard(cardId: string): Promise<any>;
}
