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
  var star = new stars.MainSequenceStar(1),
      scene = new THREE.Scene(),
      camera,
      renderer,
      starGeometry,
      starMaterial,
      sphere;
      
  createScene($('.starImageContainer'));
  createStar(star);
  updateStar(star);
  
  $('#starMassSlider').change(function(){
    star.calculateProperties($(this).val());
    updateStar(star);
  });
  
  function createScene(container){
    var width = $(container).css('width').slice(0, -2),
        height = $(container).css('height').slice(0, -2);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 
      width / height, 
      0.1, 
      1000);
    camera.position.z = 8;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    $(container).append(renderer.domElement);
  }
  
  function createStar(star){
    starGeometry = new THREE.SpherestarGeometry(star.solarRadius, 32, 32);
    starMaterial = new THREE.MeshBasicMaterial({color: star.solarClass});
    sphere = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(sphere);
        
    sphere.starGeometry.dynamic = true;
    sphere.starGeometry.verticesNeedUpdate = true;
    sphere.starGeometry.normalsNeedUpdate = true;
  }
  
  function animateStarView(){
    requestAnimationFrame(animateStarView);
    renderer.render(scene, camera);
  }
  
  function updateStar(star){
    var scale = star.solarRadius,
        rgb = hexToRGB(star.solarClass);
        
    $('#starMassVariable').text(star.solarMass);
    $('#starRadiusVariable').text(star.solarRadius);
    $('#starLuminosityVariable').text(star.solarLuminosity);
    $('#starTemperatureVariable').text(star.temperature);
    
    sphere.scale.x = scale;
    sphere.scale.y = scale;
    sphere.scale.z = scale;  
    
    sphere.starMaterial.color.r = rgb.r;
    sphere.starMaterial.color.g = rgb.g;
    sphere.starMaterial.color.b = rgb.b;
    
    animateStarView();
      
    function hexToRGB(hex){
      hex = (hex.charAt(0)=="#") ? hex.substring(1,7):hex;
      return {
        r: parseInt((hex).substring(0,2),16),
        g: parseInt((hex).substring(2,4),16),
        b: parseInt((hex).substring(4,6),16)
      }
    }
  }
});


