package com.useoptic.end_to_end.fixtures
import com.useoptic.diff.JsonFileFixture
import io.circe.Json
import io.circe.literal._
object JsonExamples extends JsonFileFixture {

  //todo
  val basicTodo = json"""{"message": "Hello", "isDone": true}"""
  val basicTodoWithDescription = json"""{"message": "Hello", "isDone": true, "description": "Do it!"}"""
  val basicWithDueDate = json"""{ "task": "Build It", "isDone": false , "dueData": "TUESDAY"}"""
  val basicTodoWithoutStatus = json"""{"message": "Hello"}"""

  val emptyObject = json"""{}"""

  val emptyArray = json"""[]"""
  val stringArray = json"""["string1", "string2", "string3", "string4", "string5"]"""
  val stringArrayWithNumbers = json"""["string1", "string2", 3, "string4", 5, 6, 7, 8, 9, 10, 11, 12]"""

  val fieldOfArrayOfArray = json"""{"then": [["string", "string", "string", "string"]]}"""
  val arrayOfArrayOfArray = json"""[[["string", "string", "string", "string"]]]"""
  val arrayOfArray = json"""[["string", "string", "string", "string"]]"""
  val arrayOfObjectsWithArrayFields = json"""[{"array": [1,2,3]}]"""

  val objectsWithOptionalsArray = json"""[{"field": true}, {"field": false}, {"fieldN": 12}]"""
  val objectsAndStringsInArray = json"""[{"field": true}, "HELLO"]"""

  val objectWithNull = json"""{"value": null}"""
  val objectWithNullAsString = json"""{"value": "String"}"""
  val objectWithNullAsNumber = json"""{"value": 123}"""

  val nestedSimple = json"""{"task": "Build It", "isDone": false,  "dueData": "MONDAY"}"""
  val nestedSimpleNew = json"""{"task": "Build It", "isDone": false,  "dueData": "MONDAY", "novelField": {"a": true}}"""
  val racecar = json"""{"MRData":{"xmlns":"http://ergast.com/mrd/1.4","series":"f1","url":"http://ergast.com/api/f1/2019/1/results.json","limit":"30","offset":"0","total":"20","RaceTable":{"season":"2019","round":"1","Races":[{"season":"2019","round":"1","url":"https://en.wikipedia.org/wiki/2019_Australian_Grand_Prix","raceName":"Australian Grand Prix","Circuit":{"circuitId":"albert_park","url":"http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit","circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968","locality":"Melbourne","country":"Australia"}},"date":"2019-03-17","time":"05:10:00Z","Results":[{"number":"77","position":"1","positionText":"1","points":"26","Driver":{"driverId":"bottas","permanentNumber":"77","code":"BOT","url":"http://en.wikipedia.org/wiki/Valtteri_Bottas","givenName":"Valtteri","familyName":"Bottas","dateOfBirth":"1989-08-28","nationality":"Finnish"},"Constructor":{"constructorId":"mercedes","url":"http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"2","laps":"58","status":"Finished","Time":{"millis":"5127325","time":"1:25:27.325"},"FastestLap":{"rank":"1","lap":"57","Time":{"time":"1:25.580"},"AverageSpeed":{"units":"kph","speed":"223.075"}}},{"number":"44","position":"2","positionText":"2","points":"18","Driver":{"driverId":"hamilton","permanentNumber":"44","code":"HAM","url":"http://en.wikipedia.org/wiki/Lewis_Hamilton","givenName":"Lewis","familyName":"Hamilton","dateOfBirth":"1985-01-07","nationality":"British"},"Constructor":{"constructorId":"mercedes","url":"http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"1","laps":"58","status":"Finished","Time":{"millis":"5148211","time":"+20.886"},"FastestLap":{"rank":"2","lap":"57","Time":{"time":"1:26.057"},"AverageSpeed":{"units":"kph","speed":"221.839"}}},{"number":"33","position":"3","positionText":"3","points":"15","Driver":{"driverId":"max_verstappen","permanentNumber":"33","code":"VER","url":"http://en.wikipedia.org/wiki/Max_Verstappen","givenName":"Max","familyName":"Verstappen","dateOfBirth":"1997-09-30","nationality":"Dutch"},"Constructor":{"constructorId":"red_bull","url":"http://en.wikipedia.org/wiki/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"4","laps":"58","status":"Finished","Time":{"millis":"5149845","time":"+22.520"},"FastestLap":{"rank":"3","lap":"57","Time":{"time":"1:26.256"},"AverageSpeed":{"units":"kph","speed":"221.327"}}},{"number":"5","position":"4","positionText":"4","points":"12","Driver":{"driverId":"vettel","permanentNumber":"5","code":"VET","url":"http://en.wikipedia.org/wiki/Sebastian_Vettel","givenName":"Sebastian","familyName":"Vettel","dateOfBirth":"1987-07-03","nationality":"German"},"Constructor":{"constructorId":"ferrari","url":"http://en.wikipedia.org/wiki/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"3","laps":"58","status":"Finished","Time":{"millis":"5184434","time":"+57.109"},"FastestLap":{"rank":"8","lap":"16","Time":{"time":"1:27.954"},"AverageSpeed":{"units":"kph","speed":"217.054"}}},{"number":"16","position":"5","positionText":"5","points":"10","Driver":{"driverId":"leclerc","permanentNumber":"16","code":"LEC","url":"http://en.wikipedia.org/wiki/Charles_Leclerc","givenName":"Charles","familyName":"Leclerc","dateOfBirth":"1997-10-16","nationality":"Monegasque"},"Constructor":{"constructorId":"ferrari","url":"http://en.wikipedia.org/wiki/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"5","laps":"58","status":"Finished","Time":{"millis":"5185528","time":"+58.203"},"FastestLap":{"rank":"4","lap":"58","Time":{"time":"1:26.926"},"AverageSpeed":{"units":"kph","speed":"219.621"}}},{"number":"20","position":"6","positionText":"6","points":"8","Driver":{"driverId":"kevin_magnussen","permanentNumber":"20","code":"MAG","url":"http://en.wikipedia.org/wiki/Kevin_Magnussen","givenName":"Kevin","familyName":"Magnussen","dateOfBirth":"1992-10-05","nationality":"Danish"},"Constructor":{"constructorId":"haas","url":"http://en.wikipedia.org/wiki/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"7","laps":"58","status":"Finished","Time":{"millis":"5214481","time":"+1:27.156"},"FastestLap":{"rank":"9","lap":"56","Time":{"time":"1:28.182"},"AverageSpeed":{"units":"kph","speed":"216.493"}}},{"number":"27","position":"7","positionText":"7","points":"6","Driver":{"driverId":"hulkenberg","permanentNumber":"27","code":"HUL","url":"http://en.wikipedia.org/wiki/Nico_H%C3%BClkenberg","givenName":"Nico","familyName":"Hülkenberg","dateOfBirth":"1987-08-19","nationality":"German"},"Constructor":{"constructorId":"renault","url":"http://en.wikipedia.org/wiki/Renault_in_Formula_One","name":"Renault","nationality":"French"},"grid":"11","laps":"57","status":"+1 Lap","FastestLap":{"rank":"12","lap":"52","Time":{"time":"1:28.444"},"AverageSpeed":{"units":"kph","speed":"215.851"}}},{"number":"7","position":"8","positionText":"8","points":"4","Driver":{"driverId":"raikkonen","permanentNumber":"7","code":"RAI","url":"http://en.wikipedia.org/wiki/Kimi_R%C3%A4ikk%C3%B6nen","givenName":"Kimi","familyName":"Räikkönen","dateOfBirth":"1979-10-17","nationality":"Finnish"},"Constructor":{"constructorId":"alfa","url":"http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One","name":"Alfa Romeo","nationality":"Italian"},"grid":"9","laps":"57","status":"+1 Lap","FastestLap":{"rank":"11","lap":"52","Time":{"time":"1:28.270"},"AverageSpeed":{"units":"kph","speed":"216.277"}}},{"number":"18","position":"9","positionText":"9","points":"2","Driver":{"driverId":"stroll","permanentNumber":"18","code":"STR","url":"http://en.wikipedia.org/wiki/Lance_Stroll","givenName":"Lance","familyName":"Stroll","dateOfBirth":"1998-10-29","nationality":"Canadian"},"Constructor":{"constructorId":"racing_point","url":"http://en.wikipedia.org/wiki/Racing_Point_F1_Team","name":"Racing Point","nationality":"British"},"grid":"16","laps":"57","status":"+1 Lap","FastestLap":{"rank":"7","lap":"29","Time":{"time":"1:27.568"},"AverageSpeed":{"units":"kph","speed":"218.011"}}},{"number":"26","position":"10","positionText":"10","points":"1","Driver":{"driverId":"kvyat","permanentNumber":"26","code":"KVY","url":"http://en.wikipedia.org/wiki/Daniil_Kvyat","givenName":"Daniil","familyName":"Kvyat","dateOfBirth":"1994-04-26","nationality":"Russian"},"Constructor":{"constructorId":"toro_rosso","url":"http://en.wikipedia.org/wiki/Scuderia_Toro_Rosso","name":"Toro Rosso","nationality":"Italian"},"grid":"15","laps":"57","status":"+1 Lap","FastestLap":{"rank":"6","lap":"39","Time":{"time":"1:27.448"},"AverageSpeed":{"units":"kph","speed":"218.310"}}},{"number":"10","position":"11","positionText":"11","points":"0","Driver":{"driverId":"gasly","permanentNumber":"10","code":"GAS","url":"http://en.wikipedia.org/wiki/Pierre_Gasly","givenName":"Pierre","familyName":"Gasly","dateOfBirth":"1996-02-07","nationality":"French"},"Constructor":{"constructorId":"red_bull","url":"http://en.wikipedia.org/wiki/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"17","laps":"57","status":"+1 Lap","FastestLap":{"rank":"5","lap":"39","Time":{"time":"1:27.229"},"AverageSpeed":{"units":"kph","speed":"218.858"}}},{"number":"4","position":"12","positionText":"12","points":"0","Driver":{"driverId":"norris","permanentNumber":"4","code":"NOR","url":"http://en.wikipedia.org/wiki/Lando_Norris","givenName":"Lando","familyName":"Norris","dateOfBirth":"1999-11-13","nationality":"British"},"Constructor":{"constructorId":"mclaren","url":"http://en.wikipedia.org/wiki/McLaren","name":"McLaren","nationality":"British"},"grid":"8","laps":"57","status":"+1 Lap","FastestLap":{"rank":"16","lap":"17","Time":{"time":"1:28.555"},"AverageSpeed":{"units":"kph","speed":"215.581"}}},{"number":"11","position":"13","positionText":"13","points":"0","Driver":{"driverId":"perez","permanentNumber":"11","code":"PER","url":"http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez","givenName":"Sergio","familyName":"Pérez","dateOfBirth":"1990-01-26","nationality":"Mexican"},"Constructor":{"constructorId":"racing_point","url":"http://en.wikipedia.org/wiki/Racing_Point_F1_Team","name":"Racing Point","nationality":"British"},"grid":"10","laps":"57","status":"+1 Lap","FastestLap":{"rank":"15","lap":"41","Time":{"time":"1:28.485"},"AverageSpeed":{"units":"kph","speed":"215.751"}}},{"number":"23","position":"14","positionText":"14","points":"0","Driver":{"driverId":"albon","permanentNumber":"23","code":"ALB","url":"http://en.wikipedia.org/wiki/Alexander_Albon","givenName":"Alexander","familyName":"Albon","dateOfBirth":"1996-03-23","nationality":"Thai"},"Constructor":{"constructorId":"toro_rosso","url":"http://en.wikipedia.org/wiki/Scuderia_Toro_Rosso","name":"Toro Rosso","nationality":"Italian"},"grid":"13","laps":"57","status":"+1 Lap","FastestLap":{"rank":"10","lap":"43","Time":{"time":"1:28.188"},"AverageSpeed":{"units":"kph","speed":"216.478"}}},{"number":"99","position":"15","positionText":"15","points":"0","Driver":{"driverId":"giovinazzi","permanentNumber":"99","code":"GIO","url":"http://en.wikipedia.org/wiki/Antonio_Giovinazzi","givenName":"Antonio","familyName":"Giovinazzi","dateOfBirth":"1993-12-14","nationality":"Italian"},"Constructor":{"constructorId":"alfa","url":"http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One","name":"Alfa Romeo","nationality":"Italian"},"grid":"14","laps":"57","status":"+1 Lap","FastestLap":{"rank":"14","lap":"29","Time":{"time":"1:28.479"},"AverageSpeed":{"units":"kph","speed":"215.766"}}},{"number":"63","position":"16","positionText":"16","points":"0","Driver":{"driverId":"russell","permanentNumber":"63","code":"RUS","url":"http://en.wikipedia.org/wiki/George_Russell_(racing_driver)","givenName":"George","familyName":"Russell","dateOfBirth":"1998-02-15","nationality":"British"},"Constructor":{"constructorId":"williams","url":"http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"19","laps":"56","status":"+2 Laps","FastestLap":{"rank":"17","lap":"55","Time":{"time":"1:28.713"},"AverageSpeed":{"units":"kph","speed":"215.197"}}},{"number":"88","position":"17","positionText":"17","points":"0","Driver":{"driverId":"kubica","permanentNumber":"88","code":"KUB","url":"http://en.wikipedia.org/wiki/Robert_Kubica","givenName":"Robert","familyName":"Kubica","dateOfBirth":"1984-12-07","nationality":"Polish"},"Constructor":{"constructorId":"williams","url":"http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"20","laps":"55","status":"+3 Laps","FastestLap":{"rank":"18","lap":"30","Time":{"time":"1:29.284"},"AverageSpeed":{"units":"kph","speed":"213.821"}}},{"number":"8","position":"18","positionText":"R","points":"0","Driver":{"driverId":"grosjean","permanentNumber":"8","code":"GRO","url":"http://en.wikipedia.org/wiki/Romain_Grosjean","givenName":"Romain","familyName":"Grosjean","dateOfBirth":"1986-04-17","nationality":"French"},"Constructor":{"constructorId":"haas","url":"http://en.wikipedia.org/wiki/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"6","laps":"29","status":"Wheel","FastestLap":{"rank":"13","lap":"17","Time":{"time":"1:28.462"},"AverageSpeed":{"units":"kph","speed":"215.807"}}},{"number":"3","position":"19","positionText":"R","points":"0","Driver":{"driverId":"ricciardo","permanentNumber":"3","code":"RIC","url":"http://en.wikipedia.org/wiki/Daniel_Ricciardo","givenName":"Daniel","familyName":"Ricciardo","dateOfBirth":"1989-07-01","nationality":"Australian"},"Constructor":{"constructorId":"renault","url":"http://en.wikipedia.org/wiki/Renault_in_Formula_One","name":"Renault","nationality":"French"},"grid":"12","laps":"28","status":"Damage","FastestLap":{"rank":"19","lap":"18","Time":{"time":"1:29.848"},"AverageSpeed":{"units":"kph","speed":"212.478"}}},{"number":"55","position":"20","positionText":"R","points":"0","Driver":{"driverId":"sainz","permanentNumber":"55","code":"SAI","url":"http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.","givenName":"Carlos","familyName":"Sainz","dateOfBirth":"1994-09-01","nationality":"Spanish"},"Constructor":{"constructorId":"mclaren","url":"http://en.wikipedia.org/wiki/McLaren","name":"McLaren","nationality":"British"},"grid":"18","laps":"9","status":"Engine","FastestLap":{"rank":"20","lap":"9","Time":{"time":"1:30.899"},"AverageSpeed":{"units":"kph","speed":"210.022"}}}]}]}}}"""
  val allOpticCommits = fromFile("all-optic-commits")

  val nestedArray = json"""{"a":{"b":["hello"]}}"""

}
