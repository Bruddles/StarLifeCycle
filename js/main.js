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
      geometry,
      material,
      sphere;
      
  createStarView($('.starImageContainer'), star);
  updateStarView(star);
  
  $('#starMassSlider').change(function(){
    star.calculateProperties($(this).val());
    updateStarView(star);
  });
  
  function createStarView(container, star){
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
    
    geometry = new THREE.SphereGeometry(star.solarRadius , 32, 32);
    material = new THREE.MeshBasicMaterial({color: star.solarClass});
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    sphere.geometry.dynamic = true;
    sphere.geometry.verticesNeedUpdate = true;
    sphere.geometry.normalsNeedUpdate = true;
  }
  
  function animateStarView(){
    requestAnimationFrame(animateStarView);
    renderer.render(scene, camera);
  }
  
  function updateStarView(star){
    var scale = star.solarRadius,
        rgb = hexToRGB(star.solarClass);
        
    console.log('hex: ' + star.solarClass);
    console.log('r: ' + rgb.r + ' g: ' + rgb.g + ' b: ' + rgb.b);
    $('#starMassVariable').text(star.solarMass);
    $('#starRadiusVariable').text(star.solarRadius);
    $('#starLuminosityVariable').text(star.solarLuminosity);
    $('#starTemperatureVariable').text(star.temperature);
    
    sphere.scale.x = scale;
    sphere.scale.y = scale;
    sphere.scale.z = scale;  
    
    sphere.material.color.r = rgb.r;
    sphere.material.color.g = rgb.g;
    sphere.material.color.b = rgb.b;
    
    animateStarView();
  
    // $('.starImage').css('background-color', star.solarClass );
    
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


