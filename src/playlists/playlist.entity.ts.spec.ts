import { Playlist } from './playlist.entity.js';

describe('PlaylistEntityTs', () => {
  it('should be defined', () => {
    expect(new Playlist()).toBeDefined();
  });
});
