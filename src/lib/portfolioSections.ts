export type PortfolioSection = {
  slug: string;
  title: string;
  cn: string;
  code: string;
  color: string;
  accent: string;
  intro: string;
  note: string;
  buckets: Array<{
    title: string;
    meta: string;
    copy: string;
  }>;
  imageSlots: string[];
};

export const portfolioSections: PortfolioSection[] = [
  {
    slug: "games",
    title: "Games",
    cn: "游戏",
    code: "PLAYABLE_SYSTEMS",
    color: "var(--lime)",
    accent: "#002FA7",
    intro:
      "Playable prototypes, Unity scenes, small web experiments, and design studies. This page is the main application-facing archive for systems, level design, and interaction.",
    note: "Add builds, gameplay captures, itch links, Unity clips, process diagrams.",
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
    cn: "摄影",
    code: "CONTACT_SHEETS",
    color: "var(--violet)",
    accent: "var(--lime)",
    intro:
      "Series-based photo archive for portraits, street fragments, theatre documentation, backstage images, and visual research.",
    note: "Add image folders by series. PixelCard/photo decrypt can live here later.",
    buckets: [
      { title: "Backstage", meta: "theatre / rehearsal / production", copy: "A living record of people, light, waiting, and the machinery around performance." },
      { title: "Portraits", meta: "people / character / quiet", copy: "Images built around presence, styling, and small emotional clues." },
      { title: "Street", meta: "found / texture / motion", copy: "Fast fragments, accidental compositions, and city surfaces." },
    ],
    imageSlots: ["series cover", "masonry image", "contact sheet", "detail crop"],
  },
  {
    slug: "visual",
    title: "Visual Art",
    cn: "视觉",
    code: "SCAN_POSTER",
    color: "var(--pink)",
    accent: "var(--orange)",
    intro:
      "Illustration, drawing, painting, graphic experiments, posters, and visual systems that feel scanned, printed, handled, and remixed.",
    note: "Add Illustrator exports, paintings, sketchbook scans, posters.",
    buckets: [
      { title: "Illustration", meta: "digital / character / composition", copy: "Finished works and studies with a clear visual voice." },
      { title: "Poster Systems", meta: "type / collage / riso", copy: "Graphic work where text, hierarchy, and texture carry the idea." },
      { title: "Sketchbook", meta: "process / material / scan", copy: "Raw pages that show how the finished language is built." },
    ],
    imageSlots: ["poster", "illustration", "sketch scan", "detail"],
  },
  {
    slug: "digital",
    title: "Digital",
    cn: "影像",
    code: "MOTION_BUFFER",
    color: "var(--orange)",
    accent: "var(--violet)",
    intro:
      "Motion loops, video, shader experiments, screen-based images, interactive tests, and pieces that should not sit still.",
    note: "Add video stills, GIFs, shader captures, media experiments.",
    buckets: [
      { title: "Motion", meta: "video / loop / edit", copy: "Moving-image pieces with rhythm, cut, and atmosphere." },
      { title: "Shader Tests", meta: "webgl / dither / glitch", copy: "Small technical experiments that can become visual systems." },
      { title: "Screen Images", meta: "digital / composite / texture", copy: "Still images made for a monitor rather than a wall." },
    ],
    imageSlots: ["video still", "shader capture", "loop preview", "process frame"],
  },
  {
    slug: "theatre",
    title: "Theatre",
    cn: "剧场",
    code: "SPACE_CUE",
    color: "var(--purple)",
    accent: "var(--lime)",
    intro:
      "Performance, stage management, set and lighting concepts, spatial storytelling, and theatre work as game-space thinking.",
    note: "Add production photos, cue sheets, light plots, stage/process documentation.",
    buckets: [
      { title: "Production", meta: "stage / rehearsal / cue", copy: "The practical systems that make a live event hold together." },
      { title: "Space", meta: "set / light / movement", copy: "How bodies, objects, and light teach an audience where to look." },
      { title: "Documentation", meta: "photo / note / archive", copy: "Images and records that preserve work after the performance disappears." },
    ],
    imageSlots: ["stage photo", "cue sheet", "set sketch", "lighting test"],
  },
  {
    slug: "making",
    title: "Making",
    cn: "制作",
    code: "MATERIAL_LOG",
    color: "var(--lime)",
    accent: "var(--pink)",
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
    color: "var(--pink)",
    accent: "#002FA7",
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
