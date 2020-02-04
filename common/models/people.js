'use strict';

const Logger = require('winston');

module.exports = function(People) {
  People.findByName = function(name, cb) {
    Logger.info('received get request /find-by-name');
    People.find(
      {
        where: {
          name: name,
        },
      }, function(err, result) {
      if (err) {
        Logger.info('the following error has occurred: ' + err);
        cb(null, err);
        return;
      }
      Logger.info('get request /find-by-name Done..');
      return cb(null, result);
    }
    );
  };
  People.findBySurname = function(surname, cb) {
    Logger.info('received get request /find-by-surname');
    People.find(
      {
        where: {
          surname: surname,
        },
      }, function(err, result) {
      if (err) {
        Logger.info('the following error has occurred: ' + err);
        cb(null, err);
        return;
      }
      Logger.info('get request /find-by-surname Done..');
      return cb(null, result);
    }
    );
  };
  /* A remote method is a static method of a model, exposed over a custom REST endpoint */
  People.remoteMethod(
    'findByName',
    {
      description: 'Find a people by name',
      http: {path: '/find-by-name', verb: 'get'},
      accepts: [
        {
          arg: 'name',
          type: 'string',
          http: {
            source: 'query',
          },
          required: true,
        },
      ],
      returns: {arg: 'result', type: 'array'},
    }
  );

  People.remoteMethod(
    'findBySurname',
    {
      description: 'Find a people by surname',
      http: {path: '/find-by-surname', verb: 'get'},
      accepts: [
        {
          arg: 'surname',
          type: 'string',
          http: {
            source: 'query',
          },
          required: true,
        },
      ],
      returns: {arg: 'result', type: 'array'},
    }
  );
};
