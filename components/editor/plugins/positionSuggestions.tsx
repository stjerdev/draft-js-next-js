const positionSuggestions = ({ state, props }) => {
  let transform
  let transition

  if (state.isActive && props.suggestions.length > 0) {
    transform = "scaleY(1)"
    transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)"
  } else if (state.isActive) {
    transform = "scaleY(0)"
    transition = "all 0.25s cubic-bezier(.3,1,.2,1)"
  }

  return {
    transform,
    transition,
  }
}

export default positionSuggestions
