import Axios from "axios";
import {RestUrls} from "./Urls.js";

export class RestDataSource {
	GetData = (dataType, params) => this.SendRequest("get", RestUrls[dataType], params);

	StoreData = (dataType, data) => this.SendRequest("post", RestUrls[dataType], {}, data);

	RemoveData = (dataType, data) => this.SendRequest("delete", RestUrls[dataType], {}, data);

	SendRequest = (method, url, params, data) => Axios.request({method, url, params, data});
}