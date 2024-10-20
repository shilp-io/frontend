export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    dashboardItems: DashboardItem[];
}

export interface DashboardItem {
    id: string;
    title: string;
    data: any;
    created: string;
    lastModified: string;
}
