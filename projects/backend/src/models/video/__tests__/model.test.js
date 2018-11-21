import {Video} from '../model';

describe("Video Model", () => {
    it("has an id", () => {
        expect(Video.id).toBe(null);
    });

    it("has a name", () => {
        expect(Video.name).toBe(null);
    });
});
