export const DataTypes = {
	ARTICLES: "articles",
	TRENDS: "trends",
	CURRENT_LOCATION: "current_location",
	ARTICLES_SEARCH_RESULTS: "articles_search_results",
	WEATHER: "weather",
	ARTICLES_FOR_UK: "articles_for_uk",
	ARTICLES_FOR_US: "articles_for_us",
	CANCER: "cancer",
	DIABETES: "diabetes",
	HEART_DISEASE: "heart_disease",
	SAVED_ARTICLES_ID: "saved_articles_id",
	SAVED_ARTICLES: "saved_articles",
}

export const ActionTypes = {
	DATA_LOAD: "data_load",
	CLEAR_ARTICLES: "clear_articles",
	ARTICLES_FOR_US_LOAD: "articles_for_us_load",
	ARTICLES_FOR_UK_LOAD: "articles_for_uk_load",
	LOCATION_LOAD: "LOCATION_LOAD",
	WEATHER_LOAD: "weather_load",
	TRENDS_LOAD: "trends_load",
	SEARCH_RESULTS_LOAD: "search_results_load",
	CANCER_LOAD: "cancer_load",
	DIABETES_LOAD: "diabetes_load",
	HEART_DISEASE_LOAD: "heart_disease_load",
	SAVE_ARTICLE: "save_article",
	REMOVE_SAVED_ARTICLE: "remove_saved_article",
	SAVED_ARTICLES_LOAD: "saved_articles_load"
}