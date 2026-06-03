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

function formatLens(meta) {
  const lens =
    meta.LensModel ||
    meta.Lens ||
    meta.LensInfo ||
    meta.LensSpecification;

  if (!lens) return undefined;
  if (typeof lens === 'string') return lens.trim();
  if (Array.isArray(lens)) return lens.filter(Boolean).join(' ');

  return String(lens).trim() || undefined;
}

function parseFocalLengthFromLensString(lens) {
  if (!lens) return undefined;
  const match = String(lens).match(/(\d+(?:\.\d+)?)\s*mm/i);
  return match ? `${match[1]}mm` : undefined;
}

function parseFocalLengthFromLensInfo(lensInfo) {
  if (!lensInfo || typeof lensInfo !== 'string') return undefined;
  const match = lensInfo.match(/^(\d+(?:\.\d+)?)\s*\//);
  return match ? `${match[1]}mm` : undefined;
}

function formatFocalLength(meta) {
  const focal = meta.FocalLength;
  const focal35 = meta.FocalLengthIn35mmFormat;

  if (typeof focal === 'number' && focal > 0) {
    const rounded = Math.round(focal * 10) / 10;
    return `${rounded % 1 === 0 ? Math.round(rounded) : rounded}mm`;
  }

  if (focal && typeof focal === 'object' && focal.numerator && focal.denominator) {
    const mm = focal.numerator / focal.denominator;
    const rounded = Math.round(mm * 10) / 10;
    return `${rounded % 1 === 0 ? Math.round(rounded) : rounded}mm`;
  }

  if (typeof focal35 === 'number' && focal35 > 0) {
    return `${Math.round(focal35)}mm`;
  }

  if (typeof meta.UprightFocalLength35mm === 'number' && meta.UprightFocalLength35mm > 0) {
    return `${Math.round(meta.UprightFocalLength35mm)}mm`;
  }

  const lensName = meta.LensModel || meta.Lens;
  return (
    parseFocalLengthFromLensString(lensName) ||
    parseFocalLengthFromLensInfo(meta.LensInfo)
  );
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
      lens: formatLens(meta),
      focalLength: formatFocalLength(meta),
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
    lens: manifest.lens ?? extracted.lens,
    focalLength: manifest.focalLength ?? extracted.focalLength,
    alt: manifest.alt ?? extracted.alt ?? manifest.title ?? extracted.title ?? manifest.id,
    downloadFilename:
      manifest.downloadFilename ?? manifest.src.split('/').pop() ?? `${manifest.id}.jpg`,
    downloadable: manifest.downloadable ?? true,
  };
}
