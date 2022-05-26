export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  _org?: any[]
};

export const defaultUsers: User[] = [
  {
    _id: "001",
    avatar: "/images/avatars/1.jpg",
    firstName: "Navanath",
    lastName: "Jadhav",
    role: "Admin",
    email: "navanath@angularminds.com",
    _org: [{ name: "Angular Minds", _id: "11111" }],
  },
  {
    _id: "002",
    avatar: "/images/avatars/2.jpg",
    firstName: "Abhijit",
    lastName: "Borade",
    role: "Admin",
    email: "abhijit@angularminds.com",
  },
  {
    _id: "003",
    avatar: "/images/avatars/3.jpg",
    firstName: "Sagar",
    lastName: "Mahajan",
    role: "Admin",
    email: "sagar@angularminds.com",
  },
  {
    _id: "004",
    avatar: "/images/avatars/4.jpg",
    firstName: "Nitin",
    lastName: "Bhadane",
    role: "Admin",
    email: "nitin@angularminds.com",
  }
];
