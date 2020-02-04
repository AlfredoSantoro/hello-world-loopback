'use strict';

const Logger = require('winston');

module.exports = function(People) {
  People.findByCF = function(cf, cb) {
    Logger.info(' get request /find-by-fiscal-code');
    People.find(
      {
        where: {
          fiscalCode: cf,
        },
      }, function(err, result) {
      if (err) {
        Logger.info('the following error has occurred: ' + err);
        cb(null, err);
        return;
      }
      Logger.info('callback get request /find-by-fiscal-code Done..');
      return cb(null, result);
    }
    );
  };
  People.findBySurname = function(surname, cb) {
    Logger.info(' get request /find-by-surname');
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
      Logger.info('callback get request /find-by-surname Done..');
      return cb(null, result);
    }
    );
  };
  People.findPeopleByPhoneNumbers = function(number, cb) {
    Logger.info('get request /find-by-phone-number');
    People.find(
      {
        include: {
          relation: 'phoneNumbers',
          scope: {
            where: {number: number},
          },
        },
      }, function(err, result) {
      if (err) {
        Logger.info('the following error has occurred: ' + err);
        cb(null, err);
        return;
      }
      let toReturn = [];
      result.forEach(function(people) {
        people = people.toJSON();
        if (people.phoneNumbers.length > 0) {
          toReturn.push(people);
        }
      });
      Logger.info(toReturn);
      Logger.info('callback get request /find-by-phone Done..');
      return cb(null, toReturn);
    }
    );
  };
  /* A remote method is a static method of a model, exposed over a custom REST endpoint */
  People.remoteMethod(
    'findByCF',
    {
      description: 'Find a people by name',
      http: {path: '/find-by-fiscal-code', verb: 'get'},
      accepts: [
        {
          arg: 'cf',
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
  People.remoteMethod(
    'findPeopleByPhoneNumbers',
    {
      description: 'Find a people by phone number',
      http: {path: '/find-by-phone-number', verb: 'get'},
      accepts: [
        {
          arg: 'number',
          type: 'number',
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
