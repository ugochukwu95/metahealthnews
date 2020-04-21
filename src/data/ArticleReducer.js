import {ActionTypes} from "./Types";

export const ArticleReducer = (storeData, action) => {
	switch(action.type) {
		case ActionTypes.DATA_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}
		case ActionTypes.CLEAR_ARTICLES:
			return {
				...storeData,
				[action.payload.dataType]: null
			}
		case ActionTypes.ARTICLES_FOR_US_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}
		case ActionTypes.ARTICLES_FOR_UK_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}
		case ActionTypes.LOCATION_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.WEATHER_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.TRENDS_LOAD:
			if (!action.payload.error) {
				return {
					...storeData,
					[action.payload.dataType]: action.payload.data
				}
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}
		case ActionTypes.SEARCH_RESULTS_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		case ActionTypes.CANCER_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		case ActionTypes.DIABETES_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		case ActionTypes.HEART_DISEASE_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		default:
			return storeData || {};
	}
}