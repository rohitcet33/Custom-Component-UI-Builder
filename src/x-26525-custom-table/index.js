import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import styles from './styles.scss';
import './x-26525-custom-table-order-child';
import './x-26525-custom-table-pagination-child';
import { incidetdemodata } from '../demodata';
const view = (state, {updateState,dispatch}) => {
	//var title = state.properties.title;
	const {properties:{incidentdata}} = state;
	const {orderfield} = state;
	const {odertype} = state;
	const {properties:{maxpage}} = state;
	const {pageIndex} = state;

	const incidentbutton = (rec) =>{
		dispatch("INCIDENT_BUTTON",{data:rec})
	}
	return (
	<div>
		<table id="customers">
		<tr>
		<th>Number <x-26525-custom-table-order-child orderKey="number" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>Caller <x-26525-custom-table-order-child orderKey="caller_id" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>Short Description <x-26525-custom-table-order-child orderKey="short_description" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>State <x-26525-custom-table-order-child orderKey="state" curtfield={orderfield} orderType={odertype}></x-26525-custom-table-order-child></th>
		<th>Action</th>
		</tr>
		{incidentdata.map((rec,index)=>{
			return (
			<tr>
			<td>{rec.number.value}</td>
			<td>{rec.caller_id.displayValue}</td>
			<td>{rec.short_description.value}</td>
			<td>{rec.state.displayValue}</td>
			<td><now-button label="Resolve" variant="primary" on-click={()=>{
				incidentbutton(rec);
			}}/></td>
			</tr>
			)
		})}
		
		</table>
		<x-26525-custom-table-pagination-child></x-26525-custom-table-pagination-child>
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
		},
		"PAGINATION_CUSTOM": (coeffects)=>{
			const pagenewindex = coeffects.action.payload.order == 'right'? parseInt(coeffects.state.pageIndex) + parseInt(coeffects.properties.maxpage):parseInt(coeffects.state.pageIndex) - parseInt(coeffects.properties.maxpage);
			coeffects.updateState({
				pageIndex: pagenewindex
			})
			coeffects.dispatch("PAGINATION_CUSTOM_PARENT",{data:pagenewindex});
		}
	},initialState:{
		"odertype":"ac",
		"orderfield":"number",
		"pageIndex": 0
	},
	styles, properties:{"incidentdata":{default:incidetdemodata},"maxpage":{default:8}}
});
