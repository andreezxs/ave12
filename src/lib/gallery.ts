import { albums as staticAlbums, type GalleryAlbum } from "@/data/site";

const galleryApiUrl = import.meta.env.VITE_GALLERY_API_URL;
const galleryApiKey = import.meta.env.VITE_GALLERY_API_KEY;
const galleryProvider = import.meta.env.VITE_GALLERY_PROVIDER;
const facebookPageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;
const facebookAccessToken = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;

type GalleryServerAlbum = {
  slug?: string;
  title: string;
  category: string;
  count: number;
  coverUrl?: string;
};

type ImmichAlbumRow = {
  id: string;
  name: string;
  description?: string | null;
  assetCount?: number;
  coverAssetId?: string | null;
};

type FacebookAlbumRow = {
  id: string;
  name: string;
  count?: number;
  cover_photo?: {
    id: string;
    images?: Array<{ source: string }>;
  } | null;
};

type FacebookAlbumsResponse = {
  data?: FacebookAlbumRow[];
};

type FacebookPhotosResponse = {
  data?: Array<{
    images?: Array<{ source: string }>;
  }>;
  summary?: {
    total_count?: number;
  };
};

type FacebookPagePhotosResponse = {
  photos?: FacebookPhotosResponse;
};

function getBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

function getAuthHeaders() {
  return galleryApiKey ? { Authorization: `Bearer ${galleryApiKey}` } : {};
}

function getFacebookCoverUrl(album: FacebookAlbumRow) {
  return album.cover_photo?.images?.[0]?.source;
}

function buildFacebookQuery(params: Record<string, string | undefined>) {
  return new URLSearchParams(
    Object.entries(params).filter(([, value]) => value != null) as [string, string][],
  ).toString();
}

async function fetchAlbumsFromImmich(): Promise<GalleryAlbum[] | null> {
  if (!galleryApiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${getBaseUrl(galleryApiUrl)}/api/v1/album?limit=100`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.warn("Immich album fetch failed:", response.status, await response.text());
      return null;
    }

    const data = (await response.json()) as ImmichAlbumRow[];
    return data.map((row) => ({
      slug: row.id,
      title: row.name,
      category: row.description?.slice(0, 60) || "Galeria",
      count: Number(row.assetCount ?? 0),
      coverUrl:
        row.coverAssetId != null
          ? `${getBaseUrl(galleryApiUrl)}/api/v1/asset/${row.coverAssetId}/thumbnail?size=600`
          : undefined,
    }));
  } catch (error) {
    console.warn("Immich album fetch failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

async function fetchAllFacebookPhotosCover(): Promise<string | undefined> {
  if (!facebookPageId || !facebookAccessToken) {
    return undefined;
  }

  const params = buildFacebookQuery({
    access_token: facebookAccessToken,
    fields: "photos.limit(1){images}",
  });

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${facebookPageId}?${params}`);
    if (!response.ok) {
      console.warn("Facebook photo cover fetch failed:", response.status, await response.text());
      return undefined;
    }

    const result = (await response.json()) as FacebookPagePhotosResponse;
    return result.photos?.data?.[0]?.images?.[0]?.source;
  } catch (error) {
    console.warn(
      "Facebook photo cover fetch failed:",
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

async function fetchAlbumsFromFacebook(): Promise<GalleryAlbum[] | null> {
  if (!facebookPageId || !facebookAccessToken) {
    console.warn("Facebook page ID or access token is not configured.");
    return null;
  }

  const params = buildFacebookQuery({
    access_token: facebookAccessToken,
    fields: "albums.limit(100){count,cover_photo{images}}",
  });

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${facebookPageId}?${params}`);
    if (!response.ok) {
      console.warn("Facebook album fetch failed:", response.status, await response.text());
      return null;
    }

    const result = (await response.json()) as FacebookPagePhotosResponse & {
      albums?: { data?: FacebookAlbumRow[] };
    };
    const pageAlbums = result.albums?.data ?? [];
    const coverUrl = await fetchAllFacebookPhotosCover();
    const totalCount = pageAlbums.reduce((sum, album) => sum + Number(album.count ?? 0), 0);

    return [
      {
        slug: `facebook-all-photos`,
        title: "Todas as fotos do Facebook",
        category: "Facebook",
        count: totalCount,
        coverUrl,
      },
    ];
  } catch (error) {
    console.warn("Facebook album fetch failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

async function fetchAlbumsFromServer(): Promise<GalleryAlbum[] | null> {
  if (!galleryApiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${getBaseUrl(galleryApiUrl)}/albums`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.warn("Gallery server responded with non-ok status:", response.status);
      return null;
    }

    const data = (await response.json()) as GalleryServerAlbum[];
    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      count: Number(row.count),
      coverUrl: row.coverUrl,
    }));
  } catch (error) {
    console.warn("Gallery server fetch failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchAlbums(): Promise<GalleryAlbum[]> {
  if (galleryProvider === "facebook") {
    const data = await fetchAlbumsFromFacebook();
    return data ?? staticAlbums;
  }

  if (!galleryApiUrl) {
    console.warn("Gallery API URL is not configured. Using static album fallback.");
    return staticAlbums;
  }

  const data =
    galleryProvider === "immich" ? await fetchAlbumsFromImmich() : await fetchAlbumsFromServer();

  return data ?? staticAlbums;
}
