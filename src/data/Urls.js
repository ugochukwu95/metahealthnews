import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost";
const port = 3500;

export const RestUrls = {
	[DataTypes.ARTICLES]: `${protocol}://${hostname}:${port}/api/articles`,
	[DataTypes.SOCKET_DATA]: `${protocol}://${hostname}:${port}/api/articles/socket`,
	[DataTypes.ARTICLE]: `${protocol}://${hostname}:${port}/api/article`,
	[DataTypes.CURRENT_LOCATION]: `${protocol}://${hostname}:${port}/api/getlocation`,
	[DataTypes.TRENDS]: `${protocol}://${hostname}:${port}/api/trends`,
	[DataTypes.ARTICLES_SEARCH_RESULTS]: `${protocol}://${hostname}:${port}/api/articles/search`,
	[DataTypes.CANCER]: `${protocol}://${hostname}:${port}/api/articles/search`,
	[DataTypes.DIABETES]: `${protocol}://${hostname}:${port}/api/articles/search`,
	[DataTypes.HEART_DISEASE]: `${protocol}://${hostname}:${port}/api/articles/search`,
	[DataTypes.WEATHER]: `${protocol}://${hostname}:${port}/api/getWeather`,
	[DataTypes.SAVED_ARTICLES_ID]: `${protocol}://${hostname}:${port}/api/articles/save`,
	[DataTypes.SAVED_ARTICLES]: `${protocol}://${hostname}:${port}/api/articles/save`,
	[DataTypes.BAN_SOURCE]: `${protocol}://${hostname}:${port}/api/articles/hide`, 
	[DataTypes.BANNED_SOURCES]: `${protocol}://${hostname}:${port}/api/articles/hide`,
	[DataTypes.COMMENTS]: `${protocol}://${hostname}:${port}/api/comments`,
	[DataTypes.REPLIES]: `${protocol}://${hostname}:${port}/api/replies`,
	[DataTypes.COMMENTS_LIKE]: `${protocol}://${hostname}:${port}/api/comments/like`,
	[DataTypes.COMMENTS_DISLIKE]: `${protocol}://${hostname}:${port}/api/comments/dislike`,
	[DataTypes.REPLIES_LIKE]: `${protocol}://${hostname}:${port}/api/replies/like`,
	[DataTypes.REPLIES_DISLIKE]: `${protocol}://${hostname}:${port}/api/replies/dislike`,
}