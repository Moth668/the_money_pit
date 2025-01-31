export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  isCorrectPassword(password: string): Promise<boolean>;
}