export type UserProfile = {
    login: string;
    name: string;
    avatar_url: string;
};

export type OrganizaionInfo = {
    id: number;
    avatar_url: string;
    login: string;
    url: string;
    repos_url: string;
    description: string;
};

export type Repository = {
    id: number;
    owner: OrganizaionInfo;
    full_name: string;
    name: string;
};

export type PullRequest = {
    id: number;
    base: {
        repo: Repository;
    };
    state: string;
    title: string;
    body: string;
    user: UserProfile;
    html_url: string;
    requested_reviewers: UserProfile[];
    updated_at: string;
};
