# Tahri.Tech - 3D Skill Tree Visualization

## Project Overview
A minimal 3D skill tree visualization that reads `data/skills.json` and renders a hierarchical tree using Three.js. Everything needed is in `index.html` - just open it and it works!

## File Structure
```
├── index.html              # Everything in one file!
├── data/
│   └── skills.json        # Your hierarchical skill data
└── js/
    └── OrbitControls.js   # Camera controls (separate for reusability)
```

## How It Works

### The Tree
- **Base**: Starts at origin (0, 0, 0)
- **Growth**: Builds upward along Y-axis
- **Branching**: Children spread radially from parent
- **Geometry**: 
  - Branches = Tapered cylinders (brown, get thinner at higher levels)
  - Nodes = Colored spheres (colors from skills.json)
  - Labels = Text sprites above each node

### JSON Structure
```json
{
  "skills": {
    "name": "Root",
    "type": "root",
    "children": [
      {
        "name": "Category",
        "type": "category", 
        "color": "#ff6b6b",
        "children": [...]
      }
    ]
  }
}
```

## Customization

Edit directly in `index.html`:

**Tree Appearance** (around line 120):
```javascript
this.branchRadius = 0.1;    // Branch thickness
this.branchColor = 0x4a3728; // Branch color
this.nodeSize = 0.2;         // Sphere size
```

**Tree Behavior** (in `buildBranch` method):
- `newLength = length * 0.7` - How much shorter each level gets
- `spreadAngle = Math.PI / 3` - How wide branches spread (60°)

**Camera** (around line 90):
```javascript
camera.position.set(5, 3, 8); // Starting camera position
```

## Local Testing
```bash
# Serve locally (required for loading JSON)
python -m http.server 8000
# Open: http://localhost:8000
```

## Deployment
Just push to GitHub Pages - no build needed!

---
*Simple 3D tree from JSON using Three.js - everything in one HTML file*