import { ToMomentFromUnixPipe } from './to-moment-from-unix.pipe';

describe('ToMomentFromUnixPipe', () => {
  it('create an instance', () => {
    const pipe = new ToMomentFromUnixPipe();
    expect(pipe).toBeTruthy();
  });
});
