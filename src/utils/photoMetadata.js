import exifr from 'exifr';

function formatDate(value) {
  if (!value) return undefined;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function formatLocation(meta) {
  if (meta.location || meta.Location) {
    return String(meta.location || meta.Location).trim();
  }

  const parts = [
    meta.City || meta.city,
    meta.State || meta.state || meta.ProvinceState,
    meta.Country || meta.country,
  ]
    .filter(Boolean)
    .map((part) => String(part).trim());

  return parts.join(', ') || undefined;
}

function formatCamera(meta) {
  const make = meta.Make?.trim();
  const model = meta.Model?.trim();

  if (make && model && !model.toLowerCase().startsWith(make.toLowerCase())) {
    return `${make} ${model}`;
  }

  return model || make || undefined;
}

export async function extractPhotoMetadata(src) {
  try {
    const meta = await exifr.parse(src, {
      iptc: true,
      xmp: true,
      ifd0: true,
      exif: true,
      translateKeys: false,
      reviveValues: true,
    });

    if (!meta) return {};

    const title =
      meta.title ||
      meta.Title ||
      meta.Headline ||
      meta.headline ||
      meta.ObjectName ||
      meta['dc:title'];

    const description =
      meta.ImageDescription ||
      meta.description ||
      meta.Description ||
      meta.Caption ||
      meta.caption ||
      meta['dc:description'];

    return {
      title,
      location: formatLocation(meta),
      date: formatDate(meta.DateTimeOriginal || meta.CreateDate || meta.ModifyDate),
      camera: formatCamera(meta),
      alt: description || title,
    };
  } catch {
    return {};
  }
}

export function mergePhotoMetadata(manifest, extracted) {
  return {
    ...manifest,
    title: manifest.title ?? extracted.title,
    location: manifest.location ?? extracted.location,
    date: manifest.date ?? extracted.date,
    camera: manifest.camera ?? extracted.camera,
    alt: manifest.alt ?? extracted.alt ?? manifest.title ?? extracted.title ?? manifest.id,
    downloadFilename:
      manifest.downloadFilename ?? manifest.src.split('/').pop() ?? `${manifest.id}.jpg`,
  };
}
