import { User } from "@prisma/client";

export const sortAndCapitalizeLastName = (users: User[]) => {
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  const result = sortedUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname.toUpperCase(),
      email: user.email
    };
  });
  return result;
}

export const filterUsersABC = (users: User[]) => {
  const result = users.filter((user) => (
    user.name[0].toLowerCase() === "a" || 
    user.name[0].toLowerCase() === "b" || 
    user.name[0].toLowerCase() === "c" 
  ));
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

export const countUsersABC = (users: User[]) => {
  const aUsers = users.filter((user) => (user.name[0].toLowerCase() === "a"));
  const bUsers = users.filter((user) => (user.name[0].toLowerCase() === "b"));
  const cUsers = users.filter((user) => (user.name[0].toLowerCase() === "c"));

  const result = {
    a: aUsers.length,
    b: bUsers.length,
    c: cUsers.length,
  };
  return result;
}