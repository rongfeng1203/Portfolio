export type MakingProject = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  year: string;
  discipline: string;
  role: string;
  collaborators?: string;
  description: string;
  tags: string[];
  pageCount: number;
  pageDirectory: string;
  pdfUrl: string;
  accent: string;
};

export const makingProjects: MakingProject[] = [
  {
    id: "arduboy-box",
    code: "MAK_001",
    title: "Arduboy Box",
    subtitle: "Laser-cut enclosure and process portfolio",
    year: "2026",
    discipline: "Fabrication",
    role: "Designer / Maker",
    description:
      "A material study turned finished enclosure: moodboarding, orthographic planning, kerf and living-hinge tests, failed iterations, final assembly, and reflection.",
    tags: ["laser cutting", "living hinge", "kerf testing", "product design"],
    pageCount: 12,
    pageDirectory: "/portfolio-assets/making/arduboy-box",
    pdfUrl: "/portfolio-assets/making/arduboy-box.pdf",
    accent: "#CEDC00",
  },
  {
    id: "bss-aura-forum",
    code: "MAK_002",
    title: "Pitch Deck",
    subtitle: "BSS Aura student platform and technical pitch",
    year: "2026",
    discipline: "Digital Product",
    role: "Co-designer / Developer",
    collaborators: "Keira Kitamura / Yuwa Iduozee",
    description:
      "A verified-yet-anonymous school community platform combining forums, teacher kudos, and context-aware AI support, presented from problem through live demo and architecture.",
    tags: ["web platform", "product pitch", "AI integration", "student systems"],
    pageCount: 15,
    pageDirectory: "/portfolio-assets/making/bss-aura-forum",
    pdfUrl: "/portfolio-assets/making/bss-aura-forum.pdf",
    accent: "#F04E98",
  },
  {
    id: "fashion-design",
    code: "MAK_003",
    title: "Mer-ine Fashion",
    subtitle: "Futurist Little Mermaid costume concept",
    year: "2026",
    discipline: "Fashion Design",
    role: "Designer / Maker",
    description:
      "A costume concept combining The Little Mermaid with a speculative 2077 future through silhouette, color, material, and character studies.",
    tags: ["costume design", "concept art", "fashion", "futurism"],
    pageCount: 5,
    pageDirectory: "/portfolio-assets/making/fashion-design",
    pdfUrl: "/portfolio-assets/making/fashion-design.pdf",
    accent: "#6937FF",
  },
  {
    id: "tote-bag",
    code: "MAK_004",
    title: "Tote Bag",
    subtitle: "Pentamania promotional bag design",
    year: "2026",
    discipline: "Product Design",
    role: "Designer / Maker",
    description:
      "A social-first promotional tote for indie game studio Pentamania, developed through audience research, visual iterations, and production planning.",
    tags: ["textiles", "brand design", "screen printing", "product design"],
    pageCount: 11,
    pageDirectory: "/portfolio-assets/making/tote-bag",
    pdfUrl: "/portfolio-assets/making/tote-bag.pdf",
    accent: "#FF3C91",
  },
  {
    id: "woodworking",
    code: "MAK_005",
    title: "Woodworking Lamp",
    subtitle: "Pyramid-inspired wood lamp study",
    year: "2026",
    discipline: "Woodworking",
    role: "Designer / Maker",
    description:
      "A first woodworking build developed around a simple pyramid structure, material constraints, fabrication, and light.",
    tags: ["woodworking", "lighting", "fabrication", "form study"],
    pageCount: 5,
    pageDirectory: "/portfolio-assets/making/woodworking",
    pdfUrl: "/portfolio-assets/making/woodworking.pdf",
    accent: "#FF8A18",
  },
  {
    id: "chocolate-making",
    code: "MAK_006",
    title: "Magic Chocolate",
    subtitle: "Chocolate concept and making process",
    year: "2026",
    discipline: "Food Design",
    role: "Designer / Maker",
    description:
      "A playful chocolate project developed from audience and concept research through visual identity and hands-on making.",
    tags: ["food design", "concept development", "branding", "making"],
    pageCount: 9,
    pageDirectory: "/portfolio-assets/making/chocolate-making",
    pdfUrl: "/portfolio-assets/making/chocolate-making.pdf",
    accent: "#6DE1E8",
  },
];

export function getMakingPageImage(project: MakingProject, pageIndex: number) {
  return `${project.pageDirectory}/page-${String(pageIndex + 1).padStart(2, "0")}.jpg`;
}
