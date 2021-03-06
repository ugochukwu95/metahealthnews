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

		case ActionTypes.ARTICLE_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data	
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

		case ActionTypes.SAVE_ARTICLE:
			if (!action.payload.data['error']) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]);
				newData.push(action.payload.data);

				return {
					...storeData,
					[action.payload.dataType]: newData
				}
			}
			break;

		case ActionTypes.SAVED_ARTICLES_LOAD:
			if (!action.payload.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			break;

		case ActionTypes.BAN_SOURCE:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.BANNED_SOURCES_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.COMMENTS_LOAD:
			if (action.payload.data && !action.payload.data.error) {
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
					[action.payload.dataType]: {error: action.payload.data.error}
				}
			}

		case ActionTypes.REPLIES_LOAD:
			if (action.payload.data && !action.payload.data.error) {
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
					[action.payload.dataType]: {error: action.payload.data.error}
				}
			}

		case ActionTypes.COMMENTS_LIKE_ACTION:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.COMMENTS_DISLIKE_ACTION:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.REPLIES_LIKE_ACTION:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.REPLIES_DISLIKE_ACTION:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}

		case ActionTypes.CREATE_COMMENT:
			if (action.payload.data && !action.payload.data.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(action.payload.data);
				newData.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, ...storeData[action.payload.dataType]},
				};
				return store;
			}
			break;
			/*return {
				...storeData,
			}*/

		case ActionTypes.DELETE_COMMENT:
			if (action.payload.data && !action.payload.data.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData = newData.filter(item => item._id !== action.payload.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)), ...storeData[action.payload.dataType]},
				};
				return store;
			}
			break;

		case ActionTypes.CREATE_REPLY:
			return {
				...storeData,
			}

		case ActionTypes.UPDATE_COMMENT:
			return {
				...storeData,
			}

		case ActionTypes.UPDATE_REPLY:
			return {
				...storeData,
			}

		case ActionTypes.DELETE_REPLY:
			return {
				...storeData,
			}

		case ActionTypes.DELETE_LIKE_COMMENT:
			return {
				...storeData,
			}

		case ActionTypes.DELETE_DISLIKE_COMMENT:
			return {
				...storeData,
			}

		case ActionTypes.REMOVE_SAVED_ARTICLE:
		default:
			return storeData || {};
	}
}