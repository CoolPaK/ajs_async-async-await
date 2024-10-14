import GameSavingLoader from '../js/GameSavingLoader.js';

jest.mock('../js/parser.js');
jest.mock('../js/reader.js');

describe('GameSavingLoader', () => {
  it('should load game saving successfully', async () => {
    const mockData = new ArrayBuffer(39);
    const mockString = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

    require('../js/reader').default.mockResolvedValue(mockData);
    require('../js/parser').default.mockResolvedValue(mockString);

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

  it('should handle errors during loading', async () => {
    require('../js/reader').default.mockRejectedValue(new Error('Load Error'));

    await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка загрузки: Load Error');
  });
});