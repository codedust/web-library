'use strict';

import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { UserContext, ViewportContext } from '../context';


const withDevice = Component => {
	const C = props => (
		<UserContext.Consumer>
		{ ({ userType, isKeyboardUser, isMouseUser, isTouchUser, scrollbarWidth }) => (
		<ViewportContext.Consumer>
		{ viewport => {
			const isTouchOrSmall = userType === 'touch' || viewport.xxs || viewport.xs || viewport.sm;
			const shouldUseEditMode = isTouchOrSmall;
			const shouldUseModalCreatorField = isTouchOrSmall;
			const shouldUseTabs = viewport.md || (viewport.lg && userType != 'touch');
			const isSingleColumn = viewport.xxs || viewport.xs;
			const device = {
				[userType]: true,
				isKeyboardUser,
				isMouseUser,
				isSingleColumn,
				isTouchOrSmall,
				isTouchUser,
				scrollbarWidth,
				shouldUseEditMode,
				shouldUseModalCreatorField,
				shouldUseTabs,
				userType,
				viewport,
			}
			return <Component { ...props } device={ device } />
		}}
		</ViewportContext.Consumer>
		)}
		</UserContext.Consumer>
	);

	C.displayName = `withDevice(${Component.displayName || Component.name})`;
	C.WrappedComponent = Component;
	hoistNonReactStatic(C, Component);
	return C;
};

export default withDevice;
