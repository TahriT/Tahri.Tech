class SkillsHierarchyManager {
    constructor() {
        this.skillsData = null;
        this.isLoaded = false;
        this.loadPromise = null;
    }
    async loadSkillsFromJSON() {
        if (this.isLoaded) return this.skillsData;
        if (this.loadPromise) return this.loadPromise;
        this.loadPromise = fetch('data/skills.json')
            .then(response => response.json())
            .then(data => {
                this.skillsData = data;
                this.isLoaded = true;
                return data;
            });
        return this.loadPromise;
    }
    async waitForLoad() {
        if (this.isLoaded) return true;
        try {
            await this.loadSkillsFromJSON();
            return true;
        } catch (error) {
            return false;
        }
    }
    getSkillsRoot() {
        return this.skillsData ? this.skillsData.skills : null;
    }
    getSkillCount() {
        return this.skillsData ? this.countSkills(this.skillsData.skills) : 0;
    }
    countSkills(node) {
        let count = 1;
        if (node.children) {
            node.children.forEach(child => { count += this.countSkills(child); });
        }
        return count;
    }
    getVersionString() {
        if (!this.skillsData || !this.skillsData.version) return 'Unknown';
        const v = this.skillsData.version;
        return `v${v.major}.${v.minor}.${v.patch}`;
    }
}
const SkillsHierarchy = new SkillsHierarchyManager();
SkillsHierarchy.loadSkillsFromJSON();
