// OrbitControls for Three.js
// This is a simplified version of the Three.js OrbitControls

class OrbitControls {
    constructor(object, domElement) {
        this.object = object;
        this.domElement = domElement || document;
        
        // Set to false to disable this control
        this.enabled = true;
        
        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();
        
        // How far you can dolly in and out (PerspectiveCamera only)
        this.minDistance = 2;
        this.maxDistance = 50;
        
        // How far you can zoom in and out (OrthographicCamera only)
        this.minZoom = 0;
        this.maxZoom = Infinity;
        
        // How far you can orbit vertically, upper and lower limits
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        
        // How far you can orbit horizontally, upper and lower limits
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians
        
        // Set to true to enable damping (inertia)
        this.enableDamping = true;
        this.dampingFactor = 0.05;
        
        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;
        
        // Set to false to disable zooming
        this.enableZoom = false;
        this.zoomSpeed = 1.0;
        
        // Set to false to disable panning
        this.enablePan = false;
        this.panSpeed = 1.0;
        
        // Set to true to automatically rotate around the target
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0;
        
        // Internal variables
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();
        this.scale = 1;
        this.panOffset = new THREE.Vector3();
        this.zoomChanged = false;
        
        this.rotateStart = new THREE.Vector2();
        this.rotateEnd = new THREE.Vector2();
        this.rotateDelta = new THREE.Vector2();
        
        this.panStart = new THREE.Vector2();
        this.panEnd = new THREE.Vector2();
        this.panDelta = new THREE.Vector2();
        
        this.dollyStart = new THREE.Vector2();
        this.dollyEnd = new THREE.Vector2();
        this.dollyDelta = new THREE.Vector2();
        
        this.state = {
            NONE: - 1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY_PAN: 4
        };
        
        this.currentState = this.state.NONE;
        
        // Event listeners
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        
        this.domElement.addEventListener('mousedown', this.onMouseDown);
        this.domElement.addEventListener('wheel', this.onMouseWheel);
        this.domElement.addEventListener('touchstart', this.onTouchStart);
        
        // Initialize
        this.update();
    }
    
    getPolarAngle() {
        return this.spherical.phi;
    }
    
    getAzimuthalAngle() {
        return this.spherical.theta;
    }
    
    update() {
        const offset = new THREE.Vector3();
        const quat = new THREE.Quaternion().setFromUnitVectors(this.object.up, new THREE.Vector3(0, 1, 0));
        const quatInverse = quat.clone().invert();
        
        const position = this.object.position;
        
        offset.copy(position).sub(this.target);
        offset.applyQuaternion(quat);
        
        this.spherical.setFromVector3(offset);
        
        if (this.autoRotate && this.currentState === this.state.NONE) {
            this.rotateLeft(this.getAutoRotationAngle());
        }
        
        this.spherical.theta += this.sphericalDelta.theta;
        this.spherical.phi += this.sphericalDelta.phi;
        
        this.spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this.spherical.theta));
        this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));
        
        this.spherical.makeSafe();
        
        this.spherical.radius *= this.scale;
        this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
        
        this.target.add(this.panOffset);
        
        offset.setFromSpherical(this.spherical);
        offset.applyQuaternion(quatInverse);
        
        position.copy(this.target).add(offset);
        
        this.object.lookAt(this.target);
        
        if (this.enableDamping === true) {
            this.sphericalDelta.theta *= (1 - this.dampingFactor);
            this.sphericalDelta.phi *= (1 - this.dampingFactor);
            this.panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
            this.sphericalDelta.set(0, 0, 0);
            this.panOffset.set(0, 0, 0);
        }
        
        this.scale = 1;
        
        if (this.zoomChanged) {
            this.zoomChanged = false;
            return true;
        }
        
        return false;
    }
    
    getAutoRotationAngle() {
        return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    }
    
    getZoomScale() {
        return Math.pow(0.95, this.zoomSpeed);
    }
    
    rotateLeft(angle) {
        this.sphericalDelta.theta -= angle;
    }
    
    rotateUp(angle) {
        this.sphericalDelta.phi -= angle;
    }
    
    dollyIn(dollyScale) {
        if (this.object.isPerspectiveCamera) {
            this.scale *= dollyScale; // Scale down (< 1) = zoom IN (closer)
        } else if (this.object.isOrthographicCamera) {
            this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;
        }
    }
    
    dollyOut(dollyScale) {
        if (this.object.isPerspectiveCamera) {
            this.scale *= dollyScale; // Scale up (> 1) = zoom OUT (farther)
        } else if (this.object.isOrthographicCamera) {
            this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;
        }
    }
    
    onMouseDown(event) {
        if (this.enabled === false) return;
        
        event.preventDefault();
        
        switch (event.button) {
            case 0: // left
                if (this.enableRotate === false) return;
                this.rotateStart.set(event.clientX, event.clientY);
                this.currentState = this.state.ROTATE;
                break;
                
            case 2: // right
                if (this.enablePan === false) return;
                this.panStart.set(event.clientX, event.clientY);
                this.currentState = this.state.PAN;
                break;
        }
        
        if (this.currentState !== this.state.NONE) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
    }
    
    onMouseMove(event) {
        if (this.enabled === false) return;
        
        event.preventDefault();
        
        switch (this.currentState) {
            case this.state.ROTATE:
                if (this.enableRotate === false) return;
                this.rotateEnd.set(event.clientX, event.clientY);
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
                const element = this.domElement;
                this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientHeight);
                this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight);
                this.rotateStart.copy(this.rotateEnd);
                this.update();
                break;
                
            case this.state.PAN:
                if (this.enablePan === false) return;
                this.panEnd.set(event.clientX, event.clientY);
                this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
                this.pan(this.panDelta.x, this.panDelta.y);
                this.panStart.copy(this.panEnd);
                this.update();
                break;
        }
    }
    
    onMouseUp() {
        if (this.enabled === false) return;
        
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        
        this.currentState = this.state.NONE;
    }
    
    onMouseWheel(event) {
        if (this.enabled === false || this.enableZoom === false) return;
        
        event.preventDefault();
        event.stopPropagation();
        
        if (event.deltaY < 0) {
            this.dollyOut(1 / this.getZoomScale()); // Scroll up = zoom OUT (use inverse)
        } else if (event.deltaY > 0) {
            this.dollyIn(this.getZoomScale()); // Scroll down = zoom IN
        }
        
        this.update();
    }
    
    onTouchStart(event) {
        if (this.enabled === false) return;
        
        event.preventDefault();
        
        switch (event.touches.length) {
            case 1: // one-fingered touch: rotate
                if (this.enableRotate === false) return;
                this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                this.currentState = this.state.TOUCH_ROTATE;
                break;
                
            case 2: // two-fingered touch: dolly-pan
                if (this.enableZoom === false && this.enablePan === false) return;
                
                const dx = event.touches[0].pageX - event.touches[1].pageX;
                const dy = event.touches[0].pageY - event.touches[1].pageY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                this.dollyStart.set(0, distance);
                
                const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                
                this.panStart.set(x, y);
                this.currentState = this.state.TOUCH_DOLLY_PAN;
                break;
        }
        
        if (this.currentState !== this.state.NONE) {
            document.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);
        }
    }
    
    onTouchMove(event) {
        if (this.enabled === false) return;
        
        event.preventDefault();
        event.stopPropagation();
        
        switch (this.currentState) {
            case this.state.TOUCH_ROTATE:
                if (this.enableRotate === false) return;
                this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
                const element = this.domElement;
                this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientHeight);
                this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight);
                this.rotateStart.copy(this.rotateEnd);
                break;
                
            case this.state.TOUCH_DOLLY_PAN:
                if (this.enableZoom) {
                    const dx = event.touches[0].pageX - event.touches[1].pageX;
                    const dy = event.touches[0].pageY - event.touches[1].pageY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    this.dollyEnd.set(0, distance);
                    this.dollyDelta.set(0, Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed));
                    
                    this.dollyIn(this.dollyDelta.y);
                    this.dollyStart.copy(this.dollyEnd);
                }
                
                if (this.enablePan) {
                    const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    
                    this.panEnd.set(x, y);
                    this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
                    this.pan(this.panDelta.x, this.panDelta.y);
                    this.panStart.copy(this.panEnd);
                }
                break;
        }
        
        this.update();
    }
    
    onTouchEnd() {
        if (this.enabled === false) return;
        
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        
        this.currentState = this.state.NONE;
    }
    
    pan(deltaX, deltaY) {
        const element = this.domElement;
        
        if (this.object.isPerspectiveCamera) {
            const position = this.object.position;
            let targetDistance = position.distanceTo(this.target);
            
            targetDistance *= Math.tan((this.object.fov / 2) * Math.PI / 180.0);
            
            this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
            this.panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
            
        } else if (this.object.isOrthographicCamera) {
            this.panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
            this.panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
        }
    }
    
    panLeft(distance, objectMatrix) {
        const v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        this.panOffset.add(v);
    }
    
    panUp(distance, objectMatrix) {
        const v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 1);
        v.multiplyScalar(distance);
        this.panOffset.add(v);
    }
    
    dispose() {
        this.domElement.removeEventListener('mousedown', this.onMouseDown);
        this.domElement.removeEventListener('wheel', this.onMouseWheel);
        this.domElement.removeEventListener('touchstart', this.onTouchStart);
        
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
    }
}