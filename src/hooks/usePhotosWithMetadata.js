import { useEffect, useState } from 'react';
import { photos as photoManifest } from '../photos.js';
import { extractPhotoMetadata, mergePhotoMetadata } from '../utils/photoMetadata.js';

export function usePhotosWithMetadata() {
  const [photos, setPhotos] = useState(() =>
    photoManifest.map((photo) => ({
      ...photo,
      downloadFilename: photo.downloadFilename ?? photo.src.split('/').pop(),
    })),
  );
  const [loading, setLoading] = useState(photoManifest.length > 0);

  useEffect(() => {
    if (photoManifest.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadMetadata() {
      const enriched = await Promise.all(
        photoManifest.map(async (photo) => {
          const extracted = await extractPhotoMetadata(photo.src);
          return mergePhotoMetadata(photo, extracted);
        }),
      );

      if (!cancelled) {
        setPhotos(enriched);
        setLoading(false);
      }
    }

    loadMetadata();

    return () => {
      cancelled = true;
    };
  }, []);

  return { photos, loading };
}
