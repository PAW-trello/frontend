export interface LoginPayload {
    password: string;
    email: string;
}
export default interface RegisterPayload extends LoginPayload {
    username: string;
    password_confirmation: string;
}