export interface LoginPayload {
    password: string;
    email: string;
}
export interface RegisterPayload extends LoginPayload {
    username: string;
    password_confirmation: string;
}
export interface AddBoardPayload {
    name: string;
}

export interface Board extends AddBoardPayload {
    id: number;
}