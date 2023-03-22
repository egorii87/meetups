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
    const result = await createNewsArticle(news);
    this.news.push(result);
    return result;
  }

  @action.bound
  async update(news: News) {
    return await updateNewsArticle(news);
  }

  @action.bound
  async remove(id: string) {
    const result = await deleteNewsArticle(id);
    if (result) {
      localStorage.removeItem(id);
      this.news = this.news.filter((news) => news.id !== id);
    }
    return result;
  }

  constructor() {}
}

export const newsStore = new NewsStore();
