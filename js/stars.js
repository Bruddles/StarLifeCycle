define([], function(){
  var exports = {};
  
  exports.starType = {
    mainSequence: 0, 
    redGiant: 1, 
    redSupergiant: 2, 
    whiteDwarf: 3, 
    neutronStar: 4, 
    blackHole: 5
  };
  exports.stellarClass = {
    o: '#9bb0ff', 
    b: '#bbccff', 
    a: '#fbf8ff', 
    f: '#ffffed', 
    g: '#ffff00', 
    k: '#ff9833',
    m: '#ff0000'
  };
  
  exports.MainSequenceStar = function(mass){
    this.calculateProperties(mass);
  };
  
  exports.MainSequenceStar.prototype.calculateProperties = function(mass){
    this.type = exports.starType.mainSequence; 
    this.solarMass = mass; //M_solar
    this.solarLuminosity = this.massLuminosity(); //L_solar
    this.solarRadius = this.massRadius(); //R_solar
    this.temperature = this.luminosityRadius(); //K
    
    if (this.temperature >= 30000) colour = stellarClass.o;//#9bb0ff
    else if (this.temperature >= 10000 && this.temperature < 30000) this.solarClass = exports.stellarClass.b; //#aabfff
    else if (this.temperature >= 7500 && this.temperature < 10000) this.solarClass  = exports.stellarClass.a; //#cad8ff
    else if (this.temperature >= 6000 && this.temperature < 7500) this.solarClass  = exports.stellarClass.f; //#fbf8ff
    else if (this.temperature >= 5200 && this.temperature < 6000) this.solarClass  = exports.stellarClass.g; //#fff4e8
    else if (this.temperature >= 3700 && this.temperature < 5200) this.solarClass  = exports.stellarClass.k; //#ffddb4
    else if (this.temperature >= 2400 && this.temperature < 3700) this.solarClass  = exports.stellarClass.m; //#ffbd6f
  };
  
  exports.MainSequenceStar.prototype.massLuminosity = function(){
    var x = 1,
        a = 4;
        
    if (this.solarMass < 0.43){
      x = 0.23;
      a = 2.3;
    } else if (this.solarMass >= 2 && this.solarMass < 20){
      x = 1.5;
      a = 3.5;
    } else if (this.solarMass >= 20){
      x = 3200;
      a = 1;
    }
    return x*Math.pow(this.solarMass, a).toFixed(2);
  };
  exports.MainSequenceStar.prototype.massRadius = function(){
    return Math.pow(this.solarMass, 0.78).toFixed(2);
  };
  exports.MainSequenceStar.prototype.luminosityRadius = function(){
    return ((5777)*Math.pow((this.solarLuminosity/(Math.pow(this.solarRadius, 2))), 0.25)).toFixed(2);
  };
  exports.MainSequenceStar.prototype.toString = function(){
    return 'Main sequence star with a mass of ' + this.solarMass + 
      ' M_solar, a Luminosity of ' + this.solarLuminosity + 
      ' L_solar, a radius of ' + this.solarRadius + 
      ' R_solar, and a temperature of ' + this.temperature + ' K.';
  };
  
  return exports;
});

