'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function RubiksCube() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    let scene: any, camera: any, renderer: any, cube: any, animationId: number
    let floor: any, floorGeometry: any
    let mouse = { x: 0, y: 0 }
    let raycaster: any, mouseVector: any
    let particles: any, particleSystem: any
    let trailPositions: Array<{ x: number, y: number, z: number, life: number }> = []

    // Physics variables - free-falling cube
    let velocity = { x: 0, y: 0, z: 0 }  // Will start falling immediately
    let gravity = -0.0005  // Gravity for natural fall
    let bounce = 0.7       // Bouncy
    let friction = 0.98    // Friction to help cube settle
    let bounds = { x: 12, y: 12, z: 8 }  // Movement bounds
    let defaultPosition = { x: 8, y: 4, z: 0 }  // Default starting position (floating above floor)
    let ripples: Array<{ x: number, z: number, time: number, strength: number, rings: any[], particles: any[] }> = []
    let lastClickTime = 0
    let lastRippleTime = 0
    let gsapRef: any = null
    let floorMaterial: any = null
    let isReturningToPosition = false  // Track if cube is returning to default position
    let returnStartTime = 0

    // Circuit board wave parameters
    const rippleParams = {
      maxRadius: 10.0,
      expansionSpeed: 2.0,  // Slow
      waveHeight: 0.08,     // Barely noticeable vertical displacement
      ringWidth: 0.35,
      emissiveGain: 0.3,    // Brighter for circuit traces
      highlightGain: 0.4,
      gridScale: 0.5,       // Grid line spacing (smaller = denser grid)
      traceBoost: 0.5,      // Circuit trace brightness
      afterglowDecay: 0.94,
      noiseScale: 3.0,
      noiseScrollSpeed: 1.2
    }



    const init = async () => {
      // Create scene
      scene = new THREE.Scene()

      // Create camera (positioned to show cube near title on right side)
      const container = containerRef.current
      const cw = container?.clientWidth || 0
      const ch = container?.clientHeight || 0
      const width = cw > 10 ? cw : (typeof window !== 'undefined' ? window.innerWidth : 600)
      const height = ch > 10 ? ch : (typeof window !== 'undefined' ? window.innerHeight : 600)
      camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
      camera.position.set(8, 2, 20)
      camera.lookAt(8, 0, 0)

      // Setup raycaster for mouse interaction
      raycaster = new THREE.Raycaster()
      mouseVector = new THREE.Vector2()

      // Create renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      if (typeof window !== 'undefined') {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      }
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      containerRef.current?.appendChild(renderer.domElement)

      // Create Rubik's cube group
      cube = new THREE.Group()

      // Create 3x3x3 grid of cubelets
      const offsets = [-1, 0, 1]
      const gap = 0.1
      let index = 0

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9)

            // Create dark materials
            const isTextured = index % 4 === 0
            const surfaceType = Math.random()

            let material
            if (surfaceType < 0.25 && isTextured) {
              material = new THREE.MeshStandardMaterial({
                color: 0x2a2a2a,
                metalness: 0.6,
                roughness: 0.2,
                transparent: false,
                opacity: 1.0,
                emissive: 0x111111,
                emissiveIntensity: 0.15
              })
            } else if (surfaceType < 0.5) {
              material = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                metalness: 0.6,
                roughness: 0.2,
                transparent: false,
                opacity: 1.0,
                emissive: 0x111111,
                emissiveIntensity: 0.15
              })
            } else if (surfaceType < 0.75) {
              material = new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 0.6,
                roughness: 0.2,
                transparent: false,
                opacity: 1.0,
                emissive: 0x111111,
                emissiveIntensity: 0.15
              })
            } else {
              material = new THREE.MeshStandardMaterial({
                color: 0x252525,
                metalness: 0.6,
                roughness: 0.2,
                transparent: false,
                opacity: 1.0,
                emissive: 0x111111,
                emissiveIntensity: 0.15
              })
            }

            const cubelet = new THREE.Mesh(geometry, material)
            cubelet.position.set(
              offsets[x] * (0.9 + gap),
              offsets[y] * (0.9 + gap),
              offsets[z] * (0.9 + gap)
            )
            cubelet.castShadow = true
            cubelet.receiveShadow = true

            // Add wireframe edges
            const edges = new THREE.EdgesGeometry(geometry)
            const line = new THREE.LineSegments(
              edges,
              new THREE.LineBasicMaterial({ color: 0x4b5563, transparent: true, opacity: 0.4 })
            )
            cubelet.add(line)

            cube.add(cubelet)
            index++
          }
        }
      }

      // Position cube at default floating position - will start falling immediately
      cube.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z)
      scene.add(cube)

      // Ensure cube renders after grid to avoid "submerging" visuals
      cube.traverse((o: any) => { o.renderOrder = 1 })

      // Add invisible bounding sphere for easier clicking
      const hitSphereGeometry = new THREE.SphereGeometry(2.0, 16, 16)
      const hitSphereMaterial = new THREE.MeshBasicMaterial({
        visible: false,
        transparent: true,
        opacity: 0
      })
      const hitSphere = new THREE.Mesh(hitSphereGeometry, hitSphereMaterial)
      hitSphere.name = 'hitTarget'
      cube.add(hitSphere)

      console.log('🎲 Cube initialized at position:', defaultPosition, '- free-falling enabled')

      // Create floor with circuit board shader
      const floorSize = 100
      const floorSegments = 300
      floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, floorSegments, floorSegments)
      floorGeometry.rotateX(-Math.PI / 2)

      // Custom shader material for circuit board effect
      floorMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          gridScale: { value: rippleParams.gridScale },
          baseColor: { value: new THREE.Color(0x0d1117) },
          gridColor: { value: new THREE.Color(0x2a3f5f) },  // Darker blue grid lines
          glowColor: { value: new THREE.Color(0x4a9eff) },  // Bright blue for activated traces
          ripplePositions: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
          rippleRadii: { value: [0, 0, 0] },
          rippleStrengths: { value: [0, 0, 0] }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldPosition;

          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float gridScale;
          uniform vec3 baseColor;
          uniform vec3 gridColor;
          uniform vec3 glowColor;
          uniform vec3 ripplePositions[3];
          uniform float rippleRadii[3];
          uniform float rippleStrengths[3];

          varying vec2 vUv;
          varying vec3 vWorldPosition;

          // Circuit board grid pattern
          float gridPattern(vec2 pos) {
            vec2 grid = abs(fract(pos / gridScale - 0.5) - 0.5);
            float line = min(grid.x, grid.y);
            return smoothstep(0.02, 0.0, line);
          }

          // Circuit trace pattern (more complex)
          float tracePattern(vec2 pos) {
            vec2 p = pos / gridScale;

            // Horizontal and vertical traces
            float h = step(0.85, fract(p.y));
            float v = step(0.85, fract(p.x));

            // Diagonal traces (less frequent)
            float d1 = step(0.92, fract((p.x + p.y) * 0.5));
            float d2 = step(0.92, fract((p.x - p.y) * 0.5));

            return max(max(h, v), max(d1, d2));
          }

          void main() {
            vec2 pos = vWorldPosition.xz;

            // Base circuit board pattern
            float grid = gridPattern(pos);
            float traces = tracePattern(pos);
            float pattern = max(grid * 0.4, traces);

            // Calculate ripple activation
            float activation = 0.0;
            for(int i = 0; i < 3; i++) {
              if(rippleStrengths[i] > 0.0) {
                float dist = distance(vWorldPosition.xz, ripplePositions[i].xz);
                float rippleEdge = abs(dist - rippleRadii[i]);

                // Activate traces near the ripple edge
                if(rippleEdge < 0.8) {
                  float edgeFactor = 1.0 - (rippleEdge / 0.8);
                  activation = max(activation, edgeFactor * rippleStrengths[i]);
                }

                // Also activate traces that have been passed by the wave (afterglow)
                if(dist < rippleRadii[i]) {
                  float afterglow = (1.0 - dist / rippleRadii[i]) * 0.15 * rippleStrengths[i];
                  activation = max(activation, afterglow);
                }
              }
            }

            // Mix colors based on activation
            vec3 basePattern = mix(baseColor, gridColor, pattern);
            vec3 finalColor = mix(basePattern, glowColor, activation * pattern);

            // Make floor mostly transparent but show circuit pattern
            float alpha = pattern * 0.2 + activation * pattern * 0.7;

            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      })

      floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.position.set(8, -4, 0)
      floor.receiveShadow = false
      scene.add(floor)

      console.log('✅ Circuit board floor created with shader')

      // Darker, more atmospheric lighting for circuit board aesthetic
      const ambientLight = new THREE.AmbientLight(0x2a2f3a, 0.5)
      scene.add(ambientLight)

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight1.position.set(10, 10, 10)
      scene.add(directionalLight1)

      const directionalLight2 = new THREE.DirectionalLight(0x404050, 0.2)
      directionalLight2.position.set(-10, -10, -10)
      scene.add(directionalLight2)

      // Subtle blue accent lights for circuit board glow
      const pointLight1 = new THREE.PointLight(0x0066aa, 1.0, 100)
      pointLight1.position.set(8, 5, 10)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0x004488, 0.8, 100)
      pointLight2.position.set(8, -3, 10)
      scene.add(pointLight2)

      // Add rim lights for dramatic effect
      const rimLight1 = new THREE.PointLight(0x003366, 0.4, 100)
      rimLight1.position.set(0, 10, -10)
      // GSAP loader and intro animations
      const loadGSAP = (): Promise<any> => {
        return new Promise((resolve, reject) => {
          if (typeof window !== 'undefined' && (window as any).gsap) return resolve((window as any).gsap)
          const s = document.createElement('script')


          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
          s.async = true
          s.onload = () => resolve((window as any).gsap)
          s.onerror = reject
          document.head.appendChild(s)
        })
      }

      try {
        gsapRef = await loadGSAP()
        // Smooth camera intro
        gsapRef.fromTo(camera.position, { z: camera.position.z + 4, y: camera.position.y - 0.8 }, {
          z: camera.position.z, y: camera.position.y, duration: 1.2, ease: 'power2.out'
        })
      } catch (e) {
        // GSAP failed to load; proceed without animated intro
      }

      const pulseFloorGlow = (strength: number) => {
        if (!gsapRef || !floorMaterial) return
        const targetIntensity = Math.min(0.8, 0.3 + strength * 1.2)
        // Pulse the emissive intensity to reveal circuit pattern
        gsapRef.to(floorMaterial, {
          emissiveIntensity: targetIntensity,
          duration: 0.15,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        })
      }

      scene.add(rimLight1)

      const rimLight2 = new THREE.PointLight(0x004488, 0.3, 100)
      rimLight2.position.set(10, -5, 0)
      scene.add(rimLight2)

      // Create particle system for impact effects
      const particleCount = 500
      const particleGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = 0
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = 0

        colors[i * 3] = 0.2
        colors[i * 3 + 1] = 0.5
        colors[i * 3 + 2] = 1.0

        sizes[i] = Math.random() * 0.1 + 0.05
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      })

      particleSystem = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particleSystem)



      const createRipple = (x: number, z: number, strength: number) => {
        const now = (typeof performance !== 'undefined' ? performance.now() : Date.now())
        if (now - lastRippleTime < 120) {
          return // throttle to prevent haywire on rapid bounces
        }
        lastRippleTime = now

        // Create ultra-subtle realistic wave ripple
        const s = Math.min(1.0, 0.4 + strength * 0.6)

        // Convert floor-local coordinates to world coordinates
        const worldX = x + floor.position.x
        const worldZ = z
        const worldY = floor.position.y

        // Create realistic wave ripple - very thin, barely visible
        const rings: any[] = []
        const particles: any[] = []

        // Darker, more visible wave crest
        const waveGeo = new THREE.TorusGeometry(0.5, 0.035, 8, 64)  // Slightly thicker
        const waveMat = new THREE.MeshBasicMaterial({
          color: 0x3a6ea5,  // Darker blue (more visible)
          transparent: true,
          opacity: 0.25,    // More visible
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending
        })
        const wave = new THREE.Mesh(waveGeo, waveMat)
        wave.rotation.x = Math.PI / 2
        wave.position.set(worldX, worldY, worldZ)
        scene.add(wave)
        rings.push({ mesh: wave, type: 'main', initialY: worldY })

        ripples.push({ x, z, time: 0, strength: s, rings, particles })

        // Limit to 3 concurrent waves
        if (ripples.length > 3) {
          const removed = ripples.shift()
          if (removed) {
            removed.rings.forEach((r: any) => scene.remove(r.mesh))
            removed.particles.forEach((p: any) => scene.remove(p.system))
          }
        }

        console.log('🌊 Ultra-subtle wave ripple created at:', worldX, worldY, worldZ)
      }

      // Function to update circuit board wave effect
      const updateFloorRipples = () => {
        // Update shader uniforms with ripple data
        const positions: any[] = []
        const radii: number[] = []
        const strengths: number[] = []

        ripples = ripples.filter((ripple, index) => {
          ripple.time += 0.016  // ~60fps

          // Slow expansion
          const expansionSpeed = rippleParams.expansionSpeed  // 2.0 units/sec
          const maxRadius = rippleParams.maxRadius  // 10.0 units
          const waveHeight = rippleParams.waveHeight  // 0.08 units vertical
          const currentRadius = ripple.time * expansionSpeed

          // 5 second total duration - very slow
          const totalDuration = 5.0
          const progress = ripple.time / totalDuration

          // Very smooth ease-out for gentle expansion
          const easeOut = 1 - Math.pow(1 - Math.min(progress, 1), 2)

          // Calculate strength for shader
          let strength = 0
          if (progress < 0.3) {
            strength = (progress / 0.3) * 0.8
          } else if (progress < 0.6) {
            strength = 0.8
          } else {
            strength = 0.8 * (1 - (progress - 0.6) / 0.4)
          }

          // Store ripple data for shader (up to 3 ripples)
          if (index < 3) {
            const worldX = ripple.x + floor.position.x
            const worldZ = ripple.z
            positions.push(new THREE.Vector3(worldX, floor.position.y, worldZ))
            radii.push(currentRadius * easeOut)
            strengths.push(strength)
          }

          // Animate the wave ring
          ripple.rings.forEach((ringObj: any) => {
            const ring = ringObj.mesh
            const initialY = ringObj.initialY

            // Scale outward slowly
            const scale = 1 + currentRadius * easeOut * 1.0
            ring.scale.set(scale, scale, scale)

            // Subtle vertical wave motion
            let heightOffset = 0
            if (progress < 0.35) {
              heightOffset = (progress / 0.35) * waveHeight
            } else if (progress < 0.55) {
              heightOffset = waveHeight
            } else {
              heightOffset = waveHeight * (1 - (progress - 0.55) / 0.45)
            }

            ring.position.y = initialY + heightOffset

            // Opacity animation
            let opacity = 0
            if (progress < 0.3) {
              opacity = (progress / 0.3) * 0.25
            } else if (progress < 0.6) {
              opacity = 0.25
            } else {
              opacity = 0.25 * (1 - (progress - 0.6) / 0.4)
            }

            ring.material.opacity = Math.max(0, opacity)
          })

          // Remove when complete
          if (ripple.time >= totalDuration || currentRadius > maxRadius) {
            ripple.rings.forEach((r: any) => scene.remove(r.mesh))
            ripple.particles.forEach((p: any) => scene.remove(p.system))
            return false
          }
          return true
        })

        // Update floor shader uniforms
        if (floor && floor.material && floor.material.uniforms) {
          // Pad arrays to length 3
          while (positions.length < 3) positions.push(new THREE.Vector3(0, 0, 0))
          while (radii.length < 3) radii.push(0)
          while (strengths.length < 3) strengths.push(0)

          floor.material.uniforms.ripplePositions.value = positions
          floor.material.uniforms.rippleRadii.value = radii
          floor.material.uniforms.rippleStrengths.value = strengths
        }
      }


      // Mouse interaction handlers
      const onMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        // Check if hovering over cube
        mouseVector.x = mouse.x
        mouseVector.y = mouse.y
        raycaster.setFromCamera(mouseVector, camera)
        const intersects = raycaster.intersectObject(cube, true)

        // Change cursor when hovering
        if (intersects.length > 0) {
          renderer.domElement.style.cursor = 'pointer'
        } else {
          renderer.domElement.style.cursor = 'grab'
        }
      }

      const onMouseClick = (event: MouseEvent) => {
        const currentTime = Date.now()

        // Reduced debounce time for better responsiveness
        if (currentTime - lastClickTime < 200) {
          return
        }
        lastClickTime = currentTime

        // Calculate mouse position relative to canvas
        const rect = renderer.domElement.getBoundingClientRect()
        mouseVector.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouseVector.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        raycaster.setFromCamera(mouseVector, camera)

        // Check intersection with cube and all its children (including invisible bounding sphere)
        const intersects = raycaster.intersectObject(cube, true)

        console.log('🎯 Click detected! Intersects:', intersects.length, 'Cube position:', cube.position)

        // ONLY trigger if clicking directly on the cube
        if (intersects.length > 0) {
          console.log('✅ HIT! Cube clicked at:', intersects[0].point)

          // Cancel any ongoing return animation
          isReturningToPosition = false
          returnStartTime = 0

          // Bounce the cube with a quick impulse
          const direction = new THREE.Vector3()
          const clickPoint = intersects[0].point
          direction.subVectors(cube.position, clickPoint).normalize()

          // Apply bounce force (REPLACE velocity, not add)
          velocity.x = direction.x * 0.15
          velocity.y = Math.abs(direction.y) * 0.12 + 0.12
          velocity.z = direction.z * 0.15

          // Particle burst on click
          createParticleBurst(cube.position.x, cube.position.y, cube.position.z, 0.8)

          // Schedule return-to-position after 1.5 seconds
          returnStartTime = currentTime + 1500

          console.log('🚀 Cube bounced! Velocity:', velocity)
        } else {
          console.log('❌ MISS - Click did not hit cube')
        }
      }

      // Add event listeners
      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('click', onMouseClick)

      // Function to create particle burst on impact
      const createParticleBurst = (x: number, y: number, z: number, strength: number) => {
        const positions = particleGeometry.attributes.position.array as Float32Array
        const particleCount = positions.length / 3
        const burstCount = Math.min(50, Math.floor(strength * 100))

        for (let i = 0; i < burstCount; i++) {
          const idx = (i % particleCount) * 3
          positions[idx] = x + (Math.random() - 0.5) * 0.5
          positions[idx + 1] = y + (Math.random() - 0.5) * 0.5
          positions[idx + 2] = z + (Math.random() - 0.5) * 0.5
        }
        particleGeometry.attributes.position.needsUpdate = true
      }

      // Animation loop with enhanced physics
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        // Check if it's time to return to position
        const currentTime = Date.now()
        if (!isReturningToPosition && returnStartTime > 0 && currentTime >= returnStartTime) {
          isReturningToPosition = true
          console.log('🔄 Starting return to default position')
        }

        // Return to position logic (apply gentle force towards default position)
        if (isReturningToPosition) {
          const dx = defaultPosition.x - cube.position.x
          const dy = defaultPosition.y - cube.position.y
          const dz = defaultPosition.z - cube.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 0.2) {
            // Close enough - snap to position and stop
            cube.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z)
            velocity.x = 0
            velocity.y = 0
            velocity.z = 0
            isReturningToPosition = false
            returnStartTime = 0
            console.log('✅ Cube returned to default position')
          } else {
            // Apply gentle force towards default position (instead of setting velocity directly)
            const pullStrength = 0.002
            velocity.x += dx * pullStrength
            velocity.y += dy * pullStrength
            velocity.z += dz * pullStrength

            // Dampen velocity while returning
            velocity.x *= 0.95
            velocity.y *= 0.95
            velocity.z *= 0.95
          }
        } else {
          // Apply gravity when not returning to position
          velocity.y += gravity
        }

        // Update position (keep cube centered around x=8)
        const newX = cube.position.x + velocity.x
        const newY = cube.position.y + velocity.y
        const newZ = cube.position.z + velocity.z

        cube.position.x = newX
        cube.position.y = newY
        cube.position.z = newZ

        // Dynamic rotation based on velocity (more realistic physics)
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)
        cube.rotation.x += 0.006 + speed * 0.5
        cube.rotation.y += 0.008 + speed * 0.6
        cube.rotation.z += 0.005 + speed * 0.4

        // Update particle positions (fade out)
        const positions = particleGeometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= 0.02 // Particles fall
          if (positions[i + 1] < -15) {
            positions[i + 1] = 0
          }
        }
        particleGeometry.attributes.position.needsUpdate = true

        // Check floor collision
        // Cube is 3 units tall, so radius is 1.5. Floor is at y=-4
        // Cube bottom = cube.position.y - 1.5
        const halfSize = 1.5
        const xA = new THREE.Vector3(1, 0, 0).applyQuaternion(cube.quaternion)
const yA = new THREE.Vector3(0, 1, 0).applyQuaternion(cube.quaternion)
const zA = new THREE.Vector3(0, 0, 1).applyQuaternion(cube.quaternion)
const vertExtent = halfSize * (Math.abs(xA.y) + Math.abs(yA.y) + Math.abs(zA.y))
const cubeBottom = cube.position.y - vertExtent
        const floorY = -4

        if (cubeBottom <= floorY) {
          cube.position.y = floorY + vertExtent  // Keep cube sitting on floor (orientation-aware)
          velocity.y = -velocity.y * bounce
          velocity.x *= friction  // Apply friction
          velocity.z *= friction

          // Create ripple and particle burst on floor impact (adjust for floor offset)
          if (Math.abs(velocity.y) > 0.003) {
            // Compute precise contact point (world-space) by sampling the lowest cube vertex
const hs = halfSize
let minY = Infinity
let sumX = 0, sumZ = 0, count = 0
const ox = [hs, hs, hs, hs, -hs, -hs, -hs, -hs]
const oy = [hs, hs, -hs, -hs, hs, hs, -hs, -hs]
const oz = [hs, -hs, hs, -hs, hs, -hs, hs, -hs]
for (let i = 0; i < 8; i++) {
  const wx = cube.position.x + xA.x * ox[i] + yA.x * oy[i] + zA.x * oz[i]
  const wy = cube.position.y + xA.y * ox[i] + yA.y * oy[i] + zA.y * oz[i]
  const wz = cube.position.z + xA.z * ox[i] + yA.z * oy[i] + zA.z * oz[i]
  if (wy < minY - 1e-6) { minY = wy; sumX = wx; sumZ = wz; count = 1 }
  else if (Math.abs(wy - minY) <= 1e-6) { sumX += wx; sumZ += wz; count++ }
}
const contactXWorld = sumX / count
const contactZWorld = sumZ / count
createRipple(contactXWorld - floor.position.x, contactZWorld, Math.min(1.2, Math.abs(velocity.y) * 1.2))  // Centered on actual contact point (converted to floor local)
            createParticleBurst(cube.position.x, cube.position.y, cube.position.z, Math.abs(velocity.y))
            pulseFloorGlow(Math.abs(velocity.y))
          }

          // Settle the cube if velocity is very low
          const totalVelocity = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)
          if (totalVelocity < 0.005) {
            velocity.x = 0
            velocity.y = 0
            velocity.z = 0
          }
        }

        // Check ceiling collision (solid ceiling)
        const ceilingY = bounds.y
        if (cube.position.y + vertExtent >= ceilingY) {
          cube.position.y = ceilingY - vertExtent
          velocity.y = -velocity.y * bounce

          // No ripples on ceiling hits; optional particle burst only
          createParticleBurst(cube.position.x, cube.position.y, cube.position.z, Math.abs(velocity.y) * 0.5)
        }

        // Check wall collisions (X axis)
        const minX = 8 - bounds.x + halfSize
        const maxX = 8 + bounds.x - halfSize
        if (cube.position.x <= minX || cube.position.x >= maxX) {
          cube.position.x = cube.position.x <= minX ? minX : maxX
          velocity.x = -velocity.x * bounce

          // No ripples on wall impact; particle burst only
          createParticleBurst(cube.position.x, cube.position.y, cube.position.z, Math.abs(velocity.x) * 0.7)
        }

        // Check wall collisions (Z axis)
        const minZ = -bounds.z + halfSize
        const maxZ = bounds.z - halfSize
        if (cube.position.z <= minZ || cube.position.z >= maxZ) {
          cube.position.z = cube.position.z <= minZ ? minZ : maxZ
          velocity.z = -velocity.z * bounce

          // No ripples on wall impact; particle burst only
          createParticleBurst(cube.position.x, cube.position.y, cube.position.z, Math.abs(velocity.z) * 0.7)
        }

        // Update floor ripples (reveals circuit board)
        updateFloorRipples()

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current) return
        const cw = containerRef.current.clientWidth
        const ch = containerRef.current.clientHeight
        const width = cw > 10 ? cw : (typeof window !== 'undefined' ? window.innerWidth : 600)
        const height = ch > 10 ? ch : (typeof window !== 'undefined' ? window.innerHeight : 600)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('click', onMouseClick)
        cancelAnimationFrame(animationId)

        if (renderer && containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        renderer?.dispose()
      }
    }

    init()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: '100vh', cursor: 'pointer' }}
    />
  )
}

