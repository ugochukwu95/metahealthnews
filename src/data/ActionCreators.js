import {ActionTypes} from "./Types";
//import {data as phData} from "./placeholderData";
import { RestDataSource } from "./RestDataSource";
import CountryData from "../utilities/CountryData";

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => ({
	type: ActionTypes.DATA_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType, 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	/*.catch(err => ({
		dataType,
		error: "Network error. Kindly check your network connection."
	}))*/
});

export const loadArticle = (dataType, params) => ({
	type: ActionTypes.ARTICLE_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType, 
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: "Network error. Kindly check your network connection."}
	}))
});

export const clearArticlesData = (dataType) => ({
	type: ActionTypes.CLEAR_ARTICLES,
	payload: {
		dataType
	}
})

export const loadArticlesForUSData = (dataType, params) => ({
	type: ActionTypes.ARTICLES_FOR_US_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType: 'articles_for_us', 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	/*.catch(err => ({
		dataType,
		error: "Network error. Kindly check your network connection."
	}))*/
});

export const loadArticlesForUKData = (dataType, params) => ({
	type: ActionTypes.ARTICLES_FOR_UK_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType: 'articles_for_uk', 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	/*.catch(err => ({
		dataType,
		error: "Network error. Kindly check your network connection."
	}))*/
});

export const loadLocationData = (dataType) => ({
	type: ActionTypes.LOCATION_LOAD,
	payload: dataSource.GetData(dataType, {}).then(response => {
		let country_name = CountryData.find(obj => obj.code === response.data['country_code'])['value'];

		return {
			dataType,
			data: {"country_code":response.data['country_code'],"country_name":country_name, "city": response.data['city']},
		}
	})
	.catch(err => ({
		dataType,
		data: {"country_code":"US","country_name":"United States", "city": "New York"}
	}))
});

export const loadWeatherData = (dataType, params) => ({
	type: ActionTypes.WEATHER_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
});

export const loadTrendsData = (dataType, params) => ({
	type: ActionTypes.TRENDS_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: response.data
	}))
	.catch(err => ({
		dataType,
		error: "Network Error! Kindly check your internet connection"
	}))
})

export const loadSearchResults = (dataType, params) => ({
	type: ActionTypes.SEARCH_RESULTS_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	/*.catch(err => ({
		dataType,
		error: "Network Error! Kindly check your internet connection"
	}))*/
})

export const loadCancerSearchResults = (dataType, params) => ({
	type: ActionTypes.CANCER_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
})

export const loadDiabetesSearchResults = (dataType, params) => ({
	type: ActionTypes.DIABETES_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
})

export const loadHeartDiseaseSearchResults = (dataType, params) => ({
	type: ActionTypes.HEART_DISEASE_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
})

export const saveArticle = (dataType, params) => ({
	type: ActionTypes.SAVE_ARTICLE,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const removeSavedArticle = (dataType, params) => ({
	type: ActionTypes.REMOVE_SAVED_ARTICLE,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const loadSavedArticles = (dataType, params) => ({
	type: ActionTypes.SAVED_ARTICLES_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const banSource = (dataType, params) => ({
	type: ActionTypes.BAN_SOURCE,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const undoBanSource = (dataType, params) => ({
	type: ActionTypes.BAN_SOURCE,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: {undone: response.data},
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const loadBannedSources = (dataType, params) => ({
	type: ActionTypes.BANNED_SOURCES_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const loadComments = (dataType, params) => ({
	type: ActionTypes.COMMENTS_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const loadReplies = (dataType, params) => ({
	type: ActionTypes.REPLIES_LOAD,
	payload: dataSource.GetData(dataType, params).then(response => ({
		dataType,
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']},
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const createComment = (dataType, params) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const createReply = (dataType, params) => ({
	type: ActionTypes.CREATE_REPLY,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const updateComment = (dataType, params) => ({
	type: ActionTypes.UPDATE_COMMENT,
	payload: dataSource.UpdateData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const updateReply = (dataType, params) => ({
	type: ActionTypes.UPDATE_REPLY,
	payload: dataSource.UpdateData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const deleteComment = (dataType, params) => ({
	type: ActionTypes.DELETE_COMMENT,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const deleteReply = (dataType, params) => ({
	type: ActionTypes.DELETE_REPLY,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const likeComment = (dataType, params) => ({
	type: ActionTypes.COMMENTS_LIKE_ACTION,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const dislikeComment = (dataType, params) => ({
	type: ActionTypes.COMMENTS_DISLIKE_ACTION,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const deleteLikeComment = (dataType, params) => ({
	type: ActionTypes.DELETE_LIKE_COMMENT,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const deleteDislikeComment = (dataType, params) => ({
	type: ActionTypes.DELETE_DISLIKE_COMMENT,
	payload: dataSource.RemoveData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const likeReply = (dataType, params) => ({
	type: ActionTypes.REPLIES_LIKE_ACTION,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

export const dislikeReply = (dataType, params) => ({
	type: ActionTypes.REPLIES_DISLIKE_ACTION,
	payload: dataSource.StoreData(dataType, params).then(response => ({
		dataType,
		data: response.data,
	}))
	.catch(err => ({
		dataType,
		data: {error: err.message}
	}))
})

