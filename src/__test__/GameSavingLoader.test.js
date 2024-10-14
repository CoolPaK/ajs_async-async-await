import GameSavingLoader from '../js/GameSavingLoader.js';
import read from '../js/reader.js';
import json from '../js/parser.js';

jest.mock('../js/reader.js');
jest.mock('../js/parser.js');

describe('GameSavingLoader', () => {
  it('should load game saving successfully', async () => {
    const mockData = new ArrayBuffer(42);
    const mockString = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

    read.mockResolvedValue(mockData);
    json.mockResolvedValue(mockString);

    const saving = await GameSavingLoader.load();

    expect(saving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
  });

  it('should handle errors while loading', async () => {
    read.mockRejectedValue(new Error('Read Error'));

    await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка загрузки: Read Error');
  });
});