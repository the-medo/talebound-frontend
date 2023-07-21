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

export const imageVariantArray = Object.keys(ImageVariant) as Array<ImageVariant>;

export const isImageVariant = (variant: string): variant is ImageVariant =>
  imageVariantArray.includes(variant as ImageVariant);

export const imageUrlWithoutVariant = (url: string): string => {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];

    // Check if last part of the path is a valid variant
    if (isImageVariant(lastPart)) {
      // Remove the last part of the path
      pathParts.pop();
    }

    // Join the path parts back together and set the pathname on the URL object
    urlObject.pathname = pathParts.join('/');

    return urlObject.toString();
  } catch (error) {
    return url;
  }
};

export const imageModifyVariant = (url: string, newVariant: ImageVariant): string => {
  const urlObject = new URL(url);
  const pathParts = urlObject.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];

  // Check if last part of the path is a valid variant
  if (isImageVariant(lastPart)) {
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

/**
 * Checks whether the URL is a Talebound Cloudflare image URL.
 *
 * @param url - The URL to check.
 * @returns A boolean indicating whether the URL is a Talebound Cloudflare image URL.
 */
export const isTaleboundCloudflareImage = (url: string): boolean =>
  url.startsWith(
    `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_HOSTNAME}/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}`,
  );
