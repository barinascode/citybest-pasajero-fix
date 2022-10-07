export default interface UserNotification {
    id: string;
    title: string;
    message: string;
    date: Date | string;
    type?: string;
}
