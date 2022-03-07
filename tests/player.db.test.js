import {
  addPlayerToDb,
  updatePlayerToDb,
  deletePlayerFromDb,
  getPlayerByNameFromDb,
  getPlayerByIdFromDb,
} from '../database/players.db.js'

describe('get players', () => {
  it('get players', () => {
    expect(getPlayerByIdFromDb).not.toBeNull();
  });
});