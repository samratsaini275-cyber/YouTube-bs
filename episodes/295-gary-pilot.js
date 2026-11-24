// Narrative 17: "What Would Happen If… (season 7)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a pilot cap.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.desk = k.ground('#C8955A', 0);
  w.wall = group(); box(30, 14, .3, mat('#BFE3F7'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.cap = group([.36, .52, 0], w.g); const cp = ball(.22, mat('#20324F'), [0, 0, 0], w.cap); cp.scale.y = .6; box(.18, .03, .3, mat('#111111'), [.2, -.02, 0], w.cap); box(.06, .05, .02, mat('#FFD23F', { glow: .5 }), [.15, .06, 0], w.cap).rotation.y = Math.PI / 2;
  w.plane = group(); const pm = mat('#FFFFFF'); const wing1 = k.mesh(new k.THREE.BufferGeometry().setFromPoints([new k.THREE.Vector3(1.6, 0, 0), new k.THREE.Vector3(-1.2, 0, -.9), new k.THREE.Vector3(-1.2, 0, 0)]), pm, [0, 0, 0], w.plane); const wing2 = k.mesh(new k.THREE.BufferGeometry().setFromPoints([new k.THREE.Vector3(1.6, 0, 0), new k.THREE.Vector3(-1.2, 0, 0), new k.THREE.Vector3(-1.2, 0, .9)]), pm, [0, 0, 0], w.plane); const keel = k.mesh(new k.THREE.BufferGeometry().setFromPoints([new k.THREE.Vector3(1.6, 0, 0), new k.THREE.Vector3(-1.2, -.4, 0), new k.THREE.Vector3(-1.2, 0, 0)]), pm, [0, 0, 0], w.plane); [wing1, wing2, keel].forEach(m => { m.geometry.computeVertexNormals(); m.material.side = k.THREE.DoubleSide; });
  w.belt = box(.02, .05, .5, mat('#555555'), [0, .3, 0], w.g);
  w.nose = group(); const hm = mat('#F2C9A0'); ball(2.4, hm, [0, 0, 0], w.nose); ball(.5, mat('#C08A70'), [2.1, -.6, .6], w.nose); ball(.5, mat('#C08A70'), [2.1, -.6, -.6], w.nose);
  w.gust = group(); for (let i = 0; i < 6; i++) { const l = box(1, .05, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gust); l.userData.i = i; l.castShadow = false; }
  w.bowl = group(); cyl(1.4, 1, .8, mat('#FFFFFF'), [0, .4, 0], w.bowl, 24); w.soup = cyl(1.3, 1.3, .05, mat('#E8A33A'), [0, .76, 0], w.bowl, 24); w.splash = group(); for (let i = 0; i < 8; i++) { const d = ball(.08, mat('#E8A33A'), [0, 0, 0], w.splash); d.userData.i = i; d.castShadow = false; }
  w.clouds = group(); for (let i = 0; i < 4; i++) { const c = group([-4 + i * 2.6, 3 + (i % 2) * 1.2, -2], w.clouds); for (let j = 0; j < 3; j++) ball(.5, mat('#FFFFFF'), [j * .45 - .45, (j % 2) * .2, 0], c); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ride = (w, x, y, z, ry, tilt = 0) => { w.plane.position.set(x, y, z); w.plane.rotation.set(tilt, ry, 0); gy(w, 0, 0, 0, 0, 0); w.g.position.set(x, y + .02, z); w.g.rotation.set(tilt, ry + Math.PI, 0); };

export default {
  id: '295',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAPTAIN GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A PILOT?'],
  title: 'What would happen if Gary the ant was a pilot?',
  description: 'His jet is a paper plane. Seatbelts on, it is a short flight. A sneeze counts as heavy turbulence. And the landing? Straight into the soup. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'pilot', 'funny', 'shorts'],
  sources: ['Quiz fact: young queen and male ants fly out of the nest on "nuptial flights" to mate, then the queens lose their wings and start new colonies (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a pilot?', show: ['desk', 'wall', 'g', 'cap'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); w.belt.visible = false; } },
    { say: 'His jet? A paper plane.', show: ['desk', 'wall', 'g', 'cap', 'plane', 'clouds'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2.4, 8], look: [0, 2, 0], fov: 52, to: { pos: [0, 2.4, 7.4], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.belt.visible = false; ride(w, -1.8 + p * 3.4, 1.8 + .3 * Math.sin(t * 2), 0, Math.PI, .05 * Math.sin(t * 3)); } },
    { say: 'Seatbelts on? Short flight.', show: ['desk', 'wall', 'g', 'cap', 'plane'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.6, 4.4], look: [.2, 1, 0], fov: 44, to: { pos: [1.3, 1.6, 4], look: [.2, 1, 0], fov: 42 } },
      update: (w, p, t) => { w.belt.visible = true; ride(w, .2, .3 + Math.min(1, p * 3) * .4, 0, -.4, 0); w.g.rotation.y = -.4 + Math.PI + .9; } },
    { say: 'A sneeze? Major turbulence.', label: '*ACHOO*', show: ['desk', 'wall', 'g', 'cap', 'plane', 'nose', 'gust'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 20, shake: (t) => t > 1 && t < 1.6 ? .3 : 0,
      cam: { pos: [0, 2.6, 9], look: [0, 2, 0], fov: 54, to: { pos: [0, 2.6, 8.4], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.belt.visible = true; w.nose.position.set(-4.6, 2.2, -1.4); const hit = t > 1; ride(w, hit ? -.5 + (t - 1) * 3 : -.5, 2 + (hit ? .8 * Math.sin((t - 1) * 12) * Math.max(0, 1.5 - (t - 1)) : 0), 0, Math.PI, hit ? .6 * Math.sin((t - 1) * 15) : 0); w.gust.children.forEach(l => { const i = l.userData.i, q = ((t - 1) * 2 + i / 6) % 1; l.position.set(-3.8 + q * 6, 1.6 + (i % 3) * .5, 0); l.visible = hit; }); } },
    { say: 'And the landing? Right in the soup.', label: '*SPLASH*', show: ['desk', 'wall', 'g', 'cap', 'plane', 'bowl', 'splash'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 3, 7], look: [0, 1.2, 0], fov: 52, to: { pos: [0, 3, 6.4], look: [0, 1.2, 0], fov: 50 } },
      update: (w, p, t) => { w.belt.visible = true; w.bowl.position.set(.4, 0, 0); const q = Math.min(1, p * 1.6); ride(w, -2.6 + q * 3, 2.6 - q * 1.8, 0, Math.PI, q * .4); const hit = q >= 1; w.splash.children.forEach(d => { const i = d.userData.i, a = i / 8 * Math.PI * 2, r = hit ? (p - .62) * 4 : 0; d.position.set(.4 + Math.cos(a) * r * .6, .9 + Math.sin(Math.min(1, r) * Math.PI) * .8, Math.sin(a) * r * .6); d.visible = hit && r < 1.4; }); } },
    { say: 'Captain Gary: brave, tiny, or totally lost? Comment below.',
      quiz: { q: 'Captain Gary is…', options: ['Brave', 'Tiny', 'Totally lost'], answer: 'Young queen ants fly from the nest, then drop their wings to start new colonies.' },
      show: ['desk', 'g', 'cap'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.belt.visible = false; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
