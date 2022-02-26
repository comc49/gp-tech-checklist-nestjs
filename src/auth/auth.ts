import { UserDetails } from "src/utils/types";

export interface AuthenticationProvider {
    validateUser(details: UserDetails);
    createUser(details: UserDetails);
    findUser(email: string);
    googleLogin(req: Request);
}