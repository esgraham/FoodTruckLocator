//Parse the excel file into a geoJSON format (https://docs.microsoft.com/en-us/azure/azure-maps/extend-geojson)
//To Do:  Convert to an Azure Function for reusability

module.exports={
   parseTruckData: async function(truckLocationDataUrl) {
   //async function parseTruckData(truckLocationDataUrl){
    //Get the truck location data.
    let response = await fetch(truckLocationDataUrl);
    let text = await response.text();

    //Parse the Tab delimited file data into GeoJSON features.
    var features = [];

    //Split the lines of the file.
    var lines = csvToArray(text);
    
    //Grab the header row.
    var row = lines[0];

    //Parse the header row and index each column, so that when our code for parsing each row is easier to follow.
    var header = {};
    var numColumns = row.length;
    var i;
    for (i = 0; i < row.length; i++) {
        header[row[i]] = i;
    }
    //Skip the header row and then parse each row into a GeoJSON feature.
    for (i = 1; i < lines.length; i++) {
        row = lines[i];
        //Ensure that the row has the right number of columns.
        if (row.length >= numColumns) {
            //verify data
            var longitude = parseFloat(row[header['Longitude']]);
            var latitude = parseFloat(row[header['Latitude']]);
            var postCode = row[header['Zip Codes']];

            if (longitude<0 && latitude>0)
            {
                features.push(new atlas.data.Feature(new atlas.data.Point([longitude, latitude]), {
                AddressLine: row[header['Address']],
                Municipality: '',
                City: 'San Francisco',
                AdminDivision: 'CA',
                Country: 'US',
                PostCode: postCode,
                StoreType: row[header['FoodItems']],
                DaysHours: row[header['dayshours']],
                Name: row[header['Applicant']]
            }));
            }
        }
    }
    return features;
}
}

function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};