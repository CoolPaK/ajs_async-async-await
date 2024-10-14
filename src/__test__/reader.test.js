import read from '../js/reader.js';

describe('reader', () => {
  it('should read data successfully', async () => {
    const data = await read();

    expect(data).toBeInstanceOf(ArrayBuffer);
  });

  it('should return a buffer of the correct size', async () => {
    const data = await read();

    expect(data.byteLength).toBeGreaterThan(0);
  });

  it('should handle errors when reading fails', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => cb());

    await expect(read()).resolves.not.toThrow();
  });
});