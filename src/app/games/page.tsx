import PortfolioSectionPage from "@/components/PortfolioSectionPage";
import GamesShowcase from "@/components/GamesShowcase";
import { getPortfolioSection } from "@/lib/portfolioSections";

export default function GamesPage() {
  return <PortfolioSectionPage section={{ ...getPortfolioSection("games")!, buckets: [] }} feature={<>
    <GamesShowcase />
    <section className="game-module" aria-labelledby="nhsga-testimonial-title">
      <header className="game-module-header">
        <div><span>Carnegie Mellon University / 2025</span><h2 id="nhsga-testimonial-title">National High School Game Academy Testimonial</h2></div>
        <a href="/portfolio-assets/games/Feng_Rong.pdf" target="_blank" rel="noreferrer">open PDF ↗</a>
      </header>
      <div className="game-testimonial-pages" aria-label="National High School Game Academy testimonial for Rong Feng">
        {[1, 2].map(page => <img key={page} src={`/portfolio-assets/games/testimonial/page-${page}.jpg`} alt={`Testimonial for Rong Feng, page ${page} of 2. Full text available in the linked PDF.`} width={1237} height={1600} loading="lazy" />)}
      </div>
      <a href="/portfolio-assets/games/Feng_Rong.pdf" download>download testimonial PDF ↓</a>
    </section>
  </>} />;
}
