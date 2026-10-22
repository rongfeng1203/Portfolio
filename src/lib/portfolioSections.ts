import digitalCategoryMedia from "./digitalMedia.json";
import photographyCategoryMedia from "./photographyMedia.json";
import visualCategoryMedia from "./visualMedia.json";
import theatreMedia from "./theatreMedia.json";

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
    copyEmphasis?: string;
    href?: string;
    previewItems?: MediaItem[];
    digitalCategory?: DigitalCategory;
    visualCategory?: VisualCategory;
    theatreCategory?: TheatreCategory;
    mediaCategory?: "stage" | "scenery" | "humans" | "sketchbook";
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

export type PhotographyCategory = keyof typeof photographyCategoryMedia;

export function getPhotographyCategoryMedia(category: PhotographyCategory): MediaItem[] {
  return photographyCategoryMedia[category] as MediaItem[];
}

const photographyMedia = [
  ...getPhotographyCategoryMedia("stage"),
  ...getPhotographyCategoryMedia("scenery"),
  ...getPhotographyCategoryMedia("humans"),
];

export type VisualCategory = keyof typeof visualCategoryMedia;

export function getVisualCategoryMedia(category: VisualCategory): MediaItem[] {
  return visualCategoryMedia[category] as MediaItem[];
}

const visualMedia = [
  ...getVisualCategoryMedia("ideation"),
  ...getVisualCategoryMedia("charcoal"),
  ...getVisualCategoryMedia("colors"),
];

export type DigitalCategory = keyof typeof digitalCategoryMedia;
export function getDigitalCategoryMedia(category: DigitalCategory): MediaItem[] {
  return digitalCategoryMedia[category] as MediaItem[];
}
const digitalMedia = Object.values(digitalCategoryMedia).flat() as MediaItem[];

export type TheatreCategory = keyof typeof theatreMedia;

export function getTheatreCategoryMedia(category: TheatreCategory): MediaItem[] {
  return theatreMedia[category] as MediaItem[];
}

const theatreStageMedia = [
  ...getTheatreCategoryMedia("dirtywork"),
  ...getTheatreCategoryMedia("paperwork"),
  ...getTheatreCategoryMedia("photos"),
  ...getPhotographyCategoryMedia("stage"),
];

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
      "My Prototypes, some Unity immersive media and Web games. Experienced it from both the code and art side of things.",
    note: "More projects to be updated",
    buckets: [
      { title: "Play", meta: "unity / web / interactive", copy: "Playable prototypes and experiments.", href: "/games/play" },
      { title: "Releases", meta: "itch.io / steam", copy: "Find the games and explore their worlds.", href: "/games/releases", previewItems: [
        { src: "/portfolio-assets/games/domain-echoing.webp", type: "image", title: "Domain Echoing", meta: "GAME" },
        { src: "/portfolio-assets/games/pentamania.png", type: "image", title: "Pentamania", meta: "GAME" },
      ] },
      { title: "Demos", meta: "gameplay / presentations", copy: "Project demos and the stories behind the games.", href: "/games/demos" },
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
      "Here's my photography archive. Sorta grouped in to candids, school activities and theatre shots.",
    note: "Current photography assets are loaded as a living photo wall. Series labels can be added once the archive is sorted.",
    buckets: [
      { title: "Theatre", meta: "theatre / rehearsal / production", copy: "A living record of months of heart and sweat for one great performance.", href: "/photography/stage", mediaCategory: "stage" },
      { title: "Landscape", meta: "place / texture / surface", copy: "I love environment, can't you tell?", href: "/photography/scenery", mediaCategory: "scenery" },
      { title: "Humans", meta: "people / character / quiet", copy: "NGL I never clip people", copyEmphasis: "never", href: "/photography/humans", mediaCategory: "humans" },
    ],
    imageSlots: ["series cover", "masonry image", "contact sheet", "detail crop"],
    mediaItems: photographyMedia,
  },
  {
    slug: "visual",
    title: "Visual Art",
    cn: "画画",
    code: "SCAN_POSTER",
    color: "var(--pink)",
    accent: "var(--orange)",
    textColor: "var(--orange)",
    intro:
      "Illustration, drawing, printmaking, acrylic, graphic collages, sketches, watercolor, charcoal, named it all and I tried it --- except oil painting.",
    note: "Current visual-art assets are loaded. Add more scans, posters, and process images when the folder grows.",
    buckets: [
      { title: "Ideation", meta: "print / collage / material", copy: "Like I get the craze but I don’t.", href: "/visual/ideation", visualCategory: "ideation" },
      { title: "Colors", meta: "acrylic / watercolor / color", copy: "My favorite medium no question.", href: "/visual/colors", visualCategory: "colors" },
      { title: "Charcoal", meta: "charcoal / drawing / study", copy: "", href: "/visual/charcoal", visualCategory: "charcoal" },
    ],
    imageSlots: ["poster", "illustration", "sketch scan", "detail"],
    mediaItems: visualMedia,
  },
  {
    slug: "digital",
    title: "Digital Arts",
    cn: "媒体艺术",
    code: "MOTION_BUFFER",
    color: "var(--lime)",
    accent: "var(--orange)",
    textColor: "var(--orange)",
    intro:
      "Animations, graphic design, some failed yearbook covers, a bit of blender renders and to be coming: a projected installation.",
    note: "Current digital-media assets are loaded, including collage/surreal stills and one motion piece.",
    buckets: [
      { title: "Videos", meta: "video / loop / edit", copy: "Moving images.", href: "/digital/videos", digitalCategory: "videos" },
      { title: "Graphics", meta: "design / collage / composition", copy: "I love compositions. Satisfying.", href: "/digital/graphics", digitalCategory: "graphics" },
      { title: "Concept", meta: "blender / modeling / render", copy: "I know I gotta work on 3D modeling skills ahhhhh.", href: "/digital/concept", digitalCategory: "concept" },
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
      "Performances, stage management, set and lighting concepts, and all the dirty work (literally) I have done for theatre.",
    note: "Stage photos live in a compact automatic screen for now. Cue sheets, light plots, and process documentation can be added when those assets arrive.",
    buckets: [
      { title: "Dirty Work", meta: "", copy: "", href: "/theatre/dirtywork", theatreCategory: "dirtywork" },
      { title: "Paperwork", meta: "", copy: "", href: "/theatre/paperwork", theatreCategory: "paperwork" },
      { title: "Photos", meta: "", copy: "", href: "/theatre/photos", theatreCategory: "photos" },
    ],
    imageSlots: ["stage photo", "cue sheet", "set sketch", "lighting test"],
    mediaItems: theatreStageMedia,
  },
  {
    slug: "making",
    title: "Tech Design",
    cn: "制作",
    code: "MATERIAL_LOG",
    color: "var(--lime)",
    accent: "var(--pink)",
    textColor: "var(--orange)",
    intro:
      "Physical work: interior experiments, sewing, laser cutting, woodworking, objects, models, and tactile systems.",
    note: "Add build photos, measurements, material tests, object images.",
    buckets: [
      { title: "Objects", meta: "textiles / fashion / food", copy: "Things designed for hands and bodies.", href: "/making/objects" },
      { title: "Fabrication", meta: "laser / wood / assembly", copy: "Material tests, iterations, and finished builds.", href: "/making/fabrication" },
      { title: "Product", meta: "research / platform / pitch", copy: "From a problem to a product proposal.", href: "/making/product" },
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
      { title: "中文", meta: "fiction / worlds / characters", copy: "Stories in Chinese.", href: "/writing/collections/chinese" },
      { title: "English", meta: "fiction / voice / experiment", copy: "Stories in English.", href: "/writing/collections/english" },
      { title: "Drafts", meta: "notes / ideas / in progress", copy: "The working notebook behind the stories.", href: "/writing/collections/drafts" },
    ],
    imageSlots: ["excerpt", "script page", "notes", "reader cover"],
  },
];

export function getPortfolioSection(slug: string) {
  return portfolioSections.find((section) => section.slug === slug);
}
