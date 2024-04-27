const { updateVideoPlaybackStatus } = require('./index');

describe('updateVideoPlaybackStatus', () => {
  it('should emit the videoPlaybackStatus event to the specified room', () => {
    const status = {
      currentTime: 100,
      isPlaying: true,
      volume: 0.8,
      paused: false,
    };
    const socket = {
      emit: jest.fn(),
    };
    const roomId = 'room1';

    updateVideoPlaybackStatus(status, socket, roomId);

    expect(socket.emit).toHaveBeenCalledWith('videoPlaybackStatus', status);
  });
});