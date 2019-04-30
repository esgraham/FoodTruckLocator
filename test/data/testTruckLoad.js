var dataHelper = require('../../FoodTruckLocator/src/parseTruckData.js');


var assert = require('assert');

var truckLocationDataUrl = 'https://data.sfgov.org/api/views/rqzj-sfat/rows.csv';



describe('parseTruckData', function() {

    it('Returns a list of food trucks', async function(){

        try
        {
        var result = await dataHelper.parseTruckData(truckLocationDataUrl);
        assert.equal(result.length, 659);
        }
        catch(err) {
            assert.fail('Data did not parse.')
        }
    });
});
