var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');


var data = {
  countries: readData('_data/', 'countries.yml'),
  speakers: readData('_data/', 'speakers.yml'),
  timezones: readData('_data/', 'timezones.yml'),
  birds: readData('_data/', 'birds.yml')
};

// build array of countries
var countries = data.countries.metadata.map(function(item) {
  return item.country;
});

// build array of speakers
var speakers = data.speakers.metadata.map(function(item) {
  return item.speaker;
});

// build array of timezones
var timezones = data.timezones.metadata.map(function(item) {
  return item.country;
});

// build array of birds
var birds = data.birds.metadata.map(function(item) {
  return item.country;
});

function readData(dir, filename) {
  var buffer = fs.readFileSync(dir + filename),
  file = buffer.toString('utf8');
  
  try {
    
    return {
      name: filename,
      file: file,
      metadata: jsyaml.load(file)
    };
  } catch(err) {}
}

data.speakers.metadata.forEach(function(item) {
  
  test('Speaker: ' + item.speaker, function(t) {
    t.ok(item.speaker, 'speaker must have a "speaker" value');
    t.ok(item.twitter, 'speaker must have a "twitter" value');
    t.ok(item.country, 'speaker must have a "country" value');
    t.ok(item.talk, 'speaker must have a "talk" value');
    
    t.notEqual(countries.indexOf(item.country),-1,'country must be found in countries.yml: ' + item.country)
    
    t.notEqual(timezones.indexOf(item.country),-1,'timezone data is missing this country: ' + item.country)
    
    t.notEqual(birds.indexOf(item.country),-1,'birds data is missing this country: ' + item.country)
    
    t.end();
  });
});

data.timezones.metadata.forEach(function(item) {
  
  test('Country: ' + item.country, function(t) {
    t.ok(item.country, 'country must have a "country" value');
    t.ok(item.time, 'country must have a "time" value');
    
    t.end();
  });
});

data.birds.metadata.forEach(function(item) {
  
  test('Bird: ' + item.bird, function(t) {
    t.ok(item.country, 'bird must have a "country" value');
    t.ok(item.bird, 'bird must have a "bird" value');
    //t.ok(item.scientific, 'bird must have a "scientific" value');
    
    t.end();
  });
});
