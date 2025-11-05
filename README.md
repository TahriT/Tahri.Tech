# 🌳 Tahri.Tech - My Growing Skill Tree

> A lively fun visual representation of my technical journey, sometimes a resume just doesn't capture the whole story.Test

## 🌐 Live Site

**[View the Interactive Skill Tree →](https://Tahri.Tech/)**

## What Is This?

I recently went on a plant kick. So why not just all in all aspects of my life? I love puns so I figured I'd make a skill-tree. Not exactly one from a video game but I guess they work the same in real life too. Funny enougy.

 It's an interactive 3D skill tree that grows and evolves as I do. Think of it as a visual diary of my technical growth, rendered in Three.js with some pretty glowing nodes and smooth animations.

Every branch represents a different area I've explored. Every node is a skill I've developed and size and color further delinated my technical awarenes. And the whole thing rotates and is fun to play with, resumes are boring so I made the pile words fun! 

## The Journey

This project started as an experiment: **"How do I show the interconnected nature of my skills in a way that's actually engaging?"** 

Traditional resumes are linear. Skills are just bullet points. But my learning journey wasn't linear it was more like a tree, with foundational knowledge at the roots and specialized skills branching out in different directions. Some branches are thick and well-developed (hello, Robotics!), while others are newer, smaller nodes still growing. (Ai Wrote this but it sounded too good to get rid of lol)

So I built this. A place where I can:
- ✨ **Visualize connections** between different skills and how they relate
- 📈 **Track my growth** over time by updating node sizes and adding new branches
- 🎯 **Show experience levels** through node size (bigger = more years of experience)
- 🎨 **Organize by category** with color-coded branches (orange for robotics, blue for programming, etc.)
- 🌱 **Keep it alive** - this tree grows as I learn new things

## What You'll Find Here

**The Skill Tree**
- Interactive 3D visualization of my technical skills
- Color-coded categories (see the key in the top-left)
- Node size reflects years of experience
- Hover to see details, click to zoom in and explore
- Auto-rotating callouts that highlight random skills

**The Roots (Experience Panel)**
- My professional experience and education
- Hover to expand and see the full timeline
- The foundation that feeds the tree above

**The Fruits (Projects Menu)**
- Links to my GitHub, LinkedIn, portfolio, and email
- Collapsible header at the top because clean UI matters

**The Seed**
- A fun loading animation because first impressions count
- Watch knowledge grow from a tiny seed 🌱

## How It Works

Everything lives in a single `index.html` file - no build process, no dependencies to install. Just open it in a browser and it works. The data lives in two simple JSON files:

- `data/skills.json` - Your skills, organized in a hierarchical tree structure
- `data/experience.json` - Your work experience, education, and leadership roles

**Tech Stack:**
- Three.js for the 3D visualization
- Vanilla JavaScript (keeping it simple)
- CSS animations for the polish
- A whole lot of experimentation


## Keeping It Growing

This is a living document. As I pick up new skills, work on new projects, or go deeper into existing areas, I update the tree. It's my visual changelog of professional growth.

**Want to update it?**
1. Edit `data/skills.json` to add/update skills in the tree
2. Edit `data/experience.json` to add/update work experience and education
3. Refresh the page
4. Watch your tree evolve

## Why Share This?

Because building this was half the fun, and maybe it'll inspire someone else to visualize their own journey in a creative way. Feel free to fork it, remix it, make it your own. The code is here to be explored and learned from - just like the skills in the tree. Vibes were not off with this development so why not start now...Hoping someone out there got the joke.


**Mobile Optimized** 📱
- Touch-friendly controls (pinch to zoom, swipe to rotate)
- Reduced animations for better performance
- Auto-callouts disabled (tap nodes to explore)
- Respects `prefers-reduced-motion` accessibility setting


**This tree is still growing.** 🌱→🌳

*Built with curiosity, Three.js, and probably too much coffee.*
