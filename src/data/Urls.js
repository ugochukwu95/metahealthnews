import { DataTypes } from "./Types";

/*const protocol = "http";
const hostname = "localhost";
const port = 3500;*/

export const RestUrls = {
	[DataTypes.ARTICLES]: `/api/articles`,
	[DataTypes.SOCKET_DATA]: `/api/articles/socket`,
	[DataTypes.ARTICLE]: `/api/article`,
	[DataTypes.CURRENT_LOCATION]: `/api/getlocation`,
	[DataTypes.TRENDS]: `/api/trends`,
	[DataTypes.ARTICLES_SEARCH_RESULTS]: `/api/articles/search`,
	[DataTypes.CANCER]: `/api/articles/search`,
	[DataTypes.DIABETES]: `/api/articles/search`,
	[DataTypes.HEART_DISEASE]: `/api/articles/search`,
	[DataTypes.WEATHER]: `/api/getWeather`,
	[DataTypes.SAVED_ARTICLES_ID]: `/api/articles/save`,
	[DataTypes.SAVED_ARTICLES]: `/api/articles/save`,
	[DataTypes.BAN_SOURCE]: `/api/articles/hide`, 
	[DataTypes.BANNED_SOURCES]: `/api/articles/hide`,
	[DataTypes.COMMENTS]: `/api/comments`,
	[DataTypes.REPLIES]: `/api/replies`,
	[DataTypes.COMMENTS_LIKE]: `/api/comments/like`,
	[DataTypes.COMMENTS_DISLIKE]: `/api/comments/dislike`,
	[DataTypes.REPLIES_LIKE]: `/api/replies/like`,
	[DataTypes.REPLIES_DISLIKE]: `/api/replies/dislike`,
}