'use strict';

import React from 'react';
import cx from 'classnames';

export default class TagSelector extends React.Component {
	render() {
		return (
			<div className="tag-selector">
				<div className="tag-selector-container">
					<ul className="tag-selector-list">
					{
						this.props.tags.map(tag => {
							let className = cx('tag-selector-item', {
								disabled: tag.disabled,
								selected: tag.selected,
								colored: tag.color
							});
							let props = {
								className,
								key: tag.name,
								onClick: ev => this.props.onSelection(tag, ev),
								onContextMenu: ev => this.props.onTagContext(tag, ev)
							};

							if(tag.color) {
								props['style'] = { color: tag.color };
							}

							return (
								<li { ...props }>
									{ tag.name }
								</li>
							);
						})
					}
					</ul>
				</div>
				<div className="tag-selector-filter-container">
					<input 
						type="search"
						value={this.props.searchString}
						onChange={ ev => this.props.onSearch(ev.target.value) }
						className="tag-selector-filter" />
					<button className="tag-selector-actions" onClick={ ev => this.props.onSettings(ev) } />
				</div>
			</div>
		);
	}
}

TagSelector.propTypes = {
	tags: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string,
		selected: React.PropTypes.bool,
		color: React.PropTypes.string,
		disabled: React.PropTypes.bool
	})),
	searchString: React.PropTypes.string,
	shouldFocus: React.PropTypes.bool,
	onSelection: React.PropTypes.func,
	onTagContext: React.PropTypes.func,
	onSearch: React.PropTypes.func,
	onSettings: React.PropTypes.func
};

TagSelector.defaultProps = {
	tags: [],
	searchString: '',
	shouldFocus: false,
	onSelection: () => Promise.resolve(),
	onTagContext: () => Promise.resolve(),
	onSearch: () => Promise.resolve(),
	onSettings: () => Promise.resolve()
};