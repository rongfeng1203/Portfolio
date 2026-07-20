export type PortfolioSection = {
  slug: string;
  title: string;
  cn: string;
  code: string;
  color: string;
  accent: string;
  textColor: string;
  intro: string;
  note: string;
  buckets: Array<{
    title: string;
    meta: string;
    copy: string;
    href?: string;
    mediaCategory?: "stage" | "scenery" | "humans";
  }>;
  imageSlots: string[];
  mediaItems?: Array<{
    src: string;
    type: "image" | "video";
    title: string;
    meta: string;
    width?: number;
    height?: number;
  }>;
};

type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];

const mediaDimensions: Record<string, { width: number; height: number }> = {
  "visual/001.png": { width: 1734, height: 976 },
  "visual/002.png": { width: 1736, height: 972 },
  "visual/003.png": { width: 1732, height: 976 },
  "digital/001.jpeg": { width: 1800, height: 2400 },
  "digital/002.jpeg": { width: 1800, height: 2400 },
  "digital/003.jpeg": { width: 2400, height: 1800 },
  "digital/004.jpeg": { width: 2400, height: 1800 },
  "digital/005.jpeg": { width: 2400, height: 1800 },
  "digital/006.jpeg": { width: 2400, height: 1800 },
  "digital/007.jpeg": { width: 2400, height: 1800 },
  "digital/008.jpeg": { width: 2400, height: 1800 },
  "digital/009.jpeg": { width: 2400, height: 1800 },
  "digital/010.jpg": { width: 2400, height: 1638 },
  "digital/011.jpg": { width: 2400, height: 1108 },
  "digital/012.jpg": { width: 2400, height: 1679 },
  "digital/013.jpg": { width: 2400, height: 2257 },
  "digital/014.jpg": { width: 2400, height: 1600 },
  "digital/015.png": { width: 2400, height: 1800 },
  "digital/016.png": { width: 2205, height: 1651 },
  "digital/017.png": { width: 2400, height: 1919 },
  "digital/019.png": { width: 1800, height: 2400 },
};

function numberedFiles(count: number, extension = "jpg") {
  return Array.from({ length: count }, (_, index) => `${String(index + 1).padStart(3, "0")}.${extension}`);
}

function numberedMedia(
  folder: string,
  files: string[],
  type: "image" | "video",
  titlePrefix: string,
  metaPrefix = titlePrefix,
) {
  return files.map((file, index) => ({
    src: `/portfolio-assets/${folder}/${file}`,
    type,
    title: `${titlePrefix} ${String(index + 1).padStart(2, "0")}`,
    meta: `${metaPrefix}_${String(index + 1).padStart(2, "0")}`,
    ...mediaDimensions[`${folder}/${file}`],
  }));
}

const photographyCategoryMedia = {
  stage: numberedMedia("photography/stage", numberedFiles(19), "image", "Stage photo", "PHOTO_STAGE"),
  scenery: numberedMedia("photography/scenery", numberedFiles(20), "image", "Scenery photo", "PHOTO_SCENERY"),
  humans: numberedMedia("photography/humans", numberedFiles(18), "image", "Human photo", "PHOTO_HUMANS"),
} as const satisfies Record<"stage" | "scenery" | "humans", MediaItem[]>;

export type PhotographyCategory = keyof typeof photographyCategoryMedia;

export function getPhotographyCategoryMedia(category: PhotographyCategory) {
  return photographyCategoryMedia[category];
}

const photographyMedia = [
  ...photographyCategoryMedia.stage,
  ...photographyCategoryMedia.scenery,
  ...photographyCategoryMedia.humans,
];

const visualMedia = numberedMedia(
  "visual",
  ["001.png", "002.png", "003.png"],
  "image",
  "Visual study",
);

const digitalMedia = [
  ...numberedMedia(
    "digital",
    [
      "001.jpeg",
      "002.jpeg",
      "003.jpeg",
      "004.jpeg",
      "005.jpeg",
      "006.jpeg",
      "007.jpeg",
      "008.jpeg",
      "009.jpeg",
      "010.jpg",
      "011.jpg",
      "012.jpg",
      "013.jpg",
      "014.jpg",
      "015.png",
      "016.png",
      "017.png",
    ],
    "image",
    "Digital still",
  ),
  ...numberedMedia("digital", ["018.mp4"], "video", "Motion piece"),
  ...numberedMedia("digital", ["019.png"], "image", "Digital still"),
];

const theatreStageMedia = numberedMedia("theatre/stage", numberedFiles(17), "image", "Stage photo", "THEATRE_STAGE");

export const portfolioSections: PortfolioSection[] = [
  {
    slug: "games",
    title: "Games",
    cn: "遊戲",
    code: "PLAYABLE_SYSTEMS",
    color: "var(--lime)",
    accent: "#002FA7",
    textColor: "var(--pink)",
    intro:
      "Playable prototypes, Unity scenes, small web experiments, and design studies. This page is the main application-facing archive for systems, level design, and interaction.",
    note: "Four projects are now collected here: playable Starfall and Duck Breaker builds, an interactive Text-Go visualization, and two embedded game demo reels.",
    buckets: [
      { title: "Playable", meta: "web / python / prototype", copy: "Small loops with a clear mechanic, a readable goal, and room for player curiosity." },
      { title: "Unity", meta: "3d / lighting / systems", copy: "Worldbuilding, camera tests, spatial interaction, and scenes that show game-design thinking." },
      { title: "Process", meta: "sketch / test / reflection", copy: "Iterations, failed versions, mechanics maps, and notes about what changed." },
    ],
    imageSlots: ["gameplay still", "mechanic diagram", "level sketch", "build video"],
  },
  {
    slug: "photography",
    title: "Photography",
    cn: "攝影",
    code: "PHOTO_INDEX",
    color: "var(--violet)",
    accent: "var(--lime)",
    textColor: "var(--orange)",
    intro:
      "Series-based photo archive for portraits, street fragments, theatre documentation, backstage images, and visual research.",
    note: "Current photography assets are loaded as a living photo wall. Series labels can be added once the archive is sorted.",
    buckets: [
      { title: "Stage", meta: "theatre / rehearsal / production", copy: "A living record of light, waiting, and the machinery around performance.", href: "/photography/stage", mediaCategory: "stage" },
      { title: "Scenery", meta: "place / texture / surface", copy: "Found spaces, accidental compositions, locations, and environmental fragments.", href: "/photography/scenery", mediaCategory: "scenery" },
      { title: "Humans", meta: "people / character / quiet", copy: "Images built around presence, styling, and small emotional clues.", href: "/photography/humans", mediaCategory: "humans" },
    ],
    imageSlots: ["series cover", "masonry image", "contact sheet", "detail crop"],
    mediaItems: photographyMedia,
  },
  {
    slug: "visual",
    title: "Visual Art",
    cn: "视觉",
    code: "SCAN_POSTER",
    color: "var(--pink)",
    accent: "var(--orange)",
    textColor: "var(--orange)",
    intro:
      "Illustration, drawing, painting, graphic experiments, posters, and visual systems that feel scanned, printed, handled, and remixed.",
    note: "Current visual-art assets are loaded. Add more scans, posters, and process images when the folder grows.",
    buckets: [
      { title: "Illustration", meta: "digital / character / composition", copy: "Finished works and studies with a clear visual voice." },
      { title: "Poster Systems", meta: "type / collage / riso", copy: "Graphic work where text, hierarchy, and texture carry the idea." },
      { title: "Sketchbook", meta: "process / material / scan", copy: "Raw pages that show how the finished language is built." },
    ],
    imageSlots: ["poster", "illustration", "sketch scan", "detail"],
    mediaItems: visualMedia,
  },
  {
    slug: "digital",
    title: "Digital Arts",
    cn: "影像",
    code: "MOTION_BUFFER",
    color: "var(--purple)",
    accent: "var(--lime)",
    textColor: "var(--lime)",
    intro:
      "Motion loops, video, shader experiments, screen-based images, interactive tests, and pieces that should not sit still.",
    note: "Current digital-media assets are loaded, including collage/surreal stills and one motion piece.",
    buckets: [
      { title: "Motion", meta: "video / loop / edit", copy: "Moving-image pieces with rhythm, cut, and atmosphere." },
      { title: "Shader Tests", meta: "webgl / dither / glitch", copy: "Small technical experiments that can become visual systems." },
      { title: "Screen Images", meta: "digital / composite / texture", copy: "Still images made for a monitor rather than a wall." },
    ],
    imageSlots: ["video still", "shader capture", "loop preview", "process frame"],
    mediaItems: digitalMedia,
  },
  {
    slug: "theatre",
    title: "Theatre",
    cn: "戲劇",
    code: "SPACE_CUE",
    color: "var(--orange)",
    accent: "var(--violet)",
    textColor: "var(--purple)",
    intro:
      "Performance, stage management, set and lighting concepts, spatial storytelling, and theatre work as game-space thinking.",
    note: "Stage photos live in a compact automatic screen for now. Cue sheets, light plots, and process documentation can be added when those assets arrive.",
    buckets: [
      { title: "Production", meta: "stage / rehearsal / cue", copy: "The practical systems that make a live event hold together." },
      { title: "Space", meta: "set / light / movement", copy: "How bodies, objects, and light teach an audience where to look." },
      { title: "Documentation", meta: "photo / note / archive", copy: "Images and records that preserve work after the performance disappears." },
    ],
    imageSlots: ["stage photo", "cue sheet", "set sketch", "lighting test"],
    mediaItems: theatreStageMedia,
  },
  {
    slug: "making",
    title: "Making",
    cn: "制作",
    code: "MATERIAL_LOG",
    color: "var(--lime)",
    accent: "var(--pink)",
    textColor: "var(--orange)",
    intro:
      "Physical work: interior experiments, sewing, laser cutting, woodworking, objects, models, and tactile systems.",
    note: "Add build photos, measurements, material tests, object images.",
    buckets: [
      { title: "Objects", meta: "wood / fabric / model", copy: "Things designed for hands, rooms, and bodies." },
      { title: "Fabrication", meta: "laser / cut / assembly", copy: "Process-heavy work where precision and mess meet." },
      { title: "Interior", meta: "room / atmosphere / function", copy: "Spatial experiments with mood, use, and arrangement." },
    ],
    imageSlots: ["object photo", "material test", "tool/process", "finished space"],
  },
  {
    slug: "writing",
    title: "Writing",
    cn: "写作",
    code: "TEXT_ENGINE",
    color: "#002FA7",
    accent: "#002FA7",
    textColor: "var(--lime)",
    intro:
      "Fiction, poems, essays, scripts, game writing, and fragments where the voice comes forward without needing images.",
    note: "Add excerpts first. Longer pieces can become reader pages later.",
    buckets: [
      { title: "Fiction", meta: "scene / voice / world", copy: "Short pieces and excerpts with atmosphere and character." },
      { title: "Game Writing", meta: "dialogue / system / lore", copy: "Text that supports mechanics, rooms, inventory, and choices." },
      { title: "Essays", meta: "reflection / research / process", copy: "Thinking about art, games, theatre, images, and making." },
    ],
    imageSlots: ["excerpt", "script page", "notes", "reader cover"],
  },
];

export function getPortfolioSection(slug: string) {
  return portfolioSections.find((section) => section.slug === slug);
}
