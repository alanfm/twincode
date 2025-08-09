export default function BadgePosition({position}) {
    return (
        <span className={`badge ${position === 'initial' ? 'badge-cyan' : 'badge-teal'}`}>
            {position === 'initial' ? 'Inicial' : 'Final'}
        </span>
    );
}
