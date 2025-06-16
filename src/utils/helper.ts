export const profileName = (name: string) => {
  const names = name.trim().split(" ");
  const first = names[0]?.charAt(0).toUpperCase() || "";
  const last =
    names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
  return first + last;
};
