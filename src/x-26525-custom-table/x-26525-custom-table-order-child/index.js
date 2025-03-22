import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import styles from './styles.scss';

const view = (state, {updateState,dispatch}) => {
	//var title = state.properties.title;
	const {properties:{orderKey}} = state;
	const {properties:{orderType}} = state;
	const {properties:{curtfield}} = state;
	const asorder = ()=>{
		dispatch("ORDER_FILTER",{orderField:orderKey,orderFieldType:'ac'});
	}
	const desorder =()=>{
		dispatch("ORDER_FILTER",{orderField:orderKey,orderFieldType:'dc'});
	}
	return (
	<div>
		<span className={"sortorder descending "+(orderKey == curtfield && orderType =='dc'?'activeorder':'')} on-click={desorder}></span>
		<span className={"sortorder "+(orderKey == curtfield && orderType =='ac'?'activeorder':'')} on-click={asorder}></span>
	</div>
);
}

createCustomElement('x-26525-custom-table-order-child', {
	renderer: {type: snabbdom},
	view,
	styles, properties:{"orderKey":{default:'number'},"curtfield":{default:'number'},"orderType":{default:'ac'}}
});
