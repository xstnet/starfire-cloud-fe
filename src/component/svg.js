const Svg = props => {
    return (
        <svg class={`icon icon-${props.name}`} aria-hidden="true">
            <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
    )
}

export default Svg;