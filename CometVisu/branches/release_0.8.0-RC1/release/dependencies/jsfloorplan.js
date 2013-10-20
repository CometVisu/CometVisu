//
//  JavaScript FloorPlan 3D.
//
//   Copyright (C) 2009, 2010 by Christian Mayer
//   jsfloorplan (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////

/**
 * The JSFloorPlan3D object is the single global object created by the
 * JSFloorPlan 3D library.
 * <p/>
 * The definition of the config file is:
 * <pre>
 * &nbsp;&lt;?xml version="1.0" encoding="UTF-8"?&gt;
 * &nbsp;&lt;building name="MyBuilding" orientation="45"&gt;
 * &nbsp;  &lt;floor name="UG" height="2.44"&gt;
 * &nbsp;    &lt;nodes&gt;
 * &nbsp;      &lt;node id="1" x="5.51" y="0" z="0.9" /&gt;
 * &nbsp;      ...
 * &nbsp;    &lt;/nodes&gt;
 * &nbsp;    &lt;walls&gt;
 * &nbsp;      &lt;wall start="1" end="2" thickness=".24" texture="wall"&gt;
 * &nbsp;        &lt;hole id="door01" distance="0.3" width="0.88" paparet="0.0" lintel="0.2" /&gt;
 * &nbsp;        ...
 * &nbsp;      &lt;/wall&gt;
 * &nbsp;      ...
 * &nbsp;    &lt;/walls&gt;
 * &nbsp;    &lt;rooms&gt;
 * &nbsp;      &lt;room name="Bad"&gt;
 * &nbsp;        &lt;zone name="all" onclick="alert('Bad')"&gt;
 * &nbsp;          &lt;corner nodeid="1" /&gt;
 * &nbsp;          ...
 * &nbsp;        &lt;/zone&gt;
 * &nbsp;        ...
 * &nbsp;      &lt;/room&gt;
 * &nbsp;    &lt;/rooms&gt;
 * &nbsp;  &lt;/floor&gt;
 * &nbsp;  ...
 * &nbsp;  &lt;textues&gt;
 * &nbsp;    &lt;texture /&gt;
 * &nbsp;    ...
 * &nbsp;  &lt;/textures&gt;
 * &nbsp;&lt;/building&gt;
 * </pre>
 * 
 * The elements used are:
 * <dl>
 *   <dt><code><b>&lt;building&gt;</b></code></dt>
 *   <dd>The attribute <code>orientation</code> defines a rotation of the local
 *       coordinate system to north.
 *       <ul>
 *         <li><code>orientation="0"</code> means that the y axis is looking 
 *             north and the x axis is looking east.</li>
 *         <li><code>orientation="90"</code> means that the y axis is looking 
 *             east and the x axis is looking south.</li>
 *       </ul>
 *       Note: As the z axis points upwards this is a right handed coordinate
 *             system.
 *       <img src="assets/coordinate_system.png" />
 *   </dd>
 *   <dt><code><b>&lt;floor&gt;</b></code></dt>
 *   <dd>The <code>floor</code> element contains all relevant information 
 *       about one floor of the building. The <code>name</code> attribute
 *       gives this floor its name and the <code>height</code> attribute 
 *       defines the (maximum) height.
 *   </dd>
 *   <dt><code><b>&lt;nodes&gt;</b></code></dt>
 *   <dd>The contianer to contain all <code>node</code> elements of the floor.
 *   </dd>
 *   <dt><code><b>&lt;node&gt;</b></code></dt>
 *   <dd>A <code>node</code> is a point in x/y space where walls meet. It's the
 *       middle of all walls. If the walls have different thicknesses it might
 *       be necessary got define an offset in the corresponding <code>wall</code>
 *       element.<br />
 *       The <code>z</code> is optional and needed if this point of meeting 
 *       walls is lower than the usual wall height. This might be used for a 
 *       balustrade.
 *   </dd>
 *   <dt><code><b>&lt;walls&gt;</b></code></dt>
 *   <dd>The contianer to contain all <code>wall</code> elements of the floor.
 *   </dd>
 *   <dt><code><b>&lt;wall&gt;</b></code></dt>
 *   <dd>The <code>wall</code> element defines one visible wall that is spanned
 *       between the nodes with the IDs defined by the attributes 
 *       <code>start</code> and <code>end</code>. The wall thickness is
 *       defined by the attribute <code>thickness</code>
 *   </dd>
 *   <dt><code><b>&lt;hole&gt;</b></code></dt>
 *   <dd>The <code>hole</code> element defines a hole in the wall, e.g. for a
 *       door or a window. It starts from the start node after 
 *       <code>distance</code> meters and has a width as defined by the 
 *       <code>width</code> attribute. The bottom is defined by the 
 *       <code>paparet</code> attribute (so it's usually 0.0 for a door) and
 *       the top is defined by the <code>lintel</code> attribute.
 *   </dd>
 *   <dt><code><b>&lt;rooms&gt;</b></code></dt>
 *   <dd>The contianer of all rooms in this floor.
 *   </dd>
 *   <dt><code><b>&lt;room&gt;</b></code></dt>
 *   <dd>The contianer to hold all information about a room. The name of the 
 *       room is defined by the <code>name</code> attribute.
 *   </dd>
 *   <dt><code><b>&lt;zone&gt;</b></code></dt>
 *   <dd>A room might consist out of multiple zones. But at least one is needed.
 *   </dd>
 *   <dt><code><b>&lt;corner&gt;</b></code></dt>
 *   <dd>Defining the corners of the zone by having the node IDs in the
 *       <code>nodeid</code> attribute.
 *   </dd>
 *   <dt><code><b>&lt;textues&gt;</b></code></dt>
 *   <dd>Container for the <code>texture</code> Elements.
 *   </dd>
 *   <dt><code><b>&lt;texture&gt;</b></code></dt>
 *   <dd>Currently unsued. In future the definition of the texture files.
 *   </dd>
 * </dl>
 * 
 * @module JavaScript FloorPlan 3D
 * @title  JS FloorPlan 3D
 * @reqires jQuery, Three.js
 */

(function( window, undefined ){
  ////////////////////////////////////////////////////////////////////////////
  // private static variables and methods:
  
  // Constant representing the ID of an ELEMENT_NODE
  var ELEMENT_NODE = 1;
  
  ////////////////////////////////////////////////////////////////////////////
  // the library
  
  /**
   * The object JSFloorPlan3D contains the whole API necessary to handle a 
   * 3D floorplan.
   * @class JSFloorPlan3D
   * @constructor FOO
   * @param {DOMElement} container The DOM element where floorplan will be 
   *                               inserted
   * @param {URL} floorPlan        The URL of the floorplan to show
   */
  var JSFloorPlan3D = function( container, floorPlan ){
    // check and fix if the user forgot the "new" keyword
    if (!(this instanceof JSFloorPlan3D)) 
    {
      return new JSFloorPlan3D( container, floorPlan );
    }
    
    /**
     * Private pointer to <i>this</i>
     * @property self
     * @private
     */
    var self = this;
    
    /*
    if (typeof floorPlan === "string") 
    {
      this.loadFloorPlan( floorPlan );
    }
    */
    
    /**
     * public variables of this object instance
     * @property buildingProperties
     */
    this.buildingProperties = { floor: [], Object3D: new THREE.Object3D(), floorNames:{} };
    
    // private variables of this object instance will follow
  
  ////////////////////////////////////////////////////////////////////////////
  // Definition of the private variables
  
  var WIDTH = 800,
      HEIGHT = 400;
  var VIEW_ANGLE = 45;
  var projector = new THREE.Projector();
  // create the materials - sphere for the nodes, cube for the walls and line for the lines
  var sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xCC0000 });
  //var cubeMaterial   = new THREE.MeshLambertMaterial( { color: 0x0000CC });
  var cubeMaterial   = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture( 'media/demo_texture_512x512.png' ) });
  //var cubeMaterial   = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff, ambient: 0xaa0000 } );
  var lineMaterial   = new THREE.LineBasicMaterial( { color: 0x0099ff, linewidth: 2 } );
  
  var scene, camera, renderer, pointLight, sunLight, ambientLight, sunLightViewLine;
  // set up the sphere vars
  
  /**
   * Set states that define how the floor plan is drawn
   * @property showStates
   * @private
   */
  var showStates = {
    currentAzimut: 1,              // North up
    currentElevation: Math.PI/2,   // top view
    currentDistance: 10,
    // currentTarget: new THREE.Vector3, // will be defined later
    lightAzimut: 3.9,
    lightElevation: 0.25,
    lightStrength: 80,
    lightDistance: 50,
    fillOpacity: 1,                // solid
    fillColor: new THREE.Color(0xffffff), // white
    showNodes: false,              // only for debug purposes
    showWallLines: false,          // only for debug purposes
    showWireframe: false,          // 
    showLightView: false,          // only for debug purposes
    showFloor: undefined
  };
  
  var floor;
  
  // this array will contain all vertices to show in the svg
  var vertices = Array();
  // infos about the building
  var imageCenter = new Object;
  var noFloorplan = true;

  /**
   * Store all nodes. This is an hash of points.
   * @property floorNodes
   * @type Hash
   * @private
   */
  var floorNodes = new Object(); 

  /**
   * Store all walls. This is an arry of <code>wall</code> objects.
   * @property floorWalls
   * @type Array
   * @private
   */
  var floorWalls = new Array(); 

  /**
   * Store all rooms. This is an array of arrays of Objects.
   * @property rooms
   * @type Array
   * @private
   */
  var rooms = new Array;

  /**
   * Status if the 3D setup was done.
   * @property noSetup
   * @type Bool
   * @private
   */
  var noSetup = true;
  
  /**
   * Status if currently an animation is running
   * @property inAnimation
   * @type Bool
   * @private
   */
  JSFloorPlan3D.inAnimation = false;
  
  
  ////////////////////////////////////////////////////////////////////////////
  // Definition of the private methods
  
  /**
   * Calculate the distance between two cartesian 2D points.
   * @method calcLength2D
   * @private
   * @param {Point} start
   * @param {Point} end
   * @return {Number}
   */
  function calcLength2D( start, end )
  {
    return Math.sqrt( (end.x-start.x)*(end.x-start.x) +
    (end.y-start.y)*(end.y-start.y) );
  }
  
  /**
   * Calculate the rotation of a cartesian 2D point around the center
   * but with given sin and cos of the angle. <br />
   * Note: This method might also be used in a three argument form where the
   * first argument is the angle (and not it's sin/cos pair).
   * @method rotate2D
   * @private
   * @param {Float} s Sin of the rotation angle
   * @param {Float} c Cos of the rotation angle
   * @param {Point} point
   * @param {Point} center
   * @return {Point} new point containing the turned coordinates
   */
  function rotate2D( s, c, point, center )
  {
    if( rotate2D.arguments.length == 3 )
    {
      center = rotate2D.arguments[2];
      point =  rotate2D.arguments[1];
      c = Math.cos( rotate2D.arguments[0] );
      s = Math.sin( rotate2D.arguments[0] );
    }
    
    var ret = new Object;
    ret.x = center.x + c * (point.x-center.x) - s * (point.y-center.y);
    ret.y = center.y + s * (point.x-center.x) + c * (point.y-center.y);
    return ret;
  }
  
  /**
   * Calculate the translation of a cartesian 2D point.
   * @method translate2D
   * @private
   * @param {Point} point
   * @param {Point} translation vector
   * @return {Point} new point containing the turned coordinates
   */
  function translate2D( point, translation )
  {
    var ret = new Object;
    ret.x = point.x + translation.x;
    ret.y = point.y + translation.y;
    return ret;
  }
  
  /**
   * Sort two 2D unit(!) vectors clockwise
   * @method vecSort
   * @private
   * @param {Point} a Unit vector
   * @param {Point} b Unit vector
   * @return {Float} Order
   */
  function vecSort( a, b )
  {
    var pseudoangle_a = a.y>=0 ? (1-a.x) : (a.x+3);  
    var pseudoangle_b = b.y>=0 ? (1-b.x) : (b.x+3);  
    return pseudoangle_a - pseudoangle_b; 
  }
  
  /**
   * Parse and create internal structure for the floor plan.
   * @method parseXMLFloorPlan
   * @param {XMLDom} xmlDoc
   */
  var parseXMLFloorPlan = function( xmlDoc )
  {
    noFloorplan = false;
    
    var floorCount = -1;
    var heightOfGround = 0; // the base level of the current floor
    
    // basic check if the document seems right
    // this could be avoided if the XML file would be validated
    // with a DTD
    var building;
    if( 'building' ==  xmlDoc.documentElement.tagName )
      building = xmlDoc.documentElement;
    else
      return alert( "ERROR: Not a valid floor plan! " + 
      "Expected: 'building', found '" + xmlDoc.documentElement.tagName + "'" );
    
    // now we are sure to have a sensible file
    // => iterate over all floors
    for( var i=0; i < building.childNodes.length; i++ )
    {
      floor = building.childNodes[i];
      if (floor.nodeType != ELEMENT_NODE) continue;
                  
      if( floor.tagName == 'textures' )
      {
        parseTextures( floor );
        continue;
      }  
      
      if( floor.tagName != 'floor' )
        return alert( "ERROR: Not a valid floor plan! " +
                      "Expected: 'floor', found '" + floor.tagName + "'" );
      
      floorCount++;
      self.buildingProperties.floor[floorCount] = {};
      
      var floorName = floor.getAttribute('name');
      self.buildingProperties.floor[floorCount].name = floorName;
      self.buildingProperties.floorNames[floorName] = floorCount;
      
      var floorheight = Number( floor.getAttribute('height') );
      self.buildingProperties.floor[floorCount].height = floorheight;
      self.buildingProperties.floor[floorCount].heightOfGround = heightOfGround;
      
      var floorWallsStart = floorWalls.length;
      
      // iterate over the content of this floor
      for( var j=0; j < floor.childNodes.length; j++ )
      {
        var floorNode = floor.childNodes[j];
        if (floorNode.nodeType != ELEMENT_NODE) continue;
        
        switch( floorNode.tagName )
        {
          case 'nodes':
            parseFloorNodes( floorNode, floorheight );
            break;
            
          case 'walls':
            parseFloorWalls( floorNode );
            break;
            
          case 'rooms':
            parseFloorRooms( floorNode, floorCount );
            break;
        }
      }
      
      // now the content of the floor is stored in easily
      // accessable objects
      // => derive the necessary information
      
      // group all elements on this floor
      var Object3D = new THREE.Object3D();
      
      // add the information to each node to which nodes it's connected to
      for( var j = floorWallsStart; j < floorWalls.length; j++ )
      {
        // note: the ID is shifted by one to avoid an ID of zero
        // as that wouldn't allow me anymore to distinguish
        // start and stop
        floorNodes[ floorWalls[j].start ].neighbour.push(  j+1 );
        floorNodes[ floorWalls[j].end   ].neighbour.push( -j-1 );
      }
      
      var nodeGroup = new THREE.Object3D(); nodeGroup.name = 'nodeGroup';
      for( var id in floorNodes )
      {
        // calculate the vectors showing to the neighbours
        var vectors = new Array();
        var start = floorNodes[id];
        
        // show them on request as spheres
        var sphere = new THREE.Mesh( new THREE.SphereGeometry(0.1, 4, 4), sphereMaterial);
        sphere.position = new THREE.Vector3( start.x, start.y, heightOfGround );
        nodeGroup.add(sphere);    
        
        for( var j=0; j<floorNodes[id].neighbour.length; j++ )
        {
          var vec = new Object;
          vec.id = floorNodes[id].neighbour[j];
          var end;
          if( vec.id < 0 )
            end = floorNodes[ floorWalls[ -vec.id-1 ].start ];
          else
            end = floorNodes[ floorWalls[  vec.id-1 ].end   ];
          
          length = calcLength2D( start, end );
          vec.x = (end.x - start.x) / length;
          vec.y = (end.y - start.y) / length;
          vectors.push( vec );
        }
        
        // sort them clockwise
        vectors.sort( vecSort );
        
        // calculate the cutting points of the walls at this node id
        for( var j=0; j<vectors.length; j++ )
        {
          var jj = (j+1) % vectors.length;
          var wj  = Math.abs(vectors[j ].id)-1;
          var wjj = Math.abs(vectors[jj].id)-1;
          var dj  = floorWalls[wj ].thickness/2;
          var djj = floorWalls[wjj].thickness/2;
          if(  floorWalls[wj ].startOffset && vectors[j ].id > 0 )
            dj  +=  floorWalls[wj].startOffset;
          if(  floorWalls[wj ].endOffset   && vectors[j ].id < 0 )
            dj  +=  floorWalls[wj].endOffset;
          if(  floorWalls[wjj].startOffset && vectors[jj].id > 0 )
            djj += -floorWalls[wjj].startOffset;
          if(  floorWalls[wjj].endOffset   && vectors[jj].id < 0 )
            djj += -floorWalls[wjj].endOffset;
          
          var vertex = new Object;
          vertex.x = vectors[j].x*djj + vectors[jj].x*dj;
          vertex.y = vectors[j].y*djj + vectors[jj].y*dj;
          var l = vectors[j].x*vectors[jj].y - vectors[j].y*vectors[jj].x;
          if( Math.abs( l ) < 1e-5 )
          { // the angle between the two vectors is exactly 180°
          // i.e. a straight wall...
          if( Math.abs( dj - djj ) < 1e-5 )
          { // at least the walls have the same thickness...
          vertex.x = start.x - vectors[j].y*dj;
          vertex.y = start.y + vectors[j].x*dj;
          } else {
            alert( "ERROR: A straight wall with different thicknesses " +
            "is currently not supported!" );
            // but we still try our best...
            vertex.x = start.x - vectors[j].y*(dj+djj)/2;
            vertex.y = start.y + vectors[j].x*(dj+djj)/2;
          }
          } else {
            vertex.x = start.x + vertex.x / l;
            vertex.y = start.y + vertex.y / l;
          }
          
          if( vectors[j ].id < 0 )
            floorWalls[wj ].startVertex.push( vertices.length );
          else  
            floorWalls[wj ].endVertex.push( vertices.length );
          
          if( 1 == vectors.length )
          {
            var additional = new Object;
            additional.x = 2 * start.x - vertex.x;
            additional.y = 2 * start.y - vertex.y;
            vertices.push( additional );
          }
          
          if( vectors[jj].id < 0 )
            floorWalls[wjj].startVertex.push( vertices.length );
          else  
            floorWalls[wjj].endVertex.push( vertices.length );
          
          vertices.push( vertex );
        }
      } // end for( var id in floorNodes )
      Object3D.add( nodeGroup );
      
      // show walls
      var lineGroup = new THREE.Object3D(); lineGroup.name = 'lineGroup';
      var wallGroup = new THREE.Object3D(); wallGroup.name = 'wallGroup';
      for( var j = floorWallsStart; j<floorWalls.length; j++ )
      {
        var vs = floorNodes[ floorWalls[j].start ];
        var ve = floorNodes[ floorWalls[j].end   ];
        var lineGeo = new THREE.Geometry(); 
        lineGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( vs.x, vs.y, heightOfGround ) ) ); 
        lineGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( ve.x, ve.y, heightOfGround ) ) ); 
        lineGroup.add( new THREE.Line( lineGeo, lineMaterial ) );
        
        var s1 = vertices[ floorWalls[j].startVertex[0] ];
        var e1 = vertices[ floorWalls[j].endVertex  [0] ];
        var s2 = vertices[ floorWalls[j].startVertex[1] ];
        var e2 = vertices[ floorWalls[j].endVertex  [1] ];
        
        // check that the start and end points aren't twisted
        var v1 = new Object; v1.x = s1.x-s2.x; v1.y = s1.y-s2.y; 
        var v2 = new Object; v2.x = e1.x-s2.x; v2.y = e1.y-s2.y;
        var v3 = new Object; v3.x = e1.x-e2.x; v3.y = e1.y-e2.y;
        if( (v1.x*v2.y - v1.y*v2.x)*(v2.x*v3.y - v2.y*v3.x) > 0 )
        {
          e1 = vertices  [ floorWalls[j].endVertex[1] ];
          e2 = vertices  [ floorWalls[j].endVertex[0] ];
        }
        var sm = floorNodes[ floorWalls[j].start ];
        var em = floorNodes[ floorWalls[j].end   ];
        var sh = floorNodes[ floorWalls[j].start ].z ; 
        var eh = floorNodes[ floorWalls[j].end   ].z ;
        var wallSideOrder = (s2.x-s1.x)*(e1.y-s1.y) - (s2.y-s1.y)*(e1.x-s1.x);
        var geometry = new THREE.Geometry();
        
        var normal1 = new THREE.Vector3(sm.y-em.y,-sm.x+em.x,0); // fixme? normalize
        var normal2 = new THREE.Vector3(1,0,0);
        
        var sourrounding = [ new poly2tri.Point(0,0), new poly2tri.Point(0,1), new poly2tri.Point(1,1), new poly2tri.Point(1,0) ];
        sourrounding[1].startEndMarker = 'start';
        sourrounding[2].startEndMarker = 'end';
        var holesToAdd = [];
        
        if( floorWalls[j].holes.length )
        {
          var holes = floorWalls[j].holes;
          for( var h = 0; h < holes.length; h++ )
          {
            var wallLength = calcLength2D( sm, em );
            var fLeft  =  holes[h].distance                   / wallLength;
            var fRight = (holes[h].distance + holes[h].width) / wallLength;
            if( fLeft  <= 0.0 ) fLeft  = 0.001; //// FIXME - actually the config file is bad. Leave at least 1mm wall
            if( fRight >= 1.0 ) fRight = 0.999; //// FIXME - actually the config file is bad. Leave at least 1mm wall
            var lintel  = (sh - holes[h].lintel) / sh;
            var paparet = holes[h].paparet / sh;
            if( 1 == lintel )
            {
              // not a hole, the sourrounding goes to the groud...
              
              if( paparet == 0 ) continue; // FIXME: Assume paparet != 0 - otherwise it should be two walls...

              sourrounding.splice( -2, 0, new poly2tri.Point(fLeft,1), new poly2tri.Point(fLeft,paparet), new poly2tri.Point(fRight,paparet), new poly2tri.Point(fRight,1) );
              continue;
            }
            if( 0 == paparet )
            {
              // not a hole, the sourrounding goes to the groud...
              
              // lintel == 1 can't happen, it's checked in the if clause above
              
              sourrounding.splice( 0, 0, new poly2tri.Point(fRight,0), new poly2tri.Point(fRight,lintel), new poly2tri.Point(fLeft,lintel), new poly2tri.Point(fLeft,0) );
              continue;
            }
            holesToAdd.push( [new poly2tri.Point(fLeft,paparet), new poly2tri.Point(fRight,paparet), new poly2tri.Point(fRight,lintel), new poly2tri.Point(fLeft,lintel)] );
          }
        } // if( floorWalls[j].holes.length )
        var swctx = new poly2tri.SweepContext( sourrounding.slice(0) ); // pass a copy of sourrounding
        for( var htA = 0; htA < holesToAdd.length; htA++ )
          swctx.AddHole( holesToAdd[htA] );
        
        // Do the triangulation - FIXME: handle exceptions, don't ignore them...
        try {
          poly2tri.sweep.Triangulate(swctx);
        }catch(err){
          console.log(err);
        }
        
        // mark all points to make sure that we don't need to double vertices
        for( var tp = 0; tp < swctx.point_count(); tp++ )
          swctx.GetPoint( tp ).id = tp;
          
        // translate poly2tri triangles to THREE.js faces:
        var p2tF = [];
        $.each(swctx.GetTriangles(), function(idx, val) {
          p2tF.push(new THREE.Face3(val.GetPoint(0).id, val.GetPoint(1).id, val.GetPoint(2).id));
        });
        
        var Tvertices = swctx.points_;
        var Tfaces = p2tF;
        var wall1vertices = [];
        var wall2vertices = [];
        var sId, eId;
        var l1SquaredInv = 1.0 / ((e1.x-s1.x)*(e1.x-s1.x) + (e1.y-s1.y)*(e1.y-s1.y));
        var l2SquaredInv = 1.0 / ((e2.x-s2.x)*(e2.x-s2.x) + (e2.y-s2.y)*(e2.y-s2.y));
        for( var v = 0; v < Tvertices.length; v++ )
        {
          var tv = Tvertices[v];
          
          // get point in building space:
          var tm = { 
            x: sm.x * (1-tv.x) + em.x * tv.x , 
            y: sm.y * (1-tv.x) + em.y * tv.x 
          };
          
          // project it onto s1->e1
          var f1 = ((tm.x-s1.x)*(e1.x-s1.x) + (tm.y-s1.y)*(e1.y-s1.y))*l1SquaredInv;
          if( tv.x == 0.0 || tv.x == 1.0 ) f1 = 1-tv.x; // special case on concave wall bend
          var x1 = s1.x * (1-f1) + e1.x * f1;
          var y1 = s1.y * (1-f1) + e1.y * f1;
          
          // project it onto s2->e2
          var f2 = ((tm.x-s2.x)*(e2.x-s2.x) + (tm.y-s2.y)*(e2.y-s2.y))*l2SquaredInv;
          if( tv.x == 0.0 || tv.x == 1.0 ) f2 = 1-tv.x; // special case on concave wall bend
          var x2 = s2.x * (1-f2) + e2.x * f2;
          var y2 = s2.y * (1-f2) + e2.y * f2;
          
          var z = heightOfGround + sh*tv.y;
          if( wallSideOrder > 0 )
          {
            wall1vertices.push(new THREE.Vertex(new THREE.Vector3(x1,y1,z), normal1));
            wall2vertices.push(new THREE.Vertex(new THREE.Vector3(x2,y2,z), normal1));
          } else {
            wall1vertices.push(new THREE.Vertex(new THREE.Vector3(x2,y2,z), normal1));
            wall2vertices.push(new THREE.Vertex(new THREE.Vector3(x1,y1,z), normal1));
          }
          if( 'startEndMarker' in tv )
          {
            if( 'start' == tv.startEndMarker )
            {
              sId = wall1vertices.length - 1;
            } else {
              eId = wall1vertices.length - 1;
            }
          }
        }
        var wall1verticesLength = wall1vertices.length;
        geometry.vertices = wall1vertices.concat( wall2vertices );
        var s1id = sId, s2id = sId + wall1verticesLength, e1id = eId, e2id = eId + wall1verticesLength;
        //geometry.faces =  Tfaces;
        for( var f = 0; f < Tfaces.length; f++ )
        {
          var uv_a1 = new THREE.UV(   Tvertices[Tfaces[f].a].x, 1-Tvertices[Tfaces[f].a].y );
          var uv_b1 = new THREE.UV(   Tvertices[Tfaces[f].b].x, 1-Tvertices[Tfaces[f].b].y );
          var uv_c1 = new THREE.UV(   Tvertices[Tfaces[f].c].x, 1-Tvertices[Tfaces[f].c].y );
          var uv_a2 = new THREE.UV( 1-Tvertices[Tfaces[f].c].x, 1-Tvertices[Tfaces[f].c].y );
          var uv_b2 = new THREE.UV( 1-Tvertices[Tfaces[f].b].x, 1-Tvertices[Tfaces[f].b].y );
          var uv_c2 = new THREE.UV( 1-Tvertices[Tfaces[f].a].x, 1-Tvertices[Tfaces[f].a].y );
          
          // wall side 1
          geometry.faces.push( Tfaces[f] );
          geometry.faceVertexUvs[0].push([ uv_a1, uv_b1, uv_c1 ]);
          // wall side 2
          geometry.faces.push(new THREE.Face3(Tfaces[f].c+wall1verticesLength, Tfaces[f].b+wall1verticesLength, Tfaces[f].a+wall1verticesLength ) );
          geometry.faceVertexUvs[0].push([ uv_a2, uv_b2, uv_c2 ]);
        }
        // wall top
        var mId = geometry.vertices.length;
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(sm.x,sm.y,heightOfGround   )));
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(sm.x,sm.y,heightOfGround+sh)));
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(em.x,em.y,heightOfGround   )));
        geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(em.x,em.y,heightOfGround+eh)));
        geometry.faces.push(new THREE.Face3(s1id, s2id, mId+1) );
        geometry.faces.push(new THREE.Face3(e2id, e1id, mId+3) );
        
        for( var e = 0; e < sourrounding.length; e++ )
        {
          var id1 = sourrounding[e                        ].id;
          var id2 = sourrounding[(e+1)%sourrounding.length].id;
          geometry.faces.push(new THREE.Face3( id1, id2                      , id1 + wall1verticesLength) );
          geometry.faces.push(new THREE.Face3( id2, id2 + wall1verticesLength, id1 + wall1verticesLength) );
        }
        
        // hole sides
        for( var hta = 0; hta < holesToAdd.length; hta++ )
        {
          for( var e = 0; e < holesToAdd[hta].length; e++ )
          {
            var id1 = holesToAdd[hta][e                        ].id;
            var id2 = holesToAdd[hta][(e+1)%sourrounding.length].id;
            geometry.faces.push(new THREE.Face3( id1, id2                      , id1 + wall1verticesLength) );
            geometry.faces.push(new THREE.Face3( id2, id2 + wall1verticesLength, id1 + wall1verticesLength) );
          }
        }
        
        geometry.computeFaceNormals();
        var mesh = new THREE.Mesh(geometry, cubeMaterial);
        mesh.castShadow    = true;
        mesh.receiveShadow = true;
        //mesh.doubleSided = true;
        wallGroup.add(mesh);
      } // end for( j=0; j<floorWalls.length; j++ )
      Object3D.add( lineGroup );
      Object3D.add( wallGroup );
      
      self.buildingProperties.floor[floorCount].Object3D = Object3D;
      self.buildingProperties.floor[floorCount].nodeGroup = nodeGroup;
      self.buildingProperties.floor[floorCount].lineGroup = lineGroup;
      self.buildingProperties.floor[floorCount].wallGroup = wallGroup;
      self.buildingProperties.Object3D.add( Object3D ); // add / link; note: we use that JavaScript is not copying objects but uses ref counting on them here!
      
      heightOfGround += floorheight;
    }  // end floor
    
    self.buildingProperties.x_center =  (self.buildingProperties.x_max -  self.buildingProperties.x_min) / 2;
    self.buildingProperties.y_center =  (self.buildingProperties.y_max -  self.buildingProperties.y_min) / 2;
    self.buildingProperties.size = Math.max( self.buildingProperties.x_center, self.buildingProperties.y_center );
    imageCenter.x = self.buildingProperties.x_center;
    imageCenter.y = self.buildingProperties.y_center;
    imageCenter.z = self.buildingProperties.z_max / 2;
    
    self.show3D( 35*Math.PI/180, 30*Math.PI/180, 10, new THREE.Vector3( imageCenter.x, imageCenter.y, imageCenter.z ) );
    //}
  };
  
  /**
   * Get the URL url and set up this object by its content
   * @param {String} url
   */
  this.loadFloorPlan = function( url )
  {
    $.ajax({
      url: url,
      context: self,
      success: function( xmlDoc ){ parseXMLFloorPlan( xmlDoc ); },
      dataType: 'xml',
      async: false
    });
  }

  /**
   * Fill the <code>floorNodes</code> structure with the nodes from the
   * config file.
   * @method parseFloorNodes
   * @private
   * @param {XMLDom} node
   * @param {Float}  floorheight The generic height of this floor that might be
   *                             overwritten by individual nodes.
   */
  var parseFloorNodes = function( nodes, floorheight )
  {
    for( var i=0; i < nodes.childNodes.length; i++ )
    {
      var node = nodes.childNodes[i];
      if (node.nodeType != ELEMENT_NODE) continue;
      
      var id = node.getAttribute('id');
      var point = new Object;
      point.x  = Number( node.getAttribute('x') );
      point.y  = Number( node.getAttribute('y') );
      point.z  = Number( node.hasAttribute('z') ? node.getAttribute('z') : floorheight );
      point.neighbour = new Array;
      
      floorNodes[id] = point;
      
      if( undefined == self.buildingProperties.x_min ) 
      {
        self.buildingProperties.x_min = point.x;
        self.buildingProperties.x_max = point.x;
        self.buildingProperties.y_min = point.y;
        self.buildingProperties.y_max = point.y;
        self.buildingProperties.z_min = point.z;
        self.buildingProperties.z_max = point.z;
      } else {
        if( self.buildingProperties.x_min > point.x ) self.buildingProperties.x_min = point.x;
        if( self.buildingProperties.x_max < point.x ) self.buildingProperties.x_max = point.x;
        if( self.buildingProperties.y_min > point.y ) self.buildingProperties.y_min = point.y;
        if( self.buildingProperties.y_max < point.y ) self.buildingProperties.y_max = point.y;
        if( self.buildingProperties.z_min > point.z ) self.buildingProperties.z_min = point.z;
        if( self.buildingProperties.z_max < point.z ) self.buildingProperties.z_max = point.z;
      }
    }
  }
  
  /**
   * Fill the <code>floorWalls</code> structure with the wall elements from the
   * config file.
   * @method parseFloorWalls
   * @private
   * @param {XMLDom} nodeGroup
   */
  var parseFloorWalls = function( nodes )
  {
    for( var i=0; i < nodes.childNodes.length; i++ )
    {
      var node = nodes.childNodes[i];
      if (node.nodeType != ELEMENT_NODE) continue;
      
      /**
       * Contain all informations known about a wall.
       * @class wall
       * @for JSFloorPlan3D
       */
      var wall = new Object;
      /**
       * @property start ID of the start node
       * @type ID-String
       */
      wall.start       = node.getAttribute('start'      );
      /**
       * @property startVertex
       * @type Array
       */
      wall.startVertex = new Array;
      /**
       * @property startOffset Offset at the start node
       * @type Array
       */
      wall.startOffset = Number( node.getAttribute('startoffset') );
      /**
       * @property end ID of the end node
       * @type ID-String
       */
      wall.end         = node.getAttribute('end'        );
      /**
       * @property endVertex 
       * @type Array
       */
      wall.endVertex   = new Array;
      /**
       * @property endOffset Offset at the end node
       * @type Float
       */
      wall.endOffset   = Number( node.getAttribute('endoffset'  ) );
      /**
       * @property thickness Thickness of the wall
       * @type Float
       */
      wall.thickness   = Number( node.getAttribute('thickness'  ) );
      /**
       * @property texture ID of the texture
       * @type ID-String
       */
      wall.texture     = node.getAttribute('texture'    );
      if( !wall.texture ) wall.texture = 0;
      
      /**
       * @property holes Array containing all holes in the wall
       * @type Array
       */
      wall.holes       = new Array;
      for( var j=0; j < node.childNodes.length; j++ )
      {
        var hole = node.childNodes[j];
        if (hole.nodeType != ELEMENT_NODE) continue;
        
        var thishole = new Object;
        thishole.id       = hole.getAttribute('id');
        thishole.distance = Number( hole.getAttribute('distance') );
        thishole.width    = Number( hole.getAttribute('width'   ) );
        thishole.paparet  = Number( hole.getAttribute('paparet' ) );
        thishole.lintel   = Number( hole.getAttribute('lintel'  ) );
        wall.holes.push( thishole );
      }
      
      floorWalls[floorWalls.length] = wall;
    }
  }
  
  /**
   * Fill the <code>rooms</code> array with the room elements from the
   * config file.
   * @method parseFloorRooms
   * @for JSFloorPlan3D
   * @private
   * @param {XMLDom} nodeGroup
   * @param {Integer} floor    The floor number.
   */
  var parseFloorRooms = function( nodes, floor )
  {
    rooms[floor] = new Array;
    for( var i=0; i < nodes.childNodes.length; i++ )
    {
      var node = nodes.childNodes[i];
      if (node.nodeType != ELEMENT_NODE) continue;
      
      var room = new Object;
      room.name = node.getAttribute('name');
      room.zones = new Array;
      room.center = { x: 0, y: 0 };
      var centerCount = 0;
      var min = {};
      var max = {};
      
      for( var j=0; j < node.childNodes.length; j++ )
      {
        var zone = node.childNodes[j];
        if (zone.nodeType != ELEMENT_NODE) continue;
        
        var thiszone = new Object;
        thiszone.onclick = zone.getAttribute('onclick');
        thiszone.name    = zone.getAttribute('name'   );
        thiszone.corners = new Array;
        
        for( var k=0; k < zone.childNodes.length; k++ )
        {
          var corner = zone.childNodes[k];
          if (corner.nodeType != ELEMENT_NODE) continue;
          var id = corner.getAttribute('nodeid')
          thiszone.corners.push( id );
          var x = floorNodes[ id ].x;
          var y = floorNodes[ id ].y;
          room.center.x += x;
          room.center.y += y;
          if( x < min.x || (!min.x) ) min.x = x;
          if( y < min.y || (!min.y) ) min.y = y;
          if( x > max.x || (!max.x) ) max.x = x;
          if( y > max.y || (!max.y) ) max.y = y;
          centerCount++;
        }
        room.zones.push( thiszone );
      }
      room.center.x /= centerCount;
      room.center.y /= centerCount;
      var min_dist = Math.sqrt( (room.center.x - min.x)*(room.center.x - min.x) + (room.center.y - min.y)*(room.center.y - min.y) );
      var max_dist = Math.sqrt( (room.center.x - max.x)*(room.center.x - max.x) + (room.center.y - max.y)*(room.center.y - max.y) );
      room.size = min_dist < max_dist ? max_dist : min_dist;
      rooms[floor].push( room );
    }
  }
  
  /**
   * Dummy routine to handle textures.
   * @method parseTextures
   * @private
   * @param {XMLDom} nodes
   */
  var parseTextures = function( nodes )
  {
    return; // FIXME - this is currently a dummy...
    for( var i=0; i < nodes.childNodes.length; i++ )
    {
      node = nodes.childNodes[i];
      if (node.nodeType != ELEMENT_NODE) continue;
    }
  }
  
  /**
   * Setup the whole scene
   * @method setup3D
   * @private
   */
  function setup3D( currentThis, thisObject3D )
  { 
    if( noFloorplan ) return;
    noSetup = false;
    
    ///////////////////////////////////////////////////////////////////////////
    // set the scene size
    
    // set some camera attributes
    var ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;
    
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    camera = new THREE.PerspectiveCamera(
                      VIEW_ANGLE,
                      ASPECT,
                      NEAR,
                      FAR );
    scene = new THREE.Scene();
    scene.add( camera );
    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    
    // enable shadows
    var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
    renderer.shadowCameraNear = 0.1;
    renderer.shadowCameraFar = 100;
    renderer.shadowCameraFov = 45;
    
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = SHADOW_MAP_WIDTH;
    renderer.shadowMapHeight = SHADOW_MAP_HEIGHT;
    renderer.shadowMapEnabled = true;
    //renderer.shadowMapSoft = true;
    
    // create a point light
    pointLight = new THREE.PointLight( 0xFFFFFF );
    
    ambientLight = new THREE.AmbientLight( 0xFFFFFF );
    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    
    // add to the scene
    //scene.add(pointLight);
    
    sunLight =  new THREE.SpotLight( 0xffffff );
    sunLight.position.set( 0, 1500, 1000 );
    sunLight.target.position.set( 0, 0, 0 );
    sunLight.castShadow = true;
    var sunLightView = new THREE.Geometry(); 
    sunLightView.vertices.push( new THREE.Vertex( sunLight.position ) ); 
    sunLightView.vertices.push( new THREE.Vertex( sunLight.target.position ) ); 
    sunLightViewLine = new THREE.Line( sunLightView, lineMaterial );
    scene.add( sunLightViewLine );
    ///////////////////////////////////////////////////////////////////////////
    
    scene.add( thisObject3D );
    
    
    ///////////
    scene.add(sunLight);
    //scene.add(pointLight);
    scene.add(ambientLight);
    //scene.add( camera );
    var $container = $(container);
    // attach the render-supplied DOM element
    $container.append(renderer.domElement);
  }
  
  /**
   * Set up the camera.
   * @method setupCamera
   * @param {Number} azimut
   * @param {Number} elevation
   * @param {Number} distance
   * @param {THREE.Vector3} target
   * @private
   */
  function setupCamera( azimut, elevation, distance, target )
  {
    var cx = Math.sin(azimut) * Math.cos(elevation);
    var cy = Math.cos(azimut) * Math.cos(elevation);
    var cz = Math.sin(elevation);
    camera.up = new THREE.Vector3( -Math.sin(azimut) * Math.sin(elevation), -Math.cos(azimut) * Math.sin(elevation), Math.cos(elevation) );
    camera.position = new THREE.Vector3( cx*distance + target.x, cy*distance + target.y, distance * cz + target.z );
    camera.lookAt( target );
    pointLight.position = camera.position;
  }
  
  /**
   * Render the scene
   * @method render
   */
  this.render = function()
  {
    renderer.render( scene, camera );
  }
  
  /**
   * Change an internal state
   * @method setState
   * @param {String} property The property to set
   * @param {String} value    The new value for the property
   * @param {Bool}   redraw   Redraw the scene if true
   */
  this.setState = function( property, value, redraw )
  {
    switch( property )
    {
      case 'showWireframe':
        cubeMaterial.wireframe = value;
        break;
         
      case 'fillColor':
        cubeMaterial.color.setHex( parseInt( value, 16 ) );
        break;
        
      case 'showFloor':
        value = parseInt( value );
    }
    
    showStates[ property ] = value;
    
    if( redraw ) // is set and true
    {
      update3D();
    }
  }
  
  /**
   * Get the value of an internal state
   * @method getState
   * @return The value of the state
   */
  this.getState = function( property )
  {
    return showStates[ property ];
  }
  
  /**
   * Resize the canvas. This might be done explicit by passing a width and
   * height. Or implicit by passing no parameter or just the redraw parameter.
   * @method resize
   * @param {Number} width
   * @param {Number} height
   * @param {Bool}   redraw
   */
  this.resize = function( width, height, redraw )
  {
    if( arguments.length === 2 || arguments.length === 3 )
    {
      WIDTH  = width;
      HEIGHT = height;
    } else {
      WIDTH  = container.find('canvas').width();
      HEIGHT = container.find('canvas').height();
      redraw = width; // the first and only parameter is now the "redraw"
    }
    ASPECT = WIDTH / HEIGHT;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = ASPECT;
    
    if( redraw ) // is set and true
    {
      update3D();
    }
  }
  
  /**
   * Show or hide a floor
   * @mthod hideFloor
   * @param {Number} floorNr The number of the floor to change visibility
   * @param {Bool}   doShow  <code>true</code> if floor has to be visible, 
   *                         <code>false</code> if it has to be hidden
   */
  this.hideFloor = function( floorNr, doShow )
  {
    THREE.SceneUtils.traverseHierarchy( self.buildingProperties.floor[floorNr].wallGroup, function( object ) {
      object.visible = doShow; 
    });
  }
  
  /**
   * Show the floor plan by updating the relevant view parameters and calling
   * the render() method
   * @method show3D
   * @param {Integer} azmiut       The direction of the camera. 0° = North, 
   *                               90° = East.
   * @param {Integer} elevation    The amount of tilting the view. 0° = no tilt, 
   *                               90° = bird eyes view
   * @param {Number}  distnce      Distance between camera and <code>target</code>
   * @param {THREE.Vector3} target The point to look at
   */
  this.show3D = function( azimut, elevation, distance, target )
  {
    showStates.currentAzimut    = azimut;
    showStates.currentElevation = elevation;
    showStates.currentDistance  = distance;
    showStates.currentTarget    = target.clone(); //JSFloorPlan3D.buildingProperties.x_center;
    
    if( noSetup ) setup3D( this, this.buildingProperties.Object3D );
    
    update3D();
  }
  
  /**
   * Update internal
   * @method update3D
   * @private
   */
  function update3D()
  {
    // set up camera
    setupCamera( showStates.currentAzimut, showStates.currentElevation, showStates.currentDistance, showStates.currentTarget );
    
    // set up sun
    var sx = Math.sin(showStates.lightAzimut) * Math.cos(showStates.lightElevation);
    var sy = Math.cos(showStates.lightAzimut) * Math.cos(showStates.lightElevation);
    var sz = Math.sin(showStates.lightElevation);
    sunLight.target.position = showStates.currentTarget;
    sunLight.position = new THREE.Vector3( sx * showStates.lightDistance, sy * showStates.lightDistance, sz * showStates.lightDistance + showStates.currentTarget.z );
    sunLight.intensity = showStates.lightStrength / 100.0;
    sunLightViewLine.geometry.vertices[0].position = sunLight.position;
    sunLightViewLine.geometry.vertices[1].position = sunLight.target.position;
    sunLightViewLine.geometry.__dirtyVertices = true;
    
    if( showStates.showLightView )
    {
      camera.position = sunLight.position;
      camera.lookAt( sunLight.target.position );
    }
    
    // update opacity
    if( cubeMaterial.opacity != showStates.fillOpacity )
    {
      cubeMaterial.opacity = showStates.fillOpacity;
      cubeMaterial.transparent = showStates.fillOpacity < 1.0;
      cubeMaterial.depthTest   = !cubeMaterial.transparent;
      THREE.SceneUtils.traverseHierarchy( self.buildingProperties.Object3D, function( object ) {
        object.doubleSided = cubeMaterial.transparent; 
      });
    }
    
    self.render();
  }
  
  /**
   * Move the displayed part of the floor plan to a new part
   * @method moveTo
   * @param {Integer}  floor       The number of the floor to show
   * @param {Integer}  azmiut      The direction of the camera. 0° = North,
   *                               90° = East.
   * @param {Integer}  elevation   The amount of tilting the view. 0° = no tilt, 
   *                               90° = bird eyes view
   * @param {Number}   distance    The distance of the camera
   * @param {THREE.Vector3} target The point to look at (only <code>x</code>
   *                               and <code>y</code> are used the <code>z</code>
   *                               is taken from the parameter <code>floor</code>
   * @param {Function} animateFn   (optional) Function to call during each animation step
   * @param {Function} delayedFn   (optional) Function to call after animation is
   *                               finished
   * @param {Bool}     animate     Animate unless set to false
   */
  this.moveTo = function( floor, azimut, elevation, distance, target, animateFn, delayedFn, animate )
  {
    if( noSetup ) setup3D( this.buildingProperties.Object3D );
    
    // speed of the changing
    var steps = (animate == undefined || !animate) ? 1 : 100;
    var rate = { azimut: 0.0, elevation: 0.0, distance: 0.0, target: new THREE.Vector3 };
    
    function calcRate()
    {
      rate.azimut    = ( azimut    - showStates.currentAzimut    ) / steps;
      rate.elevation = ( elevation - showStates.currentElevation ) / steps;
      rate.distance  = ( distance  - showStates.currentDistance  ) / steps;
      rate.target.sub( target, showStates.currentTarget );
      rate.target.multiplyScalar( 1.0 / steps );
      return ( 
        ( Math.abs( rate.azimut    * steps ) < 1e-5 ) &&
        ( Math.abs( rate.elevation * steps ) < 1e-5 ) &&
        ( Math.abs( rate.distance  * steps ) < 1e-4 ) &&
        ( Math.abs( rate.target.x  * steps ) < 1e-4 ) &&
        ( Math.abs( rate.target.y  * steps ) < 1e-4 ) &&
        ( Math.abs( rate.target.z  * steps ) < 1e-4 )
      );
    }
    
    function doMove()
    {
      JSFloorPlan3D.inAnimation = true;
      var done = true;
      if( (showStates.currentAzimut + rate.azimut) * rate.azimut < azimut * rate.azimut )
      {
        showStates.currentAzimut     += rate.azimut;
        done = false;
      } else {
        showStates.currentAzimut = azimut;
      }
      if( (showStates.currentElevation + rate.elevation) * rate.elevation < elevation * rate.elevation )
      {
        showStates.currentElevation += rate.elevation;
        done = false;
      } else {
        showStates.currentElevation = elevation;
      }
      if( (showStates.currentDistance + rate.distance) * rate.distance < distance * rate.distance )
      {
        showStates.currentDistance  += rate.distance;
        done = false;
      } else {
        showStates.currentDistance = distance;
      }
      if( (showStates.currentTarget.x + rate.target.x) * rate.target.x < target.x * rate.target.x )
      {
        showStates.currentTarget.x += rate.target.x;
        done = false;
      } else {
        showStates.currentTarget.x = target.x;
      }
      if( (showStates.currentTarget.y + rate.target.y) * rate.target.y < target.y * rate.target.y )
      {
        showStates.currentTarget.y += rate.target.y;
        done = false;
      } else {
        showStates.currentTarget.y = target.y;
      }
      if( (showStates.currentTarget.z + rate.target.z) * rate.target.z < target.z * rate.target.z )
      {
        showStates.currentTarget.z += rate.target.z;
        done = false;
      } else {
        showStates.currentTarget.z = target.z;
      }
      
      setupCamera( showStates.currentAzimut, showStates.currentElevation, showStates.currentDistance, showStates.currentTarget );
      renderer.render( scene, camera );
      if( animateFn ) animateFn();
      
      if( !done ) 
        window.requestAnimationFrame( doMove );
      else {
        JSFloorPlan3D.inAnimation = false;
        if( delayedFn )
          delayedFn();
      }
    }
    
    calcRate();
    if( !JSFloorPlan3D.inAnimation )
      doMove();
  }
  
  /**
   * Move display to the given room on the given floor. If <code>room</code>
   * is undefined, the whole floor will be shown.
   * @method moveToRoom
   * @param {Number}   floor
   * @param {Room}     room
   * @param {Bool}     hideOtherFloors
   * @param {Bool}     animate
   * @param {Function} animateFn Callback
   * @param {Function} delayedFn Callback
   * @return {THREE.Vector3} Target
   */
  this.moveToRoom = function( floor, room, hideOtherFloors, animate, animateFn, delayedFn )
  {
    var target = new THREE.Vector3();
    var dist;
    if( typeof floor === 'string' )
    {
      floor = this.buildingProperties.floorNames[floor];
    }
    if( !(floor in this.buildingProperties.floor) )
      return target; // early exit when floor is invalid
      
    if( room ) // use room if defined
    {
      target.x = room.center.x;
      target.y = room.center.y;
      dist = room.size / Math.tan( VIEW_ANGLE * Math.PI/180 / 2 );
    } else {   // use whole floor otherwise
      target.x = this.buildingProperties.x_center;
      target.y = this.buildingProperties.y_center;
      dist = this.buildingProperties.size / Math.tan( VIEW_ANGLE * Math.PI/180 / 2 );
    }
    target.z = this.buildingProperties.floor[ floor ].heightOfGround + 
               this.buildingProperties.floor[ floor ].height / 2;
    if( hideOtherFloors )
    {
      // show relevant floors
      var minFloor = floor < showStates.showFloor ? floor : showStates.showFloor;
      var maxFloor = floor < showStates.showFloor ? showStates.showFloor : floor;
      var f = self.buildingProperties.floor.length-1;
      for( ; f >= 0; f-- ) self.hideFloor( f, minFloor <= f && f <= maxFloor );
    }
    this.moveTo( floor, showStates.currentAzimut, showStates.currentElevation, dist, target, animateFn,
      function(){
        if( hideOtherFloors )
        {
          // hide all except target floors
          var f = self.buildingProperties.floor.length-1;
          for( ; f >= 0; f-- ) self.hideFloor( f, f == floor );
        }
        self.render();
        if( delayedFn !== undefined ) delayedFn();
      }, animate );
    showStates.showFloor = floor;
    return target;
  }
  
  /**
   * Check if point <code>p</code> is in the zone <code>zone</code>. It's 
   * basically a point-in-polygon test using a ray casting from left infinity to
   * the point <code>p</code>.
   * @method pointInZone
   * @private
   * @param {THREE.Vector3} p     The point to check (note: only the 
   *                              <code>x</code> and <code>y</code> corrdinates 
   *                              are checked
   * @param {Number} zone         The zone to check
   * @return {Bool}               True when point <code>p</code> is inside
   */
  function pointInZone( p, zone )
  {
    var crossing = 0;
    var prevCorner = floorNodes[ zone.corners[zone.corners.length-1] ];
    for( var i in zone.corners )
    {
      var corner = floorNodes[ zone.corners[i] ];
      if(                                                // only intersection if
        (prevCorner.x < p.x || corner.x < p.x )          // at least one point is left
        &&                                               // and
        ( (prevCorner.y - p.y) * (corner.y - p.y) < 0 )  // one corner is above and the other below
      )
      {
        crossing++;
      }
      prevCorner = corner;
    }
    return crossing % 2; // odd number of crossings == inside
  }
  
  /**
   * Figur out the room that contains the point <code>p</code> in the floor.
   * <code>floor</code>.
   * @method selectRoom
   * @param {THREE.Vector3} p     The point to check (note: only the 
   *                              <code>x</code> and <code>y</code> corrdinates 
   *                              are checked
   * @param {Number}        floor The number of the floor to check
   * @return {Object} If a zone / room was found a hash with the keys "room" and
   *                  "zone" will be returned otherwise an empty Object.
   */
  this.selectRoom = function( p, floor )
  {
    var thisFloor = rooms[floor];
    for( var room in thisFloor )
    {
      var thisRoom = thisFloor[room];
      for( var zone in thisRoom.zones )
      {
        if( pointInZone( p, thisRoom.zones[zone] ) )
        {
          return { room: thisFloor[room], zone: thisRoom.zones[zone] };
        }
      }
    }
    return {};
  }
  
  /**
   * Project screen coordinate to building space.
   * @method sceen2building
   * @param {Number} x x position in pixel
   * @param {Number} y y position in pixel
   * @param {Number} h Height in building space used for mapping
   * @return {THREE.Vector3} Point in building space
   */
  this.sceen2building = function( x, y, h )
  {
    var vector = new THREE.Vector3( (x / WIDTH)*2-1, -(y / HEIGHT)*2+1, 0.5 );
    projector.unprojectVector( vector, camera );
    var dirVec = vector.subSelf( camera.position ).normalize()
    var d = (h - camera.position.z) / dirVec.z;
    return new THREE.Vector3( camera.position.x + d * dirVec.x, camera.position.y + d * dirVec.y, camera.position.z + d * dirVec.z );
  }
  
  /**
   * Project point in building space to screen space.
   * @method building2screen
   * @param {THREE.Vector3} p point in building space to map
   * @return {Object} Hash with keys <code>x</code> and <code>y</code> in screen
   *                  coordinates
   */
  this.building2screen = function( p )
  {
    var screen = p.clone();
    projector.projectVector( screen, camera );
    return { x: (screen.x+1)/2*WIDTH, y: -(screen.y-1)/2*HEIGHT };
  }
  
  /**
   * This method can be used as an event handler for mouse events.
   * @method translateMouseEvent
   * @param {Event}    event               The jQuery event object.
   * @param {Function} event.data.callback This callback function will be called
   *                                       after the mouse event was translated
   */
  this.translateMouseEvent = function( event )
  {
    var tJSFloorPlan3D = event.data.JSFloorPlan3D;
    var thisFloor = tJSFloorPlan3D.buildingProperties.floor[showStates.showFloor];
    var height = thisFloor.heightOfGround + thisFloor.height;
    var intersec = tJSFloorPlan3D.sceen2building( event.offsetX, event.offsetY, height );
    event.room = tJSFloorPlan3D.selectRoom( intersec, showStates.showFloor );
    if( event.data.callback ) event.data.callback( event );
  }
  
    if (typeof floorPlan === "string") 
    {
      this.loadFloorPlan( floorPlan );
    }
  };
  // library local variables
  
  //Expose dQuery object to window as dQuery or JSlib
  window.JSFloorPlan3D = JSFloorPlan3D;
})(window);

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @class requestAnimationFrame
 */
if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
        window.setTimeout( callback, 1000 / 60 );
    };
  } )();
}