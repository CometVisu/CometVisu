# CometVisu AI Coding Instructions

CometVisu is a real-time web-based visualization for building automation (smart homes), using modern web technologies to communicate with backends like KNX or OpenHAB.

## Architecture Overview

### Core Framework
- Built on **Qooxdoo Framework** (v7+), a comprehensive JavaScript framework with OOP-style class system
- All classes use `qx.Class.define()` with namespaced names (e.g., `cv.ui.structure.pure.Switch`)
- Uses Qooxdoo's property system, data binding, and event bus (`qx.event.message.Bus`)

### Two UI Structures
1. **Pure Structure** (`source/class/cv/ui/structure/pure/`): Classic DOM-based widgets
   - XML configuration parsed by `cv.parser.pure.WidgetParser`
   - Widgets extend `cv.ui.structure.pure.AbstractWidget` or `cv.ui.structure.pure.AbstractBasicWidget`
   - Controller: `cv.ui.structure.pure.Controller`
   
2. **Tile Structure** (`source/class/cv/ui/structure/tile/`): Modern web component-based
   - Uses custom elements (e.g., `<cv-switch>`, `<cv-page>`)
   - Components defined with `customElements.define()`
   - Template-based grid layout (3x3 grid per tile)
   - Controller: `cv.ui.structure.tile.Controller`

### Backend Communication
- Multiple backend support: KNX (knxd), OpenHAB, MQTT
- `cv.io.BackendConnections` manages all backend clients
- Client classes implement `cv.io.IClient` interface
- Real-time data flow: Backend → `cv.data.Model` (singleton) → Widgets via listeners
- Address-based subscription model for state updates

### Configuration System
- XML-based configuration files (`visu_config.xml`, `visu_config_tile.xml`)
- Schema-validated against XSD files (`source/resource/visu_config.xsd`)
- Supports templating via `cv.TemplateEngine` (singleton)
- Parser classes convert XML to widget instances

## Development Workflow

### Build System
```bash
# Initial setup
npm install
git submodule init && git submodule update

# Development (with auto-recompilation)
npx qx compile --watch

# Production build
npx qx compile --target=build

# Development with PHP server
npm run source
```

### Testing
```bash
# Run all tests (Karma + Jasmine)
grunt karma:debug

# Filter specific tests
grunt karma:debug --grep=<test-name>
```

Test files:
- Unit tests: `source/test/karma/**/*-spec.js`
- E2E tests: `source/test/protractor/specs/**/*-spec.js`

### Environment
- Use `./create-distrobox` for containerized dev environment (includes webserver, all tools)
- Distrobox provides Apache server with configurable backend proxies
- Configuration via `.env` file (see `DEVELOPMENT.md` for examples)

## Code Conventions

### Class Structure Pattern
```javascript
qx.Class.define('cv.namespace.ClassName', {
  extend: BaseClass,
  include: [Mixin1, Mixin2],  // Mixins for shared behavior
  implement: IInterface,
  type: 'singleton' | 'static' | 'abstract',  // optional
  
  statics: { /* class-level constants/methods */ },
  properties: { /* Qooxdoo property definitions */ },
  members: { /* instance methods */ }
});
```

### Widget Implementation Pattern
1. Create widget class in `source/class/cv/ui/structure/{pure|tile}/`
2. Create parser class in `source/class/cv/parser/{pure}/widgets/` (Pure structure only)
3. Register parser: `cv.parser.pure.WidgetParser.addHandler('widgetname', ParserClass)`
4. Tile structure uses custom elements registered via `cv.ui.structure.tile.Controller.register()`

### File Headers
All files require GPL-3.0 license header with copyright notice:
```javascript
/* FileName.js
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributors.
 * <GPL-3.0 license text>
 */
```

### Naming Conventions
- Classes: PascalCase (`AbstractWidget`, `ColorChooser`)
- Files: Match class name exactly (`ColorChooser.js`)
- Properties: camelCase with getters/setters auto-generated
- Private members: double underscore prefix (`__internalState`)
- Mixins: Prefix with `M` (`MVisibility`, `MRefresh`)

### Async Operations
- Use Qooxdoo Promises: `new qx.Promise()` or `qx.promise.Manager`
- Resource loading: `cv.util.ScriptLoader.includeScript()`
- Deferred initialization: `new qx.util.DeferredCall(callback).schedule()`

## Key Patterns

### State Management
- Central state in `cv.data.Model` singleton
- Address-based listeners: `model.addUpdateListener(address, callback)`
- Widget data stored via `model.setWidgetData(path, data)`

### Plugin System
- Plugins in `source/class/cv/plugins/`
- Auto-loaded via parts system (lazy loading)
- External libraries in `source/resource/plugins/`

### Asset Declaration
Declare external assets in class header:
```javascript
/**
 * @asset(designs/*)
 * @asset(libs/d3.min.js)
 * @ignore(d3)  // Ignore undefined global
 */
```

### Resource Paths
- Use `qx.util.ResourceManager.getInstance().toUri('path/to/resource')`
- Resources in `source/resource/` directory

## Common Tasks

### Adding a New Widget (Pure Structure)
1. Create `source/class/cv/ui/structure/pure/WidgetName.js` extending `AbstractWidget`
2. Create `source/class/cv/parser/pure/widgets/WidgetName.js`
3. Implement `parse()` method in parser
4. Register in parser initialization

### Adding a New Component (Tile Structure)
1. Create `source/class/cv/ui/structure/tile/components/ComponentName.js`
2. Extend `AbstractComponent` or similar base class
3. Include relevant mixins (`MVisibility`, `MRefresh`, etc.)
4. Register custom element in component's static section

### Debugging
- Source maps enabled in development builds
- Use `qx.log.Logger.debug/info/warn/error(this, 'message')`
- Browser dev tools with `compiled/source/` served
- Test mode: Set `cv.Config.testMode = true` for simulated backend

## External Dependencies
- D3.js for charts/visualizations
- Monaco Editor for code editing
- Sentry for error reporting (build only)
- External backend: eibd/knxd (KNX), OpenHAB REST API, MQTT brokers
