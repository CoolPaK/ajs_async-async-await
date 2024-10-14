import GameSavingLoader from './GameSavingLoader.js';

(async () => {
  try {
    const saving = await GameSavingLoader.load();
    console.log(saving); // Вывод сохранённых данных
  } catch (error) {
    console.error('Error loading saving:', error);
  }
})();