export const Actions = {
  DOCK_BUTTON_PRESSED: 'DOCK_BUTTON_PRESSED',
  TEST_ACTION: 'TEST_ACTION',
  CART_ITEM_ADDED: 'CART_ITEM_ADDED',
  CART_ITEM_REMOVED: 'CART_ITEM_REMOVED'
};

export function uiReducer(state = {items:[]}, action) {
    console.log('uiReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case Actions.DOCK_BUTTON_PRESSED:
          state = {
            ...state
          }
          state.isOpened = !state.isOpened;
          return state;
        case Actions.CART_ITEM_ADDED:
          state = {
            ...state
          }

          console.log(action);
          state.items.push(action.item);
          return state;
        case Actions.CART_ITEM_REMOVED:
          return state;
        case Actions.TEST_ACTION:
          console.log('asdd');
          return state;
          break;
        // etc.
        default:
          return state;
    }
}
