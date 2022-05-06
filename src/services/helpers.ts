import { User } from "@prisma/client";

export const sortAndCapitalizeLastName = (users: User[]) => {
  const sortedUsers = sortUsersByName(users);
  const result = capitalizeLastnames(sortedUsers);
  return result;
};

export const sortUsersByName = (users: User[]) => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
};

export const capitalizeLastnames = (users: User[]) => {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname.toUpperCase(),
      email: user.email,
    };
  });
};

export const filterUsersABC = (users: User[]) => {
  const result = users.filter(
    (user) =>
      user.name[0].toLowerCase() === "a" ||
      user.name[0].toLowerCase() === "b" ||
      user.name[0].toLowerCase() === "c"
  );
  return sortUsersByName(result);
};

export const countUsersABC = (users: User[]) => {
  const aUsers = users.filter((user) => user.name[0].toLowerCase() === "a");
  const bUsers = users.filter((user) => user.name[0].toLowerCase() === "b");
  const cUsers = users.filter((user) => user.name[0].toLowerCase() === "c");

  const result = {
    a: aUsers.length,
    b: bUsers.length,
    c: cUsers.length,
  };
  return result;
};
