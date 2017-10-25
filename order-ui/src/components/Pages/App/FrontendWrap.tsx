import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as RouterActions from '../../../actions/RouterActions';

interface FrontendWrapProps {
    children?: any;
}

export class FrontendWrap extends React.Component<FrontendWrapProps, never>{
    constructor(props: FrontendWrapProps) {
        super(props);
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    state: state.Activeuser,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(FrontendWrap);