type User = {
  idUser: number;
  username: string;
  name: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
};

export default User;