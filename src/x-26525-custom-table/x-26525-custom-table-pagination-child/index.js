import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import styles from './styles.scss';

const view = (state, {updateState,dispatch}) => {
	//var title = state.properties.title;
	const {properties:{orderKey}} = state;
	const {properties:{orderType}} = state;
	const {properties:{curtfield}} = state;
	const rightarrow = ()=>{
		dispatch("PAGINATION_CUSTOM",{order:'right'});
	}
	const leftarrow =()=>{
		dispatch("PAGINATION_CUSTOM",{order:'left'});
	}
	return (
	<div>
		<now-button-iconic icon="arrow-start-fill" variant="primary" bare on-click={leftarrow}/>
		<now-button-iconic icon="arrow-end-fill" variant="primary" bare on-click={rightarrow} />
	</div>
);
}

createCustomElement('x-26525-custom-table-pagination-child', {
	renderer: {type: snabbdom},
	view,
	styles, properties:{"orderKey":{default:'number'},"curtfield":{default:'number'},"orderType":{default:'ac'}}
});
