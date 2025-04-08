import { type SlashMenuItem } from "../../types/menu";
import { Youtube } from "./extension";

export const youtubeMenuItem: SlashMenuItem = {
  title: "YouTube",
  slashTag: "/youtube",
  description: "Embed a YouTube video",
  icon: "iconoir:youtube-solid",
  command: ({ editor, range }) => {
    if (!editor) return;

    const videoId = prompt("Enter YouTube Video ID or URL:");

    if (!videoId) return;

    // Extract video ID if full URL was provided
    const matches = {
      // youtu.be URL
      shortUrl: /youtu\.be\/([a-zA-Z0-9_-]+)/.exec(videoId),
      // Regular youtube.com URL with v= parameter
      standardUrl: /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/.exec(videoId),
      // Embed youtube.com URL
      embedUrl: /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/.exec(videoId),
    };

    const extractedId =
      matches.shortUrl?.[1] ||
      matches.standardUrl?.[1] ||
      matches.embedUrl?.[1] ||
      (videoId.length === 11 ? videoId : null);

    if (extractedId) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setYoutube({ videoId: extractedId })
        .run();
    }
  },
};

export const youtubeMenuItems = [youtubeMenuItem];
