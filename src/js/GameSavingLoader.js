import json from './parser.js';
import read from './reader.js';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonString = await json(data);
      return JSON.parse(jsonString);
    } catch (error) {
      throw new Error('Ошибка загрузки: ' + error.message);
    }
  }
}