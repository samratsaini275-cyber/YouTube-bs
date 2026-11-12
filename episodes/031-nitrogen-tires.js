// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const CUT = [300, 0, 0];   // tyre cut open, gas inside

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.runway = k.ground('#3B3F46', 0);
  w.marks = group();
  for (let i = -10; i <= 10; i++) box(1.2, .05, 10, mat('#EDEDED', { glow: .2 }), [0, .03, i * 24], w.marks).castShadow = false;
  // main gear: strut, axle, two tyres with brakes
  w.gear = group([0, 0, 0]);
  cyl(1.2, 1.2, 26, mat('#C9CED6', { metal: .6, rough: .3 }), [0, 19, 0], w.gear, 20);
  const axle = cyl(.7, .7, 14, mat('#9AA4B2', { metal: .6 }), [0, 6, 0], w.gear, 16); axle.rotation.z = Math.PI / 2;
  w.tyres = []; w.brakes = [];
  for (const x of [-5, 5]) {
    const t = k.torus(4.2, 1.9, mat('#16181C', { rough: .9 }), [x, 6, 0], w.gear); t.rotation.set(0, Math.PI / 2, 0); w.tyres.push(t);
    const hub = cyl(2.6, 2.6, 3, mat('#B8BEC8', { metal: .7 }), [x, 6, 0], w.gear, 24); hub.rotation.z = Math.PI / 2;
    const b = cyl(2.2, 2.2, 1, mat('#5A3A2A', { metal: .5 }), [x + (x < 0 ? 1.8 : -1.8), 6, 0], w.gear, 24); b.rotation.z = Math.PI / 2; w.brakes.push(b);
  }
  // cut-away tyre with gas molecules
  w.cut = group(CUT);
  const half = k.mesh(new k.THREE.TorusGeometry(9, 4, 24, 64, Math.PI * 1.5), mat('#2A2D35', { rough: .9, double: true, opacity: .35 }), [0, 0, 0], w.cut);
  half.rotation.z = Math.PI * .25;
  w.liner = k.mesh(new k.THREE.TorusGeometry(9, 3.6, 24, 64, Math.PI * 1.5), mat('#8A5A2E', { rough: .8, double: true, opacity: .18 }), [0, 0, 0], w.cut); w.liner.rotation.z = Math.PI * .25;
  cyl(4.2, 4.2, 3, mat('#B8BEC8', { metal: .7 }), [0, 0, -2], w.cut, 32).rotation.x = Math.PI / 2;
  w.gas = [];
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 1.5 + Math.PI * .25 + (i % 3) * .02, r = 9 + ((i * 37) % 7 - 3) * .9;
    const d = ball(.75, mat('#7FD0FF', { glow: 1.6 }), [Math.cos(a) * r, Math.sin(a) * r, ((i * 13) % 5 - 2) * .9], w.cut);
    d.castShadow = false; d.userData = { a, r, ph: i * .7 }; w.gas.push(d);
  }
  w.spark = ball(2.5, mat('#FF6A2B', { glow: 3, opacity: .85 }), [0, 9, 0], w.cut); w.spark.castShadow = false;
  return w;
}
// heat: 0..1 brake glow. oxy: fraction of molecules shown red (oxygen)
function gear(w, heat, roll = 0) {
  w.brakes.forEach(b => { b.material.color.set(heat > .5 ? '#FF5A1F' : '#5A3A2A'); b.material.emissive.set(heat > .05 ? '#FF3B00' : '#000000'); b.material.emissiveIntensity = heat * 1.6; });
  w.tyres.forEach(t => { t.rotation.x = roll; });
}
function gas(w, t, oxy, bang = 0) {
  w.gas.forEach((d, i) => {
    const { a, r, ph } = d.userData, red = (i % 20) / 20 < oxy;
    d.material.color.set(red ? '#FF3B30' : '#7FD0FF'); d.material.emissive.set(red ? '#FF3B30' : '#7FD0FF');
    const jit = .35 * Math.sin(t * 6 + ph), aa = a + .02 * Math.sin(t * 3 + ph);
    d.position.set(Math.cos(aa) * (r + jit), Math.sin(aa) * (r + jit), d.position.z);
  });
  w.spark.visible = bang > 0; w.spark.scale.setScalar(.3 + bang * 1.6);
}
const PAD = ['runway', 'marks', 'gear'];

export default {
  id: '031',
  style: '3d',
  voice: 'v3',
  case: 'NITROGEN TIRES',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['THESE TIRES', 'COULD EXPLODE.'],
  title: 'Why jet tires are filled with nitrogen, not air',
  description: 'The air you breathe was judged too risky to put inside these tires. Here is what regulators were afraid it could do.',
  tags: ['engineering', 'aviation', 'whyisitbuiltlikethat', 'airplane', 'tires', 'shorts'],
  sources: [
    'FAA Airworthiness Directive on tire inflation (Airbus A300/A310; Boeing 707, 720, 727, 737, 747, 757, 767; BAe 146, BAC 1-11; L-1011; DC-8, DC-9/MD-80, DC-10), archived at https://web.archive.org/web/20170202053815/http://rgl.faa.gov/Regulatory_and_Guidance_Library/rgAD.nsf/0/55850e6389efba3c8625695b006723a3!OpenDocument (retrieved November 2026): "To eliminate the possibility of a chemical reaction between atmospheric oxygen and volatile gases from the tire inner liner producing a tire explosion"; tires on braked wheels must not contain more than 5 percent oxygen by volume; dry nitrogen or other inert gas; air allowed at remote locations if purged within 15 hours time-in-service.',
    'Wikipedia, "Tire" — https://en.wikipedia.org/wiki/Tire (retrieved November 2026): aircraft tires may operate at pressures above 200 psi.',
  ],
  setup,
  scenes: [
    {
      say: 'Jet tires can be pumped to more than {200|two hundred} pounds per square inch. And filling them with normal air was judged too dangerous.',
      show: PAD, sky: '#9CB8D4', lightAt: [0, 8, 0], lightDist: 40,
      cam: { pos: [26, 6, 30], look: [0, 7, 0], fov: 44, to: { pos: [16, 5, 20], look: [0, 6, 0], fov: 40 } },
      update: (w, p, t) => gear(w, 0, t * 2),
    },
    {
      say: 'The worry is the wheels with brakes. Every landing, those brakes work hard.',
      show: PAD, sky: '#1A2230', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [-2, 9, 34], look: [0, 6, 0], fov: 42, to: { pos: [-1, 8, 26], look: [0, 6, 0], fov: 40 } },
      update: (w, p, t, k) => gear(w, k.h.win(t, .8, 3.2), t * 4 * (1 - Math.min(1, t / 4))),
    },
    {
      say: 'Inside, the tire\'s rubber liner can give off gases. Mix those with the oxygen in air, and you risk a chemical reaction. A tire explosion.',
      show: ['cut'], sky: '#0E131C', lightAt: [300, 0, 0], lightDist: 40,
      cam: { pos: [300, 0, 66], look: [300, 0, 0], fov: 44, to: { pos: [302, 3, 56], look: [300, 2, 0], fov: 44 } },
      shake: (t) => t > 6.4 ? .5 : 0,
      update: (w, p, t, k) => gas(w, t, .25, k.h.win(t, 6.2, 7.2)),
    },
    {
      say: 'So the FAA ordered a fix. On jets like the {737,|seven three seven,} the {747|seven four seven} and the DC-10, tires on braked wheels get dry nitrogen. Or another inert gas.',
      show: ['cut'], sky: '#0F2236', lightAt: [300, 0, 0], lightDist: 40,
      cam: { pos: [316, 8, 60], look: [300, 0, 0], fov: 44, to: { pos: [308, 5, 54], look: [300, 0, 0], fov: 44 } },
      update: (w, p, t, k) => gas(w, t, .25 * (1 - k.h.win(t, 2, 5))),
    },
    {
      say: 'The rule? No more than {5|five} percent oxygen inside.',
      show: ['cut'], sky: '#12301F', lightAt: [300, 0, 0], lightDist: 40,
      cam: { pos: [294, -6, 58], look: [300, 0, 0], fov: 44, to: { pos: [297, -3, 50], look: [300, 0, 0], fov: 44 } },
      update: (w, p, t) => gas(w, t, .05),
    },
    {
      say: 'Stuck at a remote airport with no nitrogen? Air is allowed. But within {15|fifteen} hours of flying, it has to be swapped out.',
      show: PAD, sky: '#C9B48C', lightAt: [0, 8, 0], lightDist: 40,
      cam: { pos: [30, 14, -24], look: [0, 8, 0], fov: 44, to: { pos: [22, 10, -16], look: [0, 7, 0], fov: 42 } },
      update: (w, p, t) => gear(w, 0, t * .5),
    },
    {
      say: 'Quick question. The air you breathe is about what percent oxygen? A, {5|five} percent. B, {21|twenty-one} percent. Or C, {50|fifty} percent. Comment your answer.',
      quiz: { q: 'The air you breathe is about what percent oxygen?', options: ['5%', '21%', '50%'], answer: 'B — about 21%. That is why braked jet tires (limit: 5% oxygen) are filled with nitrogen instead.' },
      show: PAD, sky: '#274B73', lightAt: [0, 8, 0], lightDist: 40,
      cam: { pos: [14, 34, 44], look: [0, -14, 0], fov: 46, to: { pos: [-14, 34, 44], look: [0, -14, 0] } },
      update: (w, p, t) => gear(w, 0, t),
    },
  ],
};
