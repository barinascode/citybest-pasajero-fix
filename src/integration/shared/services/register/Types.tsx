export interface PreRegisterPayload {
    email? : string;
    phone? : string;
}

export interface PreRegisterResponse {
    success ?: boolean;
    error ?: string;
}

export const PreRegisterInitialState = {
    success : false,
    error : 'Email no valid',
}