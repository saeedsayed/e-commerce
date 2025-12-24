export interface IUser {
    _id:        string;
    fullName:   string;
    email:      string;
    avatar:     string;
    role:       string;
    cart:       string;
    wishList:   string;
    createdAt:  Date;
    updatedAt:  Date;
    isVerified: boolean;
}
