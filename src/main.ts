// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';
import type * as utils from './lib/utils';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';

// create Settings and create GUI settings
var settings = new helper.Settings();
helper.createGUI(settings);

// create scene
var scene = new THREE.Scene();
var { material } = helper.setupGeometry(scene);
// add light proxy
var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
var lightMaterial = new THREE.MeshBasicMaterial({color: 0xff8010});
var light = new THREE.Mesh(lightgeo, lightMaterial);
light.name = "light";
light.position.x = settings.lightX;
light.position.y = settings.lightY;
light.position.z = settings.lightZ;
light.material.color.setRGB(settings.light_color[0]/255, settings.light_color[1]/255, settings.light_color[2]/255);
scene.add(light);

// defines callback that should get called whenever the
// params of the settings get changed (eg. via GUI)
function callback(changed: utils.KeyValuePair<helper.Settings>) {
  switch (changed.key) {
    //shader cases
    case "shader":
      switch (changed.value) {
        case "Basic":
          helper.updateShader(helper.basicShader, material, scene, settings);
          //helper.basicShader( material, scene);
          break;
        case "Ambient":
          //helper.ambientShader( material, settings, scene);
          helper.updateShader(helper.ambientShader, material, scene, settings);
          break;
        case "Normal":
          helper.updateShader(helper.normalShader, material, scene, settings);
          //helper.normalShader2( material, scene);
          break;
        case "Toon":
          helper.updateShader(helper.toonShader, material, scene, settings);
          break;
        case "Lambert":
          helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance]);
          break;
        case "Gouraud":
          helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
          break;
        case "Phong":
          helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
          break;
        case "Cook-Torrance":
          helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
          break;
      }
      break;
    //shader settings cases
    case "ambient_color":
      if(settings.shader == "Ambient"){
        //helper.updateAmbientColor(material, changed.value, scene);
        helper.updateShader(helper.updateAmbientColor, material, scene, changed.value);
        }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, changed.value, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, changed.value, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      break;
      case "ambient_reflectance":
      if(settings.shader == "Ambient"){
        //helper.updateAmbientReflectance(material, changed.value, scene);
        helper.updateShader(helper.updateAmbientReflectance, material, scene, changed.value);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, changed.value, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, changed.value, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      break;
    case "diffuse_color":
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, changed.value, settings.diffuse_reflectance]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, changed.value, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, changed.value, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, changed.value, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    case "diffuse_reflectance":
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, settings.diffuse_color, changed.value]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, changed.value, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, changed.value, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, changed.value, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    case "specular_color":
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, changed.value, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, changed.value, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, changed.value, settings.specular_reflectance, settings.roughness]);
      }
      break;
    case "specular_reflectance":
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, changed.value, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, changed.value, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, changed.value, settings.roughness]);
      }
      break;
    //shininess case
    case "magnitude":
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, changed.value]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, changed.value]);
      }
      break;
    //roughness case
    case "roughness":
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, changed.value]);
      }
      break;
    //light source color cases
    case "light_color":
      light.material.color.setRGB(changed.value[0]/255, changed.value[1]/255, changed.value[2]/255);
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, changed.value, settings.diffuse_color, settings.diffuse_reflectance]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, changed.value, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, changed.value, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, changed.value, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    //TODO light intensity
    case "light_intensity":
      light.material.color.setRGB(changed.value, changed.value, changed.value);
      break;
    //light position cases
    case "lightX":
      light.position.x = changed.value;
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    case "lightY":
      light.position.y = changed.value;
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    case "lightZ":
      light.position.z = changed.value;
      if(settings.shader == "Lambert"){
        helper.updateShader(helper.lambertShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance]);
      }
      if(settings.shader == "Gouraud"){
        helper.updateShader(helper.gouraudShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Phong"){
        helper.updateShader(helper.phongShader, material, scene, [light, settings.light_color, settings.ambient_color, settings.ambient_reflectance, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.magnitude]);
      }
      if(settings.shader == "Cook-Torrance"){
        helper.updateShader(helper.cookTorranceShader, material, scene, [light, settings.light_color, settings.diffuse_color, settings.diffuse_reflectance, settings.specular_color, settings.specular_reflectance, settings.roughness]);
      }
      break;
    default:
      break;
  }
}

// feel free to declare certain variables outside the main function to change them somewhere else
// e.g. settings, light or material
function main(){
  // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  // More complex layouts are possible too.
  var root = Application("Shader");
	root.setLayout([["renderer"]]);
  root.setLayoutColumns(["100%"]);
  root.setLayoutRows(["100%"]);

  // ---------------------------------------------------------------------------
  // adds the callback that gets called on params change
  settings.addCallback(callback);

  // ---------------------------------------------------------------------------
  // create RenderDiv
	var rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create camera
  var camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  // add EventListener for rerendering the Scene

  // fill the renderDiv. In RenderWidget happens all the magic.
  // It handles resizes, adds the fps widget and most important defines the main animate loop.
  // You dont need to touch this, but if feel free to overwrite RenderWidget.animate
  var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid.animate();
}

// call main entrypoint
main();
