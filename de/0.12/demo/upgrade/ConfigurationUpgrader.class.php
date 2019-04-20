<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Upgrade a Configuration from a previous version to the most current.
 *
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    upgrade
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2013 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2013-01-22
 */

// get the current library version
require_once('../library_version.inc.php');

/**
 * the library-version the upgrader understands
 * @const   integer
 */
define('UPGRADER_LIBRARY_VERSION', 8);


/**
 * this class will do all of the upgrading to the actual DOM
 */
class ConfigurationUpgrader {
    
    /**
     * the configuration-DOM
     * @var object
     */
    protected $objDOM;
    
    /**
     * the old lib version of the configuration
     * @var integer
     */
    protected $intLibVersion;
    
    /**
     * list of messages
     * @var array
     */
    protected $arrMessages = array();
    
    /**
     * convert-success
     * @var boolean
     */
    protected $boolSuccess = true;
    
    /**
     * construct.
     * 
     * @param   object  $objDOM         DOMDocument of the configuration
     * @param   integer $intLibVersion  Version the configuration currently has
     */
    public function __construct($objDOM, $intLibVersion) {
        $this->objDOM = $objDOM;
        $this->intLibVersion = $intLibVersion;
    }
    
    /**
     * start the upgrade
     */
    public function runUpgrade() {
        	$intVersionCounter = $this->intLibVersion;
    	while ($intVersionCounter < LIBRARY_VERSION) {
    		switch ($intVersionCounter) {
    			case 0:
    				$this->upgrade0To1();
    				break;
    			case 1:
    				$this->upgrade1To2();
    				break;
    			case 2:
    				$this->upgrade2To3();
    				break;
    			case 3:
    				$this->upgrade3To4();
    				break;
    			case 4:
    				$this->upgrade4To5();
    				break;
    			case 5:
    				$this->upgrade5To6();
    				break;
                        case 6:
                                $this->upgrade6To7();
                                break;
                        case 7:
    				$this->upgrade7To8();
    				break;
    		}
    		$intVersionCounter++;
    	}

    	// 'we were here'
        $this->objDOM->getElementsByTagName("pages")->item(0)->setAttribute('lib_version', LIBRARY_VERSION);
        
        return $this->boolSuccess;
    }
    
    /**
     * get the DOMDocument; if runUpgrade was run, this will return the resulting DOM
     * 
     * @return  object  the DOMDocument
     */
    public function getConfigurationDOM() {
        return $this->objDOM;
    }
    
    /**
     * get the log
     * 
     * @return  array   list of log-messages
     */
    public function getLog() {
        return $this->arrMessages;
    }
    
    
    /**
     * do all necessary changes from version 0 to version 1
     */
    protected function upgrade0To1() {
        // @see http://cometvisu.de/wiki/index.php?title=CometVisu/Update
        
        $objXPath = new DOMXPath($this->objDOM);
        
        // append namespaces to schema
        $this->objDOM->getElementsByTagName('pages')->item(0)->setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        $this->objDOM->getElementsByTagName('pages')->item(0)->setAttribute('xsi:noNamespaceSchemaLocation', '../visu_config.xsd');
        
        // rename iframe to web
        $objElements = $objXPath->query('//iframe');
        $i = 0;
        foreach ($objElements as $objElement) {
            $this->renameNode($objElement, 'web');
            ++$i;
        }
        $this->log('renamed ' . $i . ' nodes of type \'iframe\' to \'web\'');
        unset($objElements, $i);
        
        // change diagram_popup to diagram
		$objElements = $objXPath->query('//diagram_popup');
		$i = 0;
		foreach ($objElements as $objElement) {
			$objElement->setAttribute('popup', 'true');
			$objElement->setAttribute('previewlabels', 'false');
			$objElement->setAttribute('legend', 'popup');
			$this->renameNode($objElement, 'diagram');
			
			++$i;
		}
		$this->log('changed ' . $i . ' nodes of type \'diagram_popup\' to \'diagram\'');
		unset($objElements);

		// change diagram_inline to diagram
		$objElements = $objXPath->query('//diagram_inline');
		$i = 0;
		foreach ($objElements as $objElement) {
			$objElement->setAttribute('popup', 'false');
			$objElement->setAttribute('previewlabels', 'true');
			$objElement->setAttribute('legend', 'none');
			$this->renameNode($objElement, 'diagram');
			++$i;
		}
		$this->log('changed ' . $i . ' nodes of type \'diagram_inline\' to \'diagram\'');
		unset($objElements);

		// move diagram attributes to child-nodes
		$objElements = $objXPath->query('//diagram|//diagram_info');
		$i = 0;
		foreach ($objElements as $objElementNode) {						
			if ($objElementNode->hasAttribute('rrd')) { // create rrdnode
				$objRRDNode = $objElementNode->ownerDocument->createElement('rrd');
				$rrdContent = $objElementNode->ownerDocument->createTextNode($objElementNode->getAttribute('rrd'));
				$objRRDNode->appendChild($rrdContent);
				if ($objElementNode->hasAttribute('linecolor')) {
					$objRRDNode->setAttribute('color', $objElementNode->getAttribute('linecolor'));
				}
				$objElementNode->removeAttribute('rrd');
				$objElementNode->appendChild($objRRDNode);
			}
			if ($objElementNode->hasAttribute('linecolor')) {
				$objElementNode->removeAttribute('linecolor');
			}
			
			$objAxisNode = $objElementNode->ownerDocument->createElement('axis');
			$addAxis=false;
			
			if ($objElementNode->hasAttribute('yaxismin')) {
				$objAxisNode->setAttribute('min', $objElementNode->getAttribute('yaxismin'));
				$objElementNode->removeAttribute('yaxismin');
				$addAxis=true;
			}
			
			if ($objElementNode->hasAttribute('yaxismax')) {
				$objAxisNode->setAttribute('max', $objElementNode->getAttribute('yaxismax'));
				$objElementNode->removeAttribute('yaxismax');
				$addAxis=true;
			}
			
			if ($objElementNode->hasAttribute('unit')) {
				$objAxisNode->setAttribute('unit', $objElementNode->getAttribute('unit'));
				$objElementNode->removeAttribute('unit');
				$addAxis=true;
			}
			
			if ($addAxis) {
				$objElementNode->appendChild($objAxisNode);
			}
			++$i;
		}
		$this->log('moved attributes to childs in  ' . $i . ' nodes of type \'diagram(_info)\' ');
		unset($objElements);
        
        // remove whitespace-attributes
        $objAttributes = $objXPath->query('//@*[.=\' \']');
        $i = 0;
        foreach ($objAttributes as $objAttribute) {
            $objAttribute->ownerElement->removeAttributeNode($objAttribute);
            ++$i;
        }
        $this->log('removed ' . $i . ' empty-like attributes');

        
        // remove empty attributes
        $objAttributes = $objXPath->query('//@*[.=\'\']');
        $i = 0;
        foreach ($objAttributes as $objAttribute) {
            $objAttribute->ownerElement->removeAttributeNode($objAttribute);
            ++$i;
        }
        $this->log('removed ' . $i . ' empty attributes');        
        
        // encapsulate content of 'text'-nodes in a label
        $objElements = $objXPath->query('//text');
        $i = 0;
        foreach ($objElements as $objElementNode) {
            if ($objElementNode->getElementsByTagName('label')->length > 0) {
                // text-elements that already have a label-element should be left untouched!
                continue;
            } 

            // create a new label and a new text node, append the old elements nodes to them
            $objLabelNode = $objElementNode->ownerDocument->createElement('label');
            $objTextNode = $objElementNode->ownerDocument->createElement('text');
            $objTextNode->appendChild($objLabelNode);
            

            // copy the old text-nodes' attributes tot the new one
            if ($objElementNode->attributes->length > 0) {
                foreach ($objElementNode->attributes as $objAttribute) {
                    $objTextNode->setAttribute($objAttribute->nodeName, $objAttribute->nodeValue);
                }
            } 
        
            // clone-copy all nodes to the newly created nodes
            if ($objElementNode->childNodes->length > 0) {
                foreach ($objElementNode->childNodes as $objChildNode) {
                    // clone the node, so do not disturb the order of elements with the old parent
                    $objNewChildNode = $objChildNode->cloneNode(true);

                    if ($objChildNode->nodeName == 'layout') {
                        // layout goes right into the text node
                        $objTextNode->appendChild($objNewChildNode);   
                    } else {
                        // all of the rest goes into the label-node
                        $objLabelNode->appendChild($objNewChildNode);   
                    }
                }
            }
            
            // replace the old text-node with the new one
            $objElementNode->parentNode->replaceChild($objTextNode, $objElementNode);

            ++$i;
        }
        $this->log('encapsulated content of ' . $i . ' \'text\'-nodes in \'label\'-nodes');        
        
        // encapsulate content of 'diagram_'-nodes in a label
        $objElements = $objXPath->query('//diagram_inline[not(child::*)]|//diagram_popup[not(child::*)]');
        $i = 0;
        foreach ($objElements as $objElementNode) {
            $objLabelNode = $objElementNode->ownerDocument->createElement('label');

            // first, move all nodes to the childnode
            while (true === isset($objElementNode->firstChild)) { 
                $objLabelNode->appendChild($objElementNode->firstChild);
            }
            
            $objElementNode->appendChild($objLabelNode);
            
            ++$i;
        }
        $this->log('encapsulated content of ' . $i . ' \'diagram_*\'-nodes in \'label\'-nodes');  
        
        // FROM readonly / writeonly TO disable/read/write/readwrite
        $objElements = $objXPath->query('//address');
        $i = 0;
        foreach ($objElements as $objElementNode) {
            $boolRead = true;
            $boolWrite = true;
            if ('true' == $objElementNode->getAttribute('readonly')) {
                // readonly means: no write
                $boolWrite = false;
            }
            
            if ('true' == $objElementNode->getAttribute('writeonly')) {
                // writeonly means: no read
                $boolRead = false;
            }
            
            $objElementNode->removeAttribute('readonly');
            $objElementNode->removeAttribute('writeonly');
            
            if ($boolRead && $boolWrite) {
                $objElementNode->setAttribute('mode', 'readwrite');
            }
            if ($boolRead && !$boolWrite) {
                $objElementNode->setAttribute('mode', 'read');
            }
            if (!$boolRead && $boolWrite) {
                $objElementNode->setAttribute('mode', 'write');
            }
            if (!$boolRead && !$boolWrite) {
                $objElementNode->setAttribute('mode', 'disable');
            }
            
            ++$i;
        }
        $this->log('converted ' . $i . ' \'address\'-nodes from readonly/writeonly to \'mode\'');        
        

        // rearrange elements based on new sequence-order
        $arrOrderedElements = array('page', 'group', 'text', 'switch', 'trigger', 'urltrigger', 'infotrigger',
                                    'rgb', 'multitrigger', 'slide', 'info', 'wgplugin_info', 'image', 'imagetrigger',
                                    'video', 'web', 'pagejump', 'colorchooser', 'diagram', 'diagram_inline',
                                    'diagram_popup', 'diagram_info', 'rss', 'rsslog', 'strftime');
        $i = 0;
        
        foreach ($arrOrderedElements as $strElementName) {
            $objElements = $objXPath->query('//' . $strElementName);
            
            foreach ($objElements as $objElementNode) {
                // sort the elements children
                
                // first, have an array of the items
                // do not worry: these are objects, they are references by default
                $arrChildNodes = array();
                foreach ($objElementNode->childNodes as $objChildNode) {
                    $arrChildNodes[] = $objChildNode;
                }
                
                // next: clean up the element itself
                foreach ($arrChildNodes as $objChildNode) {
                    $objElementNode->removeChild($objChildNode);
                }
                
                // now sort
                $this->mergesort($arrChildNodes, array($this, 'upgrade0To1SortHelper'));
                
                // after sorting: append all children again. man, this sucks.
                foreach ($arrChildNodes as $objChildNode) {
                    $objElementNode->appendChild($objChildNode);
                }

                ++$i;
            }
        }
        $this->log('checked and partially sorted ' . $i . ' nodes children');        
    }

    /**
     * do all necessary changes from version 1 to version 2
     */
    protected function upgrade1To2() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // modify infotrigger's infoposition attribute
        $objElements = $objXPath->query('//infotrigger');
        $i = 0;
        foreach ($objElements as $objElementNode) {
        	if ($objElementNode->hasAttribute('infoposition')) {
        		$infopos = "left";
            	switch ($objElementNode->getAttribute('infoposition')) {
            		case "1":
            			$infopos = "middle";
            			break;
            		case "2":
            			$infopos = "right";
            			break;
            	}
            	$objElementNode->setAttribute('infoposition', $infopos);
            	++$i;
        	}
        }
        $this->log('converted ' . $i . ' \'infotrigger\'-nodes with infoposition attribute');        
    }

    /**
     * do all necessary changes from version 2 to version 3
     */
    protected function upgrade2To3() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // modify infotrigger's infoposition attribute
        $objElements = $objXPath->query('//designtoggle');
        $i = 0;
        foreach ($objElements as $objElementNode) {
        	$textValue = $objElementNode->textContent;

        	// next: clean up the element itself
        	foreach ($objElementNode->childNodes as $objChildNode) {
        		$objElementNode->removeChild($objChildNode);
        	}

        	// create a new label element in case of given text
            if (strlen($textValue) > 0) {
            	$objLabelNode = $objElementNode->ownerDocument->createElement('label');
            	$objLabelNode->appendChild(new DOMText($textValue));
            	$objElementNode->appendChild($objLabelNode);
            }

            ++$i;
        }
        $this->log('converted ' . $i . ' \'designtoggle\'-nodes with text content');        
    }

    /**
     * do all necessary changes from version 3 to version 4
     */
    protected function upgrade3To4() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // move diagram's datasource attribute to the rrd
		$objElements = $objXPath->query('//diagram|//diagram_info');
        $i = 0;
        foreach ($objElements as $objElementNode) {
        	if ($objElementNode->hasAttribute('datasource')) {
        		$datasource = $objElementNode->getAttribute('datasource') ;
				$objElementNode->removeAttribute('datasource');
        		foreach ($objElementNode->childNodes as $objChildNode) {
        			if ($objChildNode->nodeName == 'rrd' && !$objChildNode->hasAttribute('datasource')) {
        				$objChildNode->setAttribute('datasource', $datasource);
        				++$i;
        			}
        		}
        	}
        }
        $this->log('converted ' . $i . ' \'rrd\'-nodes');        
    }

    /**
     * do all necessary changes from version 4 to version 5
     */
    protected function upgrade4To5() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // remove address' type attributes
		$objElements = $objXPath->query('//address');
        $i = 0;
        foreach ($objElements as $objElementNode) {
        	if ($objElementNode->hasAttribute('type')) {
				$objElementNode->removeAttribute('type');
				++$i;
        	}
        }
        $this->log('converted ' . $i . ' \'address\'-nodes');        
    }

    /**
     * do all necessary changes from version 5 to version 6
     */
    protected function upgrade5To6() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // change rrd datasource attributes
		$objElements = $objXPath->query('//rrd');
        $i = 0;
        foreach ($objElements as $objElementNode) {
            if ($objElementNode->hasAttribute('datasource')) {
        		$datasource = $objElementNode->getAttribute('datasource') ;
				$objElementNode->removeAttribute('datasource');
				$objElementNode->setAttribute('consolidationFunction', $datasource);
				++$i;
            }
        }
        $this->log('converted ' . $i . ' \'rrd\'-nodes');        
    }

    /**
     * do all necessary changes from version 6 to version 7
     */
    protected function upgrade6To7() {
        $objXPath = new DOMXPath($this->objDOM);
    
        // change rrd datasource attributes
        $objElements = $objXPath->query('//group');
        $i = 0;
        foreach ($objElements as $objElementNode) {
            if ($objElementNode->hasAttribute('pagejumptarget')) {
                $target = $objElementNode->getAttribute('pagejumptarget') ;
                $objElementNode->removeAttribute('pagejumptarget');
                $objElementNode->setAttribute('target', $target);
                ++$i;
            }
        }
        $this->log('converted ' . $i . ' \'group\'-nodes');
    }

    /**
     * do all necessary changes from version 7 to version 8
     */
    protected function upgrade7To8() {
        $objXPath = new DOMXPath($this->objDOM);
        
        // delete obsolete gweather plguin
        $objElements = $objXPath->query('//plugins')->item(0);
        $i = 0;
        foreach ($objElements->childNodes as $objElementNode) {
          if( $objElementNode->nodeName == 'plugin' && 'gweather' == $objElementNode->getAttribute('name') ) {
            $objElements->removeChild($objElementNode);
            ++$i;
          }
        }
        $this->log('removed ' . $i . ' \'plugin\'-nodes with obsolete plugin (gweather)');
    }
    /**
     * helper-function for sorting of elements
     * 
     * @param   object  $a  DOMNode a
     * @param   object  $b  DOMNode b
     * @return  integer     -1, 1, 0
     */
    protected function upgrade0To1SortHelper($a, $b) {
        
        // the order in which certain elements should appear
        $arrOrder = array('layout', 'label', 'axis', 'rrd', 'address',);
        
        if ($a->nodeName == $b->nodeName) {
            // same name == no re-ordering needed
            return 0;
        }
        
        $intAIndex = array_search($a->nodeName, $arrOrder);
        $intBIndex = array_search($b->nodeName, $arrOrder);

        // make sure that neither a nor b have a value of false, which would be a problem when comparing with 0
        if ($intAIndex === false) {
            $intAIndex = PHP_INT_MAX;
        }        
        if ($intBIndex === false) {
            $intBIndex = PHP_INT_MAX;
        }
        
        // do the comparing
        if ($intAIndex < $intBIndex) {
            return -1;
        }

        if ($intAIndex > $intBIndex) {
            return 1;
        }
        
        return 0;
    }
    
    /**
     * append a log-message to the stack
     * 
     * @param   string  $strMessage the log-message to append
     * @throws  InvalidArgumentException
     */
    protected function log($strMessage) {
        if (true === empty($strMessage)) {
            throw new InvalidArgumentException();
        }
        $this->arrMessages[] = $strMessage;
    }
    
    /**
     * rename a node
     * actually, creates a new node with the new name and sets all of its attributes and children
     * 
     * @param   object  $objNode    the element to rename
     * @param   string  $strName    the new name of the element
     * @throws  InvalidArgumentException
     */
    protected function renameNode($objNode, $strName) {
        if (true === empty($strName)) {
            throw new InvalidArgumentException();
        }
        if (true === empty($objNode)) {
            throw new InvalidArgumentException();
        }
        
        $objNewNode = $objNode->ownerDocument->createElement($strName);
        
        if ($objNode->attributes->length > 0) {
            foreach ($objNode->attributes as $objAttribute) {
                $objNewNode->setAttribute($objAttribute->nodeName, $objAttribute->nodeValue);
            }
        }
        
        while (true === isset($objNode->firstChild)) { 
            $objNewNode->appendChild($objNode->firstChild);
        }
        
        $objNode->parentNode->replaceChild($objNewNode, $objNode);
    }
    
    /**
     * function for sorting of an array by a user-defined function, guaranteed to not harm the original order
     * if two elements are deemed equal.
     * 
     * source: php.net/manual/en/function.usort.php#38827
     * amended to work in object context
     * 
     * @param   array       $array          the array to sort
     * @param   callable    $cmp_function   function to use for comparing
     * @return  nothing really
     */
    protected function mergesort(&$array, $cmp_function = 'strcmp') {
        // Arrays of size < 2 require no action.
        if (count($array) < 2) return;
        // Split the array in half
        $halfway = count($array) / 2;
        $array1 = array_slice($array, 0, $halfway);
        $array2 = array_slice($array, $halfway);
        // Recurse to sort the two halves
        $this->mergesort($array1, $cmp_function);
        $this->mergesort($array2, $cmp_function);
        // If all of $array1 is <= all of $array2, just append them.
        if (call_user_func($cmp_function, end($array1), $array2[0]) < 1) {
            $array = array_merge($array1, $array2);
            return;
        }
        // Merge the two sorted arrays into a single sorted array
        $array = array();
        $ptr1 = $ptr2 = 0;
        while ($ptr1 < count($array1) && $ptr2 < count($array2)) {
            if (call_user_func($cmp_function, $array1[$ptr1], $array2[$ptr2]) < 1) {
                $array[] = $array1[$ptr1++];
            }
            else {
                $array[] = $array2[$ptr2++];
            }
        }
        // Merge the remainder
        while ($ptr1 < count($array1)) $array[] = $array1[$ptr1++];
        while ($ptr2 < count($array2)) $array[] = $array2[$ptr2++];
        return;
    }
    
}


?>
