import { DataTypes } from "./Types";

/*const protocol = "http";
const hostname = "localhost";
const port = 3500;*/

export const RestUrls = {
	[DataTypes.ARTICLES]: `/api/articles`,
	[DataTypes.CURRENT_LOCATION]: `/api/getlocation`,
	[DataTypes.TRENDS]: `/api/trends`,
	[DataTypes.ARTICLES_SEARCH_RESULTS]: `/api/articles/search`,
	[DataTypes.CANCER]: `/api/articles/search`,
	[DataTypes.DIABETES]: `/api/articles/search`,
	[DataTypes.HEART_DISEASE]: `/api/articles/search`,
	[DataTypes.WEATHER]: `/api/getWeather`,
}