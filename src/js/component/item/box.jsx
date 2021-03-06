'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Creators from '../form/creators';
import BoxField from './boxfield';

class ItemBox extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeEntry: null,
			isDragging: false,
		};
		this.fieldComponents = {};
	}

	focusField(name = 'itemType') {
		if(name in this.fieldComponents) {
			this.fieldComponents[name].focus();
			return true;
		} else {
			return false;
		}
	}

	handleFieldClick(key) {
		const field = this.props.fields.find(f => f.key === key);
		if(!this.props.isForm && field.isReadOnly) {
			return;
		}
		this.setState({ activeEntry: key });
	}

	handleFieldFocus(key) {
		const field = this.props.fields.find(f => f.key === key);

		if(!this.props.isForm && field.isReadOnly) {
			return;
		}
		this.setState({ activeEntry: key });
	}

	handleFieldBlur() {
		this.setState({ activeEntry: null });
	}

	handleCancel(key) {
		if(key === this.state.activeEntry) {
			this.setState({ activeEntry: null });
		}
	}

	handleCommit(key, newValue, isChanged, srcEvent) {
		if(isChanged) {
			this.props.onSave(key, newValue);
		}
		if(key === this.state.activeEntry) {
			this.setState({ activeEntry: null });
		}
		if(this.props.isForm && srcEvent) {
			if(srcEvent.type == 'keydown' && srcEvent.key == 'Enter') {
				srcEvent.target.blur();
			}
		}
	}

	handleDragStatusChange(isDragging) {
		this.setState({ isDragging });
	}

	renderField(field) {
		if(field.key === 'creators') {
			const props = {
				...this.props,
				creatorTypes: this.props.creatorTypes,
				key: field.key,
				name: field.key,
				onDragStatusChange: this.handleDragStatusChange.bind(this),
				onSave: this.handleCommit.bind(this, field.key),
				isReadOnly: field.isReadOnly,
				value: field.value || [],
			}
			return <Creators { ...props } />;
		} else {
			const props = {
				...this.props,
				field,
				key: field.key,
				isActive: this.state.activeEntry === field.key,
				onClick: this.handleFieldClick.bind(this, field.key),
				onFocus: this.handleFieldFocus.bind(this, field.key),
				onBlur: this.handleFieldBlur.bind(this, field.key),
				onCancel: this.handleCancel.bind(this, field.key),
				onCommit: this.handleCommit.bind(this, field.key),
			};
			return <BoxField { ...props } />;
		}
	}

	render() {
		return (
			<ol className={ cx('metadata-list', {
				'dnd-in-progress': this.state.isDragging
			}) }>
				{ this.props.fields.map(this.renderField.bind(this)) }
			</ol>
		);
	}
}

ItemBox.defaultProps = {
	fields: [],
	onSave: v => Promise.resolve(v)
};

ItemBox.propTypes = {
	creatorTypes: PropTypes.array,
	fields: PropTypes.array,
	isForm: PropTypes.bool,
	isLoading: PropTypes.bool,
	onSave: PropTypes.func
};

export default ItemBox;
