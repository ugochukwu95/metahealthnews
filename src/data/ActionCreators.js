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