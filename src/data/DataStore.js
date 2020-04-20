import { createStore, applyMiddleware } from "redux";
import { ArticleReducer } from "./ArticleReducer";
import { asyncActions } from "./AsyncMiddleware";

export const HealthFromUgoDataStore = createStore(ArticleReducer, applyMiddleware(asyncActions));