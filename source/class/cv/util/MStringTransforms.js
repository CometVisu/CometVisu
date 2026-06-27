/*
 * Copyright (c) 2023-2026, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 *
 */

/**
 * Provides all transform helper functions for converting a string value,
 * to other scalar property types.
 *
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Mixin.define('cv.util.MStringTransforms', {

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _parseInt(val) {
      if (typeof val === 'string') {
        const intVal = parseInt(val, 10);
        return Number.isNaN(intVal) ? 0 : intVal;
      }
      if (typeof val === 'number') {
        return Math.round(val);
      }
      return Number.NaN;
    },

    _parseFloat(val) {
      if (typeof val === 'string') {
        const floatVal = parseFloat(val);
        return Number.isNaN(floatVal) ? 0.0 : floatVal;
      }
      if (typeof val === 'number') {
        return val;
      }
      return Number.NaN;
    },

    _parseBoolean(val) {
      if (typeof val === 'string') {
        return val === 'true';
      }
      if (typeof val === 'boolean') {
        return val;
      }
      return false;
    }
  }
});
