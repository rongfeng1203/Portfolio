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
    title: "BSS Aura Forum",
    subtitle: "Student platform and technical pitch",
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
];

export function getMakingPageImage(project: MakingProject, pageIndex: number) {
  return `${project.pageDirectory}/page-${String(pageIndex + 1).padStart(2, "0")}.jpg`;
}
