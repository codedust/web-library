'use strict';

const {
	RECEIVE_CREATE_ITEM,
	RECEIVE_DELETE_ITEM,
	RECEIVE_DELETE_ITEMS,
	RECEIVE_ITEMS_IN_COLLECTION,
} = require('../../constants/actions.js');

const itemsByCollection = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_CREATE_ITEM:
			// @TODO:
			return state;
		case RECEIVE_DELETE_ITEM:
			return Object.entries(state).reduce((aggr, [collectionKey, itemKeys]) => {
				aggr[collectionKey] = itemKeys.filter(k => k !== action.item.key)
				return aggr;
			}, {});
		case RECEIVE_DELETE_ITEMS:
			return Object.entries(state).reduce((aggr, [collectionKey, itemKeys]) => {
				aggr[collectionKey] = itemKeys.filter(k => !action.itemKeys.includes(k))
				return aggr;
			}, {});
		case RECEIVE_ITEMS_IN_COLLECTION:
			return {
				...state,
				[action.collectionKey]: action.items.map(item => item.key)
			};
		default:
			return state;
	}
};

module.exports = itemsByCollection;