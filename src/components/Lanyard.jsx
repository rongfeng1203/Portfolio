import './Lanyard.css';

export default function Lanyard(props) {
  const items = props.items || [];
  const activeId = props.activeId;
  const className = props.className || '';

  return (
    <nav className={`lanyard-nav ${className}`} aria-label="Section navigation">
      <div className="lanyard-cord" aria-hidden="true" />
      <div className="lanyard-tags">
        {items.map((item, index) => (
          <a
            key={item.id}
            className={activeId === item.id ? 'lanyard-tag is-active' : 'lanyard-tag'}
            href={`#${item.id}`}
            style={{ '--tag-index': index }}
          >
            <span>{item.id}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
