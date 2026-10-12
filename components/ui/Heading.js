export default function Heading({ eyebrow, title, sub, className = '' }) {
  return (<div className={`reveal ${className}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="h2">{title}</h2>{sub && <p className="sub">{sub}</p>}</div>);
}
