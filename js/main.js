require.config({
    paths: {
        'jQuery': '../bower_components/jquery/dist/jquery.min',
        'THREE': '../bower_components/THREE/three.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'THREE': {
          exports: 'THREE'
        }
    }
});
require(['stars', 'jQuery', 'THREE'], function(stars, $, THREE){
  var star = new stars.MainSequenceStar(1);
  updateView(star);
  
  $('#starMassSlider').change(function(){
    star.calculateProperties($(this).val());
    updateView(star);
  });
  
  createSphere();
  
  function createSphere(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 
      $('.starImageContainer').css('width').slice(0, -2) / $('.starImageContainer').css('height').slice(0, -2), 
      0.1, 
      1000);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize($('.starImageContainer').css('width').slice(0, -2), $('.starImageContainer').css('height').slice(0, -2));
    $('body').append(renderer.domElement);
    
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  }
  
  function updateView(star){
    $('#starMassVariable').text(star.solarMass);
    $('#starRadiusVariable').text(star.solarRadius);
    $('#starLuminosityVariable').text(star.solarLuminosity);
    $('#starTemperatureVariable').text(star.temperature);
  
    $('.starImage').css('background-color', star.solarClass );
    $('.starImage').css('height', function(){
      var width = $('.starImageContainer').css('height').slice(0, -2);
      return ((star.solarRadius / 6) * width);  
    });
    $('.starImage').css('width', function(){
      var width = $('.starImageContainer').css('height').slice(0, -2);
      return ((star.solarRadius / 6) * width);  
    });
  }
});


