const { DefaultApi } = require('../app/api');
const assert = require('assert');

describe('Selendra Api', function() {
    it('should get chain info', async function() {
      const api = await new DefaultApi();
      let info = await api.chainInfo();
      assert.notEqual(info[0], "");
      assert.notEqual(info[1], "");
      assert.notEqual(info[2], "");
      assert.notEqual(info[3][0], 0);
    });
    
    after(function() {
        process.exit(1)
    })
});

