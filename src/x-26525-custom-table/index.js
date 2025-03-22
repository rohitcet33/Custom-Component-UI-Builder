import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import styles from './styles.scss';
import './x-26525-custom-table-order-child';

const view = (state, {updateState,dispatch}) => {
	//var title = state.properties.title;
	const {properties:{incidentdata}} = state;
	const {orderfield} = state;
	const {odertype} = state;
	const incidentbutton = (rec) =>{
		dispatch("INCIDENT_BUTTON",{data:rec})
	}
	return (
	<div>
		<table id="customers">
		<tr>
		<th>Number <x-26525-custom-table-order-child orderKey="number" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>Short Description <x-26525-custom-table-order-child orderKey="short_description" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>State <x-26525-custom-table-order-child orderKey="state" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>Action</th>
		</tr>
		{incidentdata.map((rec,index)=>{
			return (
			<tr>
			<td>{rec.number.value}</td>
			<td>{rec.short_description.value}</td>
			<td>{rec.state.displayValue}</td>
			<td><now-button label="Resolve" variant="primary" on-click={()=>{
				incidentbutton(rec);
			}}/></td>
			</tr>
			)
		})}
		
		</table>
	</div>
);
}

createCustomElement('x-26525-custom-table', {
	renderer: {type: snabbdom},
	view,actionHandlers:{
		"ORDER_FILTER":(coeffects)=>{
			//console.log(JSON.stringify(coeffects.action.payload));
			coeffects.updateState({
				odertype: coeffects.action.payload.orderFieldType,
				orderfield: coeffects.action.payload.orderField
			});
			coeffects.dispatch("ORDER_FILTER_PARENT",{odertype: coeffects.action.payload.orderFieldType,
				orderfield: coeffects.action.payload.orderField});
		}
	},initialState:{
		"odertype":"ac",
		"orderfield":"number"
	},
	styles, properties:{"incidentdata":{default:[{"_row_data":{"displayValue":"INC0000060","uniqueValue":"1c741bd70b2322007518478d83673af3"},"short_description":{"value":"demo","displayValue":"demo"},"number":{"value":"INC0000060","displayValue":"INC0000060"},"state":{"value":"7","displayValue":"Closed"}}]}}
});
