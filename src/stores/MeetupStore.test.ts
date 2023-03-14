import { meetupStore } from './MeetupStore';

describe('Array', () => {
  describe('Promise.all', () => {
    it('Write tests', async () => {
      await meetupStore.init();
      let p1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'one');
      });
      let p2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 'two');
      });
      let p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 3000, 'three');
      });
      const arr = await Promise.all([p1, p2, p3]);

      expect(arr).toStrictEqual(['one', 'two', 'three']);
    });
  });
});
