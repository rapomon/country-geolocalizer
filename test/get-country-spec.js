const test = require('tape');
const getCountry = require('../src');

test('Validate Madrid (Spain)', function(t) {
    const result = getCountry(40.4167047, -3.7035825);
    t.equal(result.ADMIN, 'Spain', 'result.ADMIN should be strictly equal to Spain');
    t.equal(result.ISO_A3, 'ESP', 'result.ISO_A3 should be strictly equal to ESP');
    t.end();
});

test('Validate null (water)', function(t) {
    const result = getCountry(0.0, 0.0);
    t.equal(result, null, 'result should be strictly equal to null');
    t.end();
});
