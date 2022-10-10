export type UserProfile = {
    login: string;
    name: string;
    avatar_url: string;
};

export type AccessToken = {
    access_token: string;
    token_type: string;
    scope?: string;
};
