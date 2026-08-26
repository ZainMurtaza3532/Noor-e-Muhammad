export interface YouTubeMetadata {
  videoId: string | null;
  isValid: boolean;
  thumbnailUrl: string | null;
  embedUrl: string | null;
  watchUrl: string | null;
}

/**
 * Extracts YouTube Video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  const trimmed = url.trim();
  
  // Standard watch URL pattern
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];
  
  // Short URL pattern (youtu.be)
  const shortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];
  
  // Shorts pattern
  const shortsMatch = trimmed.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Embed pattern
  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // If raw 11-char ID is passed
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Validates and extracts full YouTube metadata for video importer
 */
export function getYouTubeMetadata(url: string): YouTubeMetadata {
  const videoId = extractYouTubeId(url);
  
  if (!videoId) {
    return {
      videoId: null,
      isValid: false,
      thumbnailUrl: null,
      embedUrl: null,
      watchUrl: null,
    };
  }

  return {
    videoId,
    isValid: true,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}
