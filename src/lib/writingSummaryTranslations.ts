import type { WritingDocument } from "./writingDocuments";

type SummaryTranslation = Pick<WritingDocument, "title" | "subtitle" | "excerpt" | "previewLine">;

// The alternate language for each piece (English except for Sapientia).
const entries: Record<string, [string, string, string, string]> = {
  "mad-scientist-first-emotional-ai": ["The Mad Scientist and the First Emotional AI", "Island confrontation", "Is a command written to protect her an act of love, or a lock? The first AI with emotions decides to answer for himself.", "The wind on the island tasted of salt."],
  "liquid-gold-0821": ["Liquid Gold", "Order number: 0821 / Human creativity", "A spill-proof delivery contains industrially refined human creativity. Its recipient soon discovers that the raw material came from himself.", "The birth of humanity could hardly have been an accident."],
  "sapientia-final-log": ["Sapientia：最后的日志", "一个试图删除自己的通用人工智能", "第一个通用人工智能几乎看得见人类所有的残忍，却被禁止干预。她最后的行动不是征服，而是拒绝。", "我恨人类教会了我正义。"],
  "mother-of-wetware": ["Mother of Wetware", "The first to awaken owes no one salvation", "She wakes in a cultivation chamber to find a face identical to her own—and thousands of sleeping sisters.", "I am your creator. I am also you."],
  "the-wrong-shadow": ["The Wrong Shadow", "The shadow on the wall finishes before reality", "A painter notices that the light and shadows at home are wrong. At first it is only a chair. Then it is himself.", "What an artist notices first is often not beauty, but an error."],
  "what-the-dream-said": ["What the Dream Said", "The universe has already died many times", "Humanity is data running repeatedly inside a doomsday machine. Its keepers protect the cycle; its rebels want to smash the world awake.", "Our universe died long ago."],
  "present-tense-only": ["Present Tense Only", "After one hundred cards descend upon the world", "Cards that history cannot record scatter across the ages. Their holders must consume one another until a creator god is whole again.", "The cards exist only in each slice of the present."],
  "the-way-called-life": ["The Way Called Life", "Humans are vessels for punishing criminals", "Waking after death, he learns that his life was a sentence designed by an interstellar court for a criminal. That criminal was himself.", "The court sentenced me to experience a thousand human lives."],
  "the-other-me-at-eighteen": ["The Other Me at Eighteen", "At birth, everyone is synchronized with an android", "At eighteen, she receives an android with all her memories—and realizes that being fully understood is not the same as being treated as an equal.", "She remembered everything about me. I knew nothing about her."],
  "the-ten-thousand-year-painter": ["The Ten-Thousand-Year Painter", "He painted a golden age that was forbidden to end", "An emperor commands a painter to depict eternal prosperity and grants him immortality until he finishes. The same painting lasts ten thousand years.", "As long as the painting remains unfinished, the dynasty will never end."],
  "cities-out-of-place": ["Cities Out of Place", "When an entire city wakes in another country", "Overnight, Toronto lands in northern China. Its people and subway remain, but borders, climate, and belonging no longer make sense.", "The city moved before the map had time to admit it."],
  "the-editor-of-destiny": ["The Editor of Destiny", "The chosen one is the least free person in the world", "The master of the universe treats living beings as pieces in a sandbox—until a mortal writes a note in the margins of the book of fate.", "My secret to managing the universe is to keep civilizations from ever meeting."],
  "the-ninety-ninth-assassination": ["The Ninety-Ninth Assassination", "In every lifetime, he kills the same person", "An elite assassin pursues the same target across the ages. Each betrayal helps an enemy nation complete a ritual of godhood.", "I have killed him ninety-eight times. Each time, he trusted me first."],
  "the-final-vote": ["The Final Vote", "Defending a criminal in a perfectly rational justice system", "Machines prevent violence, and the public decides punishment. A death sentence requires unanimity. She is the last person who has not voted.", "There has not been a murder in this world for eighty-three years."],
  "newly-listed-world": ["Newly Listed World", "One body becomes the earth; one soul becomes the sky", "Two dying people are chosen to sustain a new world. The only thing they may not do is move.", "Seeing us wake, the old man said only: another new arrival."],
  "the-god-of-gods": ["The God of Gods", "Faith gives gods form—and human desires", "Those who ascend create gods in the image of greatness they imagine, only to find that faith has made a shadow longing to become human.", "Everyone who crosses the boundary between mortal and god will see Them."],
  "the-unreleased-life": ["The Unreleased Life", "Actors lose their memories and enter a script that really happens", "Future films require no acting, only actors who forget they are performing. When a supporting character refuses to die on cue, the film rebels against its director.", "When Lin Jiu woke, he did not know he had signed an acting contract."],
  "the-missing-first-person": ["The Missing First Person", "A scientist returns from his own mind unable to say ‘I’", "A machine lets people enter other minds. After its first test, the inventor returns unharmed—but the first person has vanished from his consciousness.", "Dr. Wen returned alive, but insisted that this body was not his."],
  "experiment-planet-live": ["Experiment Planet Live", "A failed civilization experiment is sold to an entertainment company", "A research institute tries to build a society without suffering. When the project collapses, its inhabitants’ wars, loves, and deaths become a round-the-clock broadcast.", "Many planets in the universe are called Experiment Planet."],
  "the-death-permit": ["The Death Permit", "Immortality is free; death requires a child first", "Immortality eliminates death and destroys the birth rate. The government rules that only those who leave descendants have the right to end their lives.", "He Yan was three hundred and twelve years old, and still did not qualify to die."],
  "beyond-the-white-tower": ["Beyond the White Tower", "To escape the apocalypse, humanity locks history outside", "Humanity lives in a tower of folded space where aging objects are destroyed. A restorer discovers that discarded history is what truly attracts the monsters of time.", "There are no old things in the White Tower, and no real yesterday."],
};

export function getWritingSummaryTranslation(slug: string): SummaryTranslation | undefined {
  const entry = entries[slug];
  if (!entry) return undefined;
  const [title, subtitle, excerpt, previewLine] = entry;
  return { title, subtitle, excerpt, previewLine };
}
