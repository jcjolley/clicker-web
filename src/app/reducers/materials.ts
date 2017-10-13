const defaultState = {
    wood: 0,
    copper: 0,
    wallHp: 10000
}

export default function materials(state = defaultState, action) {
    switch (action.type) {
        case 'ADD WOOD': 
            return { ...state, wood: state.wood + action.payload }
        case 'ADD COPPER': 
            return { ...state, copper: state.copper + action.payload }
        case 'REPAIR WALL':
            return { ...state, wallHp: state.wallHp + action.payload }
        case 'DAMAGE WALL':
            return { ...state, wallHp: state.wallHp }
        default:
            return state;
    }
}