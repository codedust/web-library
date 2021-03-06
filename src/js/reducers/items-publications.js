'use strict';

import { indexByKey } from '../utils';
import { filterItemKeys, injectExtraItemKeys, populateItemKeys, sortItemKeysOrClear } from '../common/reducers';

import {
    RECEIVE_RECOVER_ITEMS_TRASH,
    RECEIVE_PUBLICATIONS_ITEMS,
    RECEIVE_DELETE_ITEMS,
    RECEIVE_MOVE_ITEMS_TRASH,
    SORT_ITEMS,
} from '../constants/actions.js';

const itemsPublications = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_PUBLICATIONS_ITEMS:
			return populateItemKeys(
				state,
				action.items.map(item => item.key),
				action
			);
		case RECEIVE_DELETE_ITEMS:
		case RECEIVE_MOVE_ITEMS_TRASH:
			return filterItemKeys(state, action.itemKeys);
		case RECEIVE_RECOVER_ITEMS_TRASH:
			return injectExtraItemKeys(
				state,
				action.itemKeys,
				{ ...action.otherItems, ...indexByKey(action.items) }
			);
		case SORT_ITEMS:
			return sortItemKeysOrClear(state, action.items, action.sortBy, action.sortDirection);
		default:
			return state;
	}
};

export default itemsPublications;
