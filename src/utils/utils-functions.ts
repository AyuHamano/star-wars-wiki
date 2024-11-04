export function getStarWarsImg(id: string, type: string) {
  if (Number(id) === 0) {
    return;
  }
  const urlImg = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;

  return urlImg.replace("{id}", id);
}

export async function checkImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

export const getCharacterId = (url: string) => {
  const parts = url.split("/").filter(Boolean);

  return parts[parts.length - 1].replace(".jpg", "");
};
