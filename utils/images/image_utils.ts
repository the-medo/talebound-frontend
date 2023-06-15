export enum ImageVariant {
  '100x100' = '100x100',
  '1200x800' = '1200x800',
  '150x150' = '150x150',
  '1920x200' = '1920x200',
  '200x200' = '200x200',
  '300x300' = '300x300',
  '30x30' = '30x30',
  'original' = 'original',
  'public' = 'public',
}

export const modifyImageVariant = (url: string, newVariant: ImageVariant): string => {
  const urlObject = new URL(url);
  const pathParts = urlObject.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];

  // Check if last part of the path is a valid variant
  if (Object.values(ImageVariant).includes(lastPart as ImageVariant)) {
    // Replace the last part of the path with the new variant
    pathParts[pathParts.length - 1] = newVariant;
  } else {
    // Add the new variant to the path, in case of a Cloudflare URL
    if (urlObject.hostname === process.env.NEXT_PUBLIC_CLOUDFLARE_HOSTNAME) {
      pathParts.push(newVariant);
    }
  }

  // Join the path parts back together and set the pathname on the URL object
  urlObject.pathname = pathParts.join('/');

  return urlObject.toString();
};
