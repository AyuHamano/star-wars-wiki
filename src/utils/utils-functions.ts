export function getStarWarsImg(id: string, type: string) {
  if (Number(id) === 0) {
    return;
  }
  const urlImg = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;

  return urlImg.replace("{id}", id);
}

export const getCharacterId = (url: string) => {
  const parts = url.split("/").filter(Boolean);

  return parts[parts.length - 1].replace(".jpg", "");
};
