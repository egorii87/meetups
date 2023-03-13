import { observable, computed, action } from 'mobx';

import { News, NewNews } from 'model';
import {
  getNews,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
} from 'api';

export class NewsStore {
  @observable news: News[] = [];

  @computed get getAllNews() {
    return this.news;
  }

  @action.bound
  async init() {
    this.news = await getNews();
  }

  @action.bound
  async create(news: NewNews) {
    return await createNewsArticle(news);
  }

  @action.bound
  async update(news: News) {
    return await updateNewsArticle(news);
  }

  @action.bound
  async remove(id: string) {
    localStorage.removeItem(id);
    return await deleteNewsArticle(id);
  }

  constructor() {}
}

export const newsStore = new NewsStore();
