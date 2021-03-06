'use strict';

import React from 'react';
import { connect } from 'react-redux';

import MoveCollectionsModal from '../../component/modal/move-collections';
import withDevice from '../../enhancers/with-device';
import withSelectMode from '../../enhancers/with-select-mode';
import { MOVE_COLLECTION } from '../../constants/modals';
import { get } from '../../utils';
import { toggleModal, updateCollection, fetchCollections } from '../../actions';

class MoveCollectionsModalContainer extends React.PureComponent {
	render() {
		return <MoveCollectionsModal { ...this.props } />;
	}
}

const mapStateToProps = state => {
	const isOpen = state.modal.id === MOVE_COLLECTION;
	const { userLibraryKey } = state.current;
	const { collectionKey, libraryKey } = state.modal;
	const librariesWithCollectionsFetching = state.fetching.collectionsInLibrary;
	const collectionCountByLibrary = state.collectionCountByLibrary;
	const groups = state.groups;
	const library = state.config.libraries.find(l => l.key === libraryKey);
	const libraries = library ? [library] : [];
	const collections = libraries.reduce((aggr, library) => {
		aggr[library.key] = Object.values(
			get(state, ['libraries', library.key, 'collections'], {})
		);
		return aggr;
	}, {});

	return { collectionKey, libraries, libraryKey, isOpen, collections, userLibraryKey,
		groups, librariesWithCollectionsFetching, collectionCountByLibrary };
};


export default withSelectMode(withDevice(connect(
	mapStateToProps,
	{ fetchCollections, updateCollection, toggleModal }
)(MoveCollectionsModalContainer)));
